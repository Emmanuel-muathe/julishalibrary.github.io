# Julisha Library 📚

A free, open-source platform for hosting and accessing revision papers and study materials.

## Current Project Layout

This repository is currently organized around these top-level app files and folders:

- `index.html` — main page entry point
- `css/` — site styling (`css/style.css`)
- `js/` — front-end behavior (`js/script.js`)
- `papers/` — subject-organized PDF files
- `server.js` — local Node/Express static server
- **Completely Free**: All materials are free to access and download
- **Multiple Subjects**: Browse papers across Mathematics, Physics, Chemistry, Biology, English, History, and more
- **Search & Filter**: Easily search for papers by title or topic
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Minimal Stack**: Static HTML/CSS/JS front-end with a lightweight Node/Express local server for development
- **Easy to Deploy**: Hosted on GitHub Pages at no cost
- **Community-Driven**: Easy to contribute new papers and materials

See full structure details in [docs/STRUCTURE.md](docs/STRUCTURE.md).

## Run Locally
```
Julisha-Library/
├── code/
│   ├── index.html      # Main HTML file
│   ├── style.css       # Complete styling
│   └── script.js       # Interactivity and data
├── README.md           # This file
└── LICENSE             # MIT License
```

## 🧪 Local quality checks

Install dependencies:

```bash
npm install
```

Run all quality checks:

```bash
npm run lint
npm run check:docs
npm run check:data
```

Script reference:

- `npm run lint` → runs HTML, CSS, and JavaScript linting
- `npm run check:docs` → validates markdown links in project docs
- `npm run check:data` → verifies `papersData` in `js/script.js` matches `papers.json` and checks that referenced PDF files exist

## 🤝 Contributing

Contributions are welcome! To contribute:

### Option 1: Open directly
Open `index.html` in a browser.

### Option 2: Use the local server (recommended)

```bash
npm install
npm start
```

Then open `http://localhost:3000`.

## Documentation

- [Documentation index](docs/README.md)
- [Deployment guide](docs/DEPLOYMENT.md)
- [Project structure](docs/STRUCTURE.md)
- [API/functions reference](docs/API.md)

## Contributing

Contributions are welcome. Please open a pull request with a clear summary of your changes.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
##Made with ❤️ to make education accessible to everyone**
