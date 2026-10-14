# IGNITE 2027 Fest Portal

Front-end portal for IGNITE 2027, the National Annual Fest of Baburaoji Gholap College, Sangvi, Pune. Plain HTML, CSS and JavaScript. No build step, no backend.

## Pages
Home (countdown), Events (filters, saved picks), Register (validated form and printable ticket), Gallery, History (past college events), About us, Contact us, College, Design.

## Run it
Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8000

To publish on GitHub Pages: push to GitHub, then Settings > Pages > deploy from the `main` branch, root folder.

## Files
| File | Purpose |
| --- | --- |
| `index.html` | Page shell, header, footer |
| `style.css` | Theme, layout, print rules |
| `script.js` | Data, pages, routing, validation |

## Edit the content
All content sits at the top of `script.js`:
- `TARGET`: fest date for the countdown (a comment shows the format)
- `EVENTS`: fest events (sample content)
- `HIST`: past events taken from pdeabgcollege.edu.in
- `PHOTOS`: gallery images (use an image path such as `img/hackathon.jpg`)

## Privacy note
Registrations are stored only in the visitor's own browser (`localStorage`: name, email, mobile, events). Nothing is sent to a server. Do not add API keys or secrets to this front-end project.

## Credits
College details and past events: https://www.pdeabgcollege.edu.in/
Copyright (c) 2017. Baburaoji Gholap College, Sangvi, Pune. All Rights Reserved.
Developed by Sumedh Dhamdhere.
