/* ==========================================================================
   Content loader — Google Sheet as CMS
   Every section fetches its tab live on page load and rebuilds its content.
   If a tab can't be fetched, the hardcoded HTML stays as the fallback.
   ========================================================================== */

const CMS = {
  sheetId: "1bYaLlguN0-FjiSSziFI02Dah3BmDI4-ytqmzJtF09t0",
  gid: {
    websitePortfolio: 0,
    about: 1778487886,
    education: 1223895549,
    experience: 1318193374,
    softwares: 496832968,
    certifications: 1061600707,
    references: 1730712445,
    networking: 1758252511,
    graphicPortfolio: 1801245243,
    videoPortfolio: null,
    developmentPortfolio: null,
  },
};

/* Local full-page strips for the hover scroll-peek AND local covers,
   matched by keyword anywhere in the title or description.
   (Drive links in the sheet take priority once filled.) */
const CMS_FULLPAGE = [
  ["baseera", "assets/portfolio/fullpage-baseera.png"],
  ["damnbell", "assets/portfolio/fullpage-damnbell.png"],
  ["manyalawi", "assets/portfolio/fullpage-manyalawi.png"],
  ["fernlove", "assets/portfolio/fullpage-fernlove.png"],
  ["beginning", "assets/portfolio/fullpage-beginning-years.png"],
  ["monsta", "assets/portfolio/fullpage-monsta-store.png"],
  ["akhiar", "assets/portfolio/fullpage-cikgu-akhiar.png"],
];
const CMS_COVERS = [
  ["baseera", "assets/portfolio/01-baseera-engineering.png"],
  ["damnbell", "assets/portfolio/02-damnbell.png"],
  ["manyalawi", "assets/portfolio/03-manyalawi.png"],
  ["fernlove", "assets/portfolio/04-fernlove.png"],
  ["beginning", "assets/portfolio/05-beginning-years.png"],
  ["monsta", "assets/portfolio/06-monsta-store.png"],
  ["akhiar", "assets/portfolio/07-cikgu-akhiar.png"],
  ["trading", "assets/portfolio/08-cikgu-trading.png"],
  ["siagax", "assets/portfolio/09-siagax-group.png"],
  ["numnum", "assets/portfolio/numnum-pos.png"],
  ["atlas", "assets/portfolio/atlas.png"],
  ["cheat-code", "assets/portfolio/video-01-Db-lRBsCLZx.jpg"],
  ["muse spark", "assets/portfolio/video-02-DcFVx5UjHtK.jpg"],
  ["replace you", "assets/portfolio/video-03-Da163lJDZE_.jpg"],
  ["stupidly simple", "assets/portfolio/video-04-DaPuaTnEwui.jpg"],
  ["helping teachers", "assets/portfolio/video-05-DZ4cZzmgq2s.jpg"],
  ["differences", "assets/portfolio/video-06-DZ1OZTfgWKP.jpg"],
  ["alvitalk", "assets/portfolio/video-07-DYWCJqTzy_u.jpg"],
  ["minecraft", "assets/portfolio/video-08-Db-GSm5lUH5.jpg"],
  ["spiderman", "assets/portfolio/video-09-Db2sfwgj55N.jpg"],
  ["most complex designs", "assets/portfolio/video-10-Dcla6PvABvQ.jpg"],
];

const cmsCsvUrl = (gid) =>
  `https://docs.google.com/spreadsheets/d/${CMS.sheetId}/export?format=csv&gid=${gid}`;

/* ---------- CSV helpers ---------- */

function csvParse(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQ = false;
        }
      } else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") {
      row.push(cur);
      cur = "";
    } else if (c === "\n") {
      row.push(cur);
      rows.push(row);
      row = [];
      cur = "";
    } else if (c !== "\r") cur += c;
  }
  row.push(cur);
  rows.push(row);
  return rows;
}

