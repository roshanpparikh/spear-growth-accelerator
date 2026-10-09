# Spear Growth Accelerator (concept prototype)

Clear outcomes: a personalized Spear plan that shows your projected growth, the month of your first gain, your payback month, and the house money after it.

Open `index.html` in a browser (or serve the folder: `python3 -m http.server`). No build step, no backend, no data collection.

- `#/` landing, `#/step/N` intake, `#/building` loader, `#/plan` plan and calculator.
- `data.js` holds real Spear names/prices (published Oct 8, 2026), verbatim testimonials with source URLs, and the illustrative default assumptions.
- `app.js` holds the flow, the model (percent lift, contribution, ROI, payback) and inline SVG charts.
- Every uplift, ramp and margin input is an illustrative assumption, editable in the Assumptions drawer. Spear must supply real cohort data before any of it is published.
- Only external dependency: Inter from Google Fonts (falls back to system fonts offline).
