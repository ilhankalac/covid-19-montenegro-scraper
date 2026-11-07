# covid-19-rozaje-scraper

Daily scraper for COVID-19 data in Rožaje, Montenegro. It finds the latest report on [ijzcg.me](https://www.ijzcg.me/), reads Rožaje's active cases and saves them to Firebase for the [covid-19-rozaje](https://github.com/ilhankalac/covid-19-rozaje) app.

Runs every day at 15:00 UTC with GitHub Actions.

```bash
npm install
npm start   # scrape and save
npm test    # parser tests
```

| File | What it does |
|------|--------------|
| `index.js` | Opens the site, finds the report and saves the result |
| `parse.js` | Reads the date and active cases from the report text |
| `firebase-config.js` | Firebase project config |
