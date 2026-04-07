# Project Structure

## Current repository structure

```text
julishalibrary.github.io/
├── index.html
├── server.js
├── css/
│   └── style.css
├── js/
│   └── script.js
├── papers/
│   ├── biology/
│   ├── chemistry/
│   ├── english/
│   ├── geography/
│   ├── history/
│   ├── kiswahili/
│   ├── mathematics/
│   └── physics/
├── docs/
│   ├── README.md
│   ├── DEPLOYMENT.md
│   ├── STRUCTURE.md
│   └── API.md
└── README.md
```

## Key files and folders

- `index.html`: Main page and DOM structure.
- `css/style.css`: Site styling and responsive rules.
- `js/script.js`: Paper data and client-side behavior.
- `papers/`: PDF files grouped by subject.
- `server.js`: Express static server for local development.
- `docs/`: Project documentation.

## Notes

- No `code/` directory is required in the current setup.
- Deployment should serve from repository root so `index.html` is discoverable.
- Papers are referenced in `js/script.js` through relative `pdfUrl` paths like `papers/<subject>/<file>.pdf`.

## Related docs

- [Main README](../README.md)
- [Deployment guide](./DEPLOYMENT.md)
- [API reference](./API.md)
