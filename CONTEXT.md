# Portfolio Website

A personal portfolio site for Petko Petkov — backend developer positioning aimed at IT recruiters and hiring managers.

## Language

**Portfolio**:
The public-facing website that presents Petko's identity, work, and contact details to recruiters and interviewers.
_Avoid_: Site, homepage (when referring to the whole project)

**Single-page layout**:
One HTML page with vertically stacked sections; navigation jumps to in-page anchors rather than loading separate pages.
_Avoid_: Multi-page site, SPA

**Section**:
A named block on the single page (e.g. Hero, About, Projects), reached via in-page anchor navigation.
_Avoid_: Page, route, tab

**Certificate**:
A completed course or credential listed under Education, with title, provider, and link. Added incrementally via a markdown content file — not a top-level section.
_Avoid_: Certification page, badges section

**Career transition**:
The shift from non-IT work into software development. Surfaced as one brief honest sentence inside About — not a dedicated Experience section in v1.
_Avoid_: Work history, previous employment section

**Boot sequence**:
A faux OS-startup intro animation before main content. Out of scope for v1; page loads directly into Hero.
_Avoid_: Splash screen, loading screen, intro animation

**Motion layer (v1)**:
Full curated motion stack: GSAP scroll reveals, subtle animated grid, glassmorphism panels, interactive card hovers, Lenis smooth scroll, mouse-follow glow, and floating particles. Respects `prefers-reduced-motion`.
_Avoid_: Boot sequence, excessive neon, matrix effects

**Site language**:
All visitor-facing copy is English only. No i18n or language toggle in v1.
_Avoid_: Localization, Czech version, bilingual

**Project card**:
A showcase block in the Projects section. The flagship project (Finance Tracker) links to live demo and GitHub; smaller desktop projects link to GitHub only.
_Avoid_: Portfolio item, work sample

**Placeholder link**:
A `#` or `TODO` URL standing in for content not yet ready (project URLs, CV, photo). Replaced when real assets exist.
_Avoid_: Dummy link, fake URL

**Contact surface**:
How visitors reach Petko: email (mailto), GitHub profile link, and CV download button. Links only — no contact form, no phone number on the page in v1.
_Avoid_: Contact form, phone listing, inquiry form

**Live site**:
The publicly accessible portfolio on the internet. v1 is developed and previewed locally while the repo stays private; GitHub Pages and a custom domain are connected after the repo is made public and the page is working.
_Avoid_: Deployment, staging URL, localhost

**Content file**:
A markdown file in a `content/` folder holding visitor-facing copy (projects, education, certificates, bio sections). Layout code stays separate; content updates do not require editing HTML structure.
_Avoid_: Hardcoded copy, CMS, JSON content

**Monogram avatar**:
The futuristic "PP" badge used in Hero (and branding) until a professional photo replaces or accompanies it.
_Avoid_: Placeholder photo, silhouette, stock avatar

**Theme**:
Dark-only visual mode — black base, orange accent, dark gray secondary. No light-mode toggle in v1.
_Avoid_: Light mode, theme switcher, dual palette
