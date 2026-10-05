# How to Edit the Website (Google Sheet CMS)

The site reads your Google Sheet **live on every page load**. Edit a cell,
wait for Sheets to show "All changes saved in Drive", refresh
http://localhost:8080 — done. No code, no redeploy.

Sheet: `ANZ - Website Portfolio`
https://docs.google.com/spreadsheets/d/1bYaLlguN0-FjiSSziFI02Dah3BmDI4-ytqmzJtF09t0/edit

## Tabs → Sections

| Tab | Controls | Columns | Notes |
|---|---|---|---|
| **Website Portfolio** | Website cards (9) | Project Image Main Cover, Project Full Page Website, Project Image Main Cover Link, Project Labels, Project Niche, Project Title, Project Description, Project Link | `Project Labels` = the tag (Website / Landing Page / Design Concept). `Project Niche` = comma-separated chips. Description shows max 2 lines. `Project Link`: full `https://…` URL or `None` for a disabled button. |
| **Graphic Portfolio** | Graphic cards | Image Cover Link, Type, Labels, Title, Description, Canva Link | One card is rendered for every row with an image or title. Images are loaded directly from public Google Drive links; they are not downloaded into the website. `Canva Link` is optional and enables the View Design button. Same card style, 4:5 images. |
| **Video Portfolio** | Video cards | Project Title, Project Labels, Project Niche, Project Link | New tab. 10 Instagram reels are baked into the fallback HTML (covers downloaded to `assets/portfolio/video-*.jpg`, titles from the reel captions, "Watch Reel" buttons). Renders until the tab's gid is set in `content.js` (`CMS.gid.videoPortfolio`). Vertical 9:16 covers, 4 columns. |
| **Development Portfolio** | Development cards | Project Title, Project Labels, Project Niche, Project Description, Challenges, Solutions, Access, Project Link | New tab. First card (NumNum POS for Coffee Store) is in the fallback HTML with cover `assets/portfolio/numnum-pos.png`; it renders until the tab's gid is set in `content.js` (`CMS.gid.developmentPortfolio`). Optional `Challenges` / `Solutions` / `Access` columns add the case-study block and access line. `Project Link` buttons are labelled "Demo Now". 2 columns, 16:9 thumbs. |
| **About** | About Me paragraph | Field, Content | One row: Field = `Paragraph`. Note: until the sheet paragraph mentions "Codex", the site swaps in the newer paragraph from `content.js` (`ABOUT_TEXT`) — paste the new text into the sheet to take over. |
| **Education** | Education entries | Title, Institution, Period, Points | `Points` = bullets, separate each with ` \| ` (pipe with spaces). |
| **Experience** | Work entries | Company, Role, Period, Points | Same bullet rule. Order = display order. |
| **Softwares** | Softwares & Tools | Group, Tool, Category | `Group` creates the section headings; `Category` is optional. |
| **Certifications** | Certifications | Title, Issuer | |
| **References** | References | Name, Detail | |
| **Networking** | Networking Session | Item | One item per row. Rows starting with "More coming" render as the dimmed note. |

## Rules to keep it working

1. **Never rename the header row** of any tab — the site matches columns by
   name. Add rows freely.
2. **Bullets**: in `Points` columns, separate bullet points with ` | `.
3. **Images**: paste a public Google Drive **link** (share → anyone with
   the link) into `Project Image Main Cover Link` (cover) or
   `Project Full Page Website` (tall full-page strip → enables the
   hover scroll-peek). Known projects already use local images — new
   projects work fully from Drive links.
4. **Links**: `Project Link` (Website Portfolio) or `Canva Link` (Graphic
   Portfolio) needs a full URL starting with `https://`, otherwise the card
   shows a grey disabled button.
5. **Empty cells** are fine; a row with an empty Title is skipped.

## What happens if the sheet is unreachable

Nothing breaks — the page falls back to the last content baked into
`index.html`. If a section ever looks outdated, just reload.

## Technical (for reference)

- Renderer: `content.js`, loaded before `script.js`.
- Feed: `…/export?format=csv&gid=<gid>` per tab (gid = the number in the
  sheet URL when a tab is open — stable). Fresh within seconds of saving.
- To add a whole new section/tab later: ask me — it needs one line added
  to the tab map in `content.js`.
