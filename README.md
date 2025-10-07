# Phase 1 Project

This project is a simple front‑end playground to understand how the web works, what tools we use, and how to run small HTML/CSS/JS apps locally.

## Project Structure

```
Phase_1_project-1/
                            # (optional) any mock data or server artifacts
  index.html                 # entry point for quick manual testing
  lab1/
    about.html
    headerphoto1.jpg
    home.js
  lab2/
    fav.jpg
    favorites.html
    favorites.js
  lab3/
    fetchbooks.js
```

## Tools Used in This Project

- Browser (Chrome, Edge, Firefox, Safari)
- HTML, CSS, and vanilla JavaScript
- Browser DevTools (Elements, Console, Network) for debugging
- `fetch()` API for HTTP requests (Lab 3)
- Optional: local static server (e.g., VS Code Live Server, Python `http.server`, or `npx serve`)`

## Labs Overview

- Lab 1 (`lab1/`)
  - `about.html`: Static page for project or author info
  - `home.js`: JavaScript for basic DOM interactions on the corresponding page(s)
  - `headerphoto1.jpg`: Image asset used in Lab 1 pages

- Lab 2 (`lab2/`)
  - `favorites.html`: Demonstrates UI for a favorites list
  - `favorites.js`: Handles interactivity (adding/removing favorites, rendering, persistence if implemented)
  - `fav.jpg`: Image asset used in the favorites page

- Lab 3 (`lab3/`)
  - `fetchbooks.js`: Demonstrates fetching data (e.g., from a books API or local JSON) and rendering results

## Development Tips

- Keep file paths relative and consistent to avoid broken links when serving from different roots
- Use the browser DevTools Console to inspect errors from `home.js`, `favorites.js`, and `fetchbooks.js`
- If `fetch()` fails on a `file://` URL, switch to a local server (see Serving Locally)

## Troubleshooting

- Blank page or missing images: Check console for 404s and verify relative paths
- CORS or fetch errors: Run a local server instead of opening files directly
- Script not running: Confirm the `<script>` tag points to the correct file and loads after the DOM content