function csvTable(text) {
  const rows = csvParse(text).filter((r) => r.some((c) => c.trim() !== ""));
  if (rows.length < 2) return null;
  const headers = rows[0].map((h) => h.trim());
  const col = (name) => headers.findIndex((h) => h.toLowerCase() === name.toLowerCase());
  return { headers, rows: rows.slice(1), col };
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const cmsFetch = async (gid) => {
  const r = await fetch(cmsCsvUrl(gid), { cache: "no-store" });
  if (!r.ok) throw new Error(`gid ${gid}: HTTP ${r.status}`);
  return csvTable(await r.text());
};

function driveId(url) {
  if (!url) return null;
  const m = String(url).match(/\/d\/([-\w]{20,})/) || String(url).match(/[?&]id=([-\w]{20,})/);
  return m ? m[1] : null;
}
const driveThumb = (url, w = 1200) =>
  driveId(url) ? `https://lh3.googleusercontent.com/d/${driveId(url)}=w${w}` : null;

const cmsBulletList = (points) =>
  points
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<li>${esc(p)}</li>`)
    .join("");

/* ---------- Section renderers ---------- */

const ABOUT_TEXT =
  "I have over seven years of experience in WordPress development and website design, along with more than four years in creative design, including graphics, social media content, infographics, webinar posters, activity books, calendars, and pamphlets. I also have around two years of experience in simple video editing, creating short clips, promotional videos, and repurposed content, as well as almost two years in customer support. With my background in English, I am able to communicate clearly and confidently with clients and team members. In addition, I have hands-on experience building web apps with AI tools such as Codex and create POS system for local coffee store, team gfx collaboration platform and a lot more.";

function renderAbout(t) {
  const el = document.getElementById("cms-about");
  const i = t.col("Content");
  const first = t.rows.find((r) => r[i] && r[i].trim());
  if (el && first) {
    let text = first[i].trim();
    // Sheet still holds the old paragraph — swap in the new one until the sheet is updated
    if (!/Codex/i.test(text)) text = ABOUT_TEXT;
    el.textContent = text;
  }
}

function renderEducation(t) {
  const el = document.getElementById("cms-education");
  if (!el) return;
  const [cT, cI, cP, cPts] = [t.col("Title"), t.col("Institution"), t.col("Period"), t.col("Points")];
  el.innerHTML = t.rows
    .filter((r) => r[cT] && r[cT].trim())
    .map(
      (r) => `<div class="entry">
        <h3 class="entry__title">${esc(r[cT])}</h3>
        <span class="pill">${esc(r[cP])}</span>
        <p class="entry__sub">${esc(r[cI])}</p>
        <ul class="entry__points">${cmsBulletList((r[cPts] || "").split("|"))}</ul>
      </div>`
    )
    .join("");
}

function renderExperience(t) {
  const el = document.getElementById("cms-experience");
  if (!el) return;
  const [cC, cR, cP, cPts] = [t.col("Company"), t.col("Role"), t.col("Period"), t.col("Points")];
  el.innerHTML = t.rows
    .filter((r) => r[cC] && r[cC].trim())
    .map(
      (r) => `<div class="entry">
        <h3 class="entry__title">${esc(r[cC])}</h3>
        <span class="pill pill--dark">${esc(r[cP])}</span>
        <p class="entry__sub">${esc(r[cR])}</p>
        <ul class="entry__points">${cmsBulletList((r[cPts] || "").split("|"))}</ul>
      </div>`
    )
    .join("");
}

function renderSoftwares(t) {
  const el = document.getElementById("cms-softwares");
  if (!el) return;
  const [cG, cTool, cCat] = [t.col("Group"), t.col("Tool"), t.col("Category")];
  const groups = [];
  const byName = {};
  for (const r of t.rows) {
    if (!r[cTool] || !r[cTool].trim()) continue;
    const g = (r[cG] || "Other").trim();
    const tool = r[cTool].trim();
    if (tool.toLowerCase() === "drupal") continue;
    if (!byName[g]) {
      byName[g] = [];
      groups.push(g);
    }
    byName[g].push(r);
  }
  const ensureTool = (group, tool, category) => {
    if (!byName[group]) {
      byName[group] = [];
      groups.push(group);
    }
    if (!byName[group].some((r) => (r[cTool] || "").trim().toLowerCase() === tool.toLowerCase())) {
      byName[group].push({ [cTool]: tool, [cCat]: category });
    }
  };
  ensureTool("Productivity", "Upbase", "Project Management");
  ensureTool("Productivity", "Plane.so", "Project Management");
  ensureTool("AI Tools & Solutions", "Opencode", "AI coding agent, Open-source");
  el.innerHTML = groups
    .map(
      (g) => `<div class="soft-group">
        <h4 class="soft-group__label">${esc(g)}</h4>
        <div class="soft-grid">
          ${byName[g]
            .map(
              (r) => `<div class="chip">
              <span class="chip__name">${esc(r[cTool])}</span>
              ${r[cCat] && r[cCat].trim() ? `<span class="chip__level">${esc(r[cCat])}</span>` : ""}
            </div>`
            )
            .join("")}
        </div>
      </div>`
    )
    .join("");
}

function renderCertifications(t) {
  const el = document.getElementById("cms-certifications");
  if (!el) return;
  const [cT, cI] = [t.col("Title"), t.col("Issuer")];
  el.innerHTML = t.rows
    .filter((r) => r[cT] && r[cT].trim())
    .map(
      (r) => `<div class="entry">
        <h3 class="entry__title">${esc(r[cT])}</h3>
        <p class="entry__sub">${esc(r[cI])}</p>
      </div>`
    )
    .join("");
}

function renderReferences(t) {
  const el = document.getElementById("cms-references");
  if (!el) return;
  const [cN, cD] = [t.col("Name"), t.col("Detail")];
  el.innerHTML = t.rows
    .filter((r) => r[cN] && r[cN].trim())
    .map(
      (r) => `<div class="chip">
        <span class="chip__name">${esc(r[cN])}</span>
        <span class="chip__level">${esc(r[cD])}</span>
      </div>`
    )
    .join("");
}

function renderNetworking(t) {
  const el = document.getElementById("cms-networking");
  if (!el) return;
  const cI = t.col("Item");
  el.innerHTML = t.rows
    .filter((r) => r[cI] && r[cI].trim())
    .map((r) => {
      const item = r[cI].trim();
      return item.toLowerCase().startsWith("more coming")
        ? `<div class="chip"><span class="chip__level">${esc(item)}</span></div>`
        : `<div class="chip"><span class="chip__name">${esc(item)}</span></div>`;
    })
    .join("");
}

/* ---------- Portfolio cards ---------- */

function cmsCard(r, col, index, imageLoading = "lazy", btnLabel = "View Design") {
  const title = (r[col("Project Title")] || r[col("Title")] || `Graphic Project ${String(index + 1).padStart(2, "0")}`).trim();
  const niche = (r[col("Project Labels")] || r[col("Type")] || "").trim();
  const labels = (r[col("Project Niche")] || r[col("Labels")] || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
  const desc = (r[col("Project Description")] || r[col("Description")] || "").trim();
  const link = (r[col("Project Link")] || r[col("Canva Link")] || r[col("Link")] || "").trim();
  const challenges = (r[col("Challenges")] || "").trim();
  const solutions = (r[col("Solutions")] || "").trim();
  const access = (r[col("Access")] || "").trim();

  // cover chain: full-page (hover scroll) -> local cover -> drive thumb -> numbered brand thumb
  const fullUrl = (r[col("Project Full Page Website")] || "").trim();
  const fullDrive = driveThumb(fullUrl, 1600);
  const haystack = `${title} ${desc}`.toLowerCase();
  const localFull = CMS_FULLPAGE.find(([k]) => haystack.includes(k));
  const localCover = CMS_COVERS.find(([k]) => haystack.includes(k));
  const coverDrive =
    driveThumb((r[col("Project Image Main Cover Link")] || r[col("Image Cover Link")] || r[col("Image Link")] || "").trim()) ||
    driveThumb((r[col("Project Image Main Cover")] || "").trim());

  let thumb;
  if (fullDrive || localFull) {
    const src = fullDrive || localFull[1];
    thumb = `<div class="card__thumb"><img class="card__img card__img--full" src="${src}" alt="${esc(title)} — full page design" loading="${imageLoading}" referrerpolicy="no-referrer" /></div>`;
  } else if (localCover || coverDrive) {
    const src = localCover ? localCover[1] : coverDrive;
    thumb = `<div class="card__thumb"><img class="card__img" src="${src}" alt="${esc(title)} — cover" loading="${imageLoading}" referrerpolicy="no-referrer" /></div>`;
  } else {
    const num = String(index + 1).padStart(2, "0");
    thumb = `<div class="card__thumb card__thumb--brand ${index % 2 ? "card__thumb--alt" : ""}"><span class="card__num">${num}</span></div>`;
  }

  const btn =
    link && link.toLowerCase() !== "none" && /^https?:\/\//i.test(link)
      ? `<a class="card__btn" href="${esc(link)}" target="_blank" rel="noopener noreferrer">${esc(btnLabel)}</a>`
      : `<span class="card__btn card__btn--off" aria-disabled="true">${esc(btnLabel)}</span>`;

  const cs =
    challenges || solutions
      ? `<dl class="card__cs">
          ${challenges ? `<dt>Challenges</dt><dd>${esc(challenges)}</dd>` : ""}
          ${solutions ? `<dt>Solutions</dt><dd>${esc(solutions)}</dd>` : ""}
        </dl>`
      : "";

  const accessBlock = access
    ? `<details class="card__accordion">
        <summary class="card__accordion-title">Access Credentials</summary>
        <p class="card__access">${esc(access)}</p>
      </details>`
    : "";

  return `<article class="card">
    ${thumb}
    ${niche ? `<span class="card__niche">${esc(niche)}</span>` : ""}
    <h3 class="card__title">${esc(title)}</h3>
    ${labels.length ? `<div class="card__labels">${labels.map((l) => `<span class="card__label">${esc(l)}</span>`).join("")}</div>` : ""}
    ${desc ? `<p class="card__desc">${esc(desc)}</p>` : ""}
    ${cs}
    ${accessBlock}
    ${btn}
  </article>`;
}

function renderWebsitePortfolio(t) {
  const el = document.querySelector('[data-panel="website"]');
  if (!el) return;
  const rows = t.rows.filter((r) => (r[t.col("Project Title")] || "").trim());
  if (rows.length) el.innerHTML = rows.map((r, i) => cmsCard(r, t.col, i)).join("");
}

function renderGraphicPortfolio(t) {
  const el = document.querySelector('[data-panel="graphic"]');
  if (!el) return;
  const title = t.col("Title");
  const image = t.col("Image Cover Link") >= 0 ? t.col("Image Cover Link") : t.col("Image Link");
  const rows = t.rows.filter((r) => {
    const t0 = (r[title] || "").trim();
    if (t0.toLowerCase() === "ai pillar 1.png") return false;
    return (t0 || (r[image] || "").trim());
  });
  if (rows.length) el.innerHTML = rows.map((r, i) => cmsCard(r, t.col, i, "eager")).join("");
}

function renderVideoPortfolio(t) {
  const el = document.querySelector('[data-panel="video"]');
  if (!el) return;
  const rows = t.rows.filter((r) =>
    (r[t.col("Project Title")] || r[t.col("Title")] || "").trim()
  );
  if (rows.length) el.innerHTML = rows.map((r, i) => cmsCard(r, t.col, i, "lazy", "Watch Reel")).join("");
}

function renderDevelopmentPortfolio(t) {
  const el = document.querySelector('[data-panel="development"]');
  if (!el) return;
  const rows = t.rows.filter((r) =>
    (r[t.col("Project Title")] || r[t.col("Title")] || "").trim()
  );
  if (rows.length) el.innerHTML = rows.map((r, i) => cmsCard(r, t.col, i, "lazy", "Demo Now")).join("");
}

/* ---------- Boot ---------- */

(async function cmsBoot() {
  const jobs = [
    ["about", CMS.gid.about, renderAbout],
    ["education", CMS.gid.education, renderEducation],
    ["experience", CMS.gid.experience, renderExperience],
    ["softwares", CMS.gid.softwares, renderSoftwares],
    ["certifications", CMS.gid.certifications, renderCertifications],
    ["references", CMS.gid.references, renderReferences],
    ["networking", CMS.gid.networking, renderNetworking],
    ["websitePortfolio", CMS.gid.websitePortfolio, renderWebsitePortfolio],
    ["graphicPortfolio", CMS.gid.graphicPortfolio, renderGraphicPortfolio],
    ["videoPortfolio", CMS.gid.videoPortfolio, renderVideoPortfolio],
    ["developmentPortfolio", CMS.gid.developmentPortfolio, renderDevelopmentPortfolio],
  ];

  await Promise.allSettled(
    jobs.map(async ([name, gid, render]) => {
      try {
        if (gid === null || gid === undefined) throw new Error("no gid configured yet");
        const table = await cmsFetch(gid);
        if (table) {
          render(table);
          console.log(`[cms] ${name}: rendered ${table.rows.length} rows`);
        }
      } catch (e) {
        console.warn(`[cms] ${name}: using fallback content (${e.message || e})`);
      }
    })
  );
})();
