# Spear Growth Accelerator (concept prototype)

Clear outcomes: a personalized Spear plan that shows your projected growth, the month of your first gain, your payback month, and the house money after it.

Open `index.html` in a browser (or serve the folder: `python3 -m http.server`). No build step, no backend, no data collection.

- `#/` landing, `#/step/N` intake, `#/building` loader, `#/plan` plan and calculator.
- `data.js` holds real Spear names/prices (published Oct 8, 2026), verbatim testimonials with source URLs, and the illustrative default assumptions.
- `app.js` holds the flow, the model (percent lift, contribution, ROI, payback) and inline SVG charts.
- Every uplift, ramp and margin input is an illustrative assumption, editable in the Assumptions drawer. Spear must supply real cohort data before any of it is published.
- Only external dependency: Inter from Google Fonts (falls back to system fonts offline).

## v2 features
- Hero quick growth check: production slider with +5% and +10% goals and a "Typical plan" option computed live from the same model as the plan page (month-24 growth for the default owner profile). "Build my growth plan" carries the number into the intake.
- Testimonials with real photos only where the photo appears on the cited Spear page; initials avatars otherwise. One official Spear YouTube member testimonial (Dr. Rachel Day on the Treatment Planning with Confidence workshop).
- Share my prescription: the URL (#/rx/...) encodes answers and assumption edits and rebuilds the same plan. Print / Save as PDF gives a one-page Rx summary.
- Your plan vs doing nothing: cumulative added production gap over the horizon, illustrative.
- Motion: chart draw-in, KPI count-up, payback pulse and a one-time confetti burst. Respects prefers-reduced-motion.
