// simple backend for handling contact form submissions
// run with `node server.js` (or `npm start` after installing deps)

const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const CONTACT_LOG_PATH = path.join(DATA_DIR, 'contact-messages.ndjson');
const RETENTION_DAYS = Number(process.env.CONTACT_RETENTION_DAYS || 30);
const ADMIN_DELETE_TOKEN = process.env.CONTACT_DELETE_TOKEN;

// parse form bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve static site files (index.html, css/, js/, papers/ etc)
app.use(express.static(path.join(__dirname)));

// best-effort setup for storage path and restricted file permissions
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(CONTACT_LOG_PATH)) {
  fs.writeFileSync(CONTACT_LOG_PATH, '', { mode: 0o600 });
}

/**
 * Structured storage policy for contact messages:
 * - File format: newline-delimited JSON objects in data/contact-messages.ndjson.
 * - Retention: entries older than CONTACT_RETENTION_DAYS (default 30) are purged on write.
 * - Access control expectation: file should be readable only by the service account (mode 0600)
 *   and not served as static content. Delete operations require CONTACT_DELETE_TOKEN.
 * - Deletion path: DELETE /contact/:id with x-admin-token header.
 */
function pruneExpiredMessages() {
  const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000;
  let lines = [];
  try {
    lines = fs.readFileSync(CONTACT_LOG_PATH, 'utf8').split('\n').filter(Boolean);
  } catch {
    return;
  }

  const retained = lines.filter(line => {
    try {
      const parsed = JSON.parse(line);
      const timestamp = new Date(parsed.receivedAt).getTime();
      return Number.isFinite(timestamp) && timestamp >= cutoff;
    } catch {
      return false;
    }
  });

  fs.writeFile(CONTACT_LOG_PATH, `${retained.join('\n')}${retained.length ? '\n' : ''}`, { mode: 0o600 }, err => {
    if (err) console.error('Contact retention prune failed');
  });
}

// contact form endpoint
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const id = crypto.randomUUID();
  console.log('Contact submission received', { id });

  // persist message in structured storage
  const record = {
    id,
    receivedAt: new Date().toISOString(),
    name: name || '',
    email: email || '',
    message: message || ''
  };
  fs.appendFile(CONTACT_LOG_PATH, `${JSON.stringify(record)}\n`, { mode: 0o600 }, err => {
    if (err) {
      console.error('Failed to save contact message', { id });
      return;
    }
    pruneExpiredMessages();
    console.log('Contact submission stored', { id });
  });

  // respond with JSON as the frontend expects
  res.json({ status: 'ok', id });
});

app.delete('/contact/:id', (req, res) => {
  if (!ADMIN_DELETE_TOKEN || req.header('x-admin-token') !== ADMIN_DELETE_TOKEN) {
    return res.status(403).json({ status: 'forbidden' });
  }

  const messageId = req.params.id;
  const lines = fs.readFileSync(CONTACT_LOG_PATH, 'utf8').split('\n').filter(Boolean);
  const retained = lines.filter(line => {
    try {
      return JSON.parse(line).id !== messageId;
    } catch {
      return false;
    }
  });

  fs.writeFile(CONTACT_LOG_PATH, `${retained.join('\n')}${retained.length ? '\n' : ''}`, { mode: 0o600 }, err => {
    if (err) {
      console.error('Failed to delete contact message', { id: messageId });
      return res.status(500).json({ status: 'error' });
    }
    console.log('Contact submission deleted', { id: messageId });
    return res.json({ status: 'deleted', id: messageId });
  });
});

app.listen(PORT, () => {
  console.log(`Julisha Library backend running on port ${PORT}`);
});
