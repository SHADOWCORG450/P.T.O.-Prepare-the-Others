# PTO — Prepare The Others

A browser calculator for comparing pickup-shift earnings with travel costs.

## Run it

Open `dist/index.html` in your browser. No installation or build is needed. All calculations happen in the browser; entries are not saved and reset on reload. Example numbers are prefilled and should be replaced with your own.

## Files

- `dist/index.html`: accessible input forms and results
- `dist/style.css`: responsive layout and styling
- `dist/calc.js`: date, overtime, and break-even calculation functions
- `dist/app.js`: form interactions and live results

The page optionally loads fonts from Google Fonts and falls back to system fonts offline. It does not send pay inputs to a server.

## GitHub Pages

1. Upload this folder's contents to a GitHub repository.
2. In **Settings → Pages**, choose **GitHub Actions** as the source.
3. Run the included **Deploy PTO to Pages** workflow, or push to `main`.

The workflow publishes only `dist/`. No secrets or hosting credentials are included.

## Calculation assumptions

- Pay periods and overtime workweeks are independent.
- Overtime is calculated using an adjustable weekly threshold and multiplier. Daily overtime, healthcare 8/80 rules, and jurisdiction-specific rules are not implemented.
- Enter already-scheduled hours for each workweek. They are assumed to precede all pickup shifts; their pay is excluded from results.
- Saturday and Sunday receive the weekend differential. Night hours are entered explicitly; other hourly incentives apply to every pickup hour.
- Differentials can optionally be included in the overtime premium. Mixed night/day differential is allocated proportionally across regular and overtime hours. This is a configurable estimate, not an employer payroll regular-rate calculation.
- Split overnight shifts into separate dated entries if they cross midnight or a workweek boundary. Enter paid hours after unpaid breaks.
- Withholding uses one user-supplied flat percentage.
- Trip costs are charged once; per-shift costs accrue for each planned shift.
- Break-even is the first entered shift, in chronological order, that covers the trip and accrued shift costs. The calculator does not invent future shifts beyond those entered.
- Twice-monthly periods use the 1st–15th and 16th–month end. Monthly periods use calendar months.

Results are planning estimates, not payroll or tax advice.
