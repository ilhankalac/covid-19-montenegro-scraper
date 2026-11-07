# covid-19-montenegro-scraper

Daily scraper for COVID-19 data in Montenegrin cities. It finds the latest report on [ijzcg.me](https://www.ijzcg.me/), reads the active cases for the city you pass in and saves them to Firebase. It feeds the [covid-19-rozaje](https://github.com/ilhankalac/covid-19-rozaje) app.

Runs every day at 15:00 UTC with GitHub Actions, for Rožaje.

```bash
npm install
npm start -- Rožaje      # any city from the report: Podgorica, Nikšić, Bar...
npm test                 # parser tests
```

The city can also be set with the `CITY` environment variable.

| File | What it does |
|------|--------------|
| `index.js` | Opens the site, finds the report and saves the result |
| `parse.js` | Reads the date and active cases for a city from the report text |
| `firebase-config.js` | Firebase project config |
