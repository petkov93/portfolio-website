const EXTERNAL_LINK_ATTRS = 'target="_blank" rel="noopener noreferrer"';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderList(items, className = 'tag-list') {
  if (!items?.length) return '';
  return `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function renderProjectCard(project, labels) {
  const isFlagship = project.featured;
  const testId = isFlagship ? 'project-card-flagship' : 'project-card-standard';
  const hasLiveDemo = project.liveDemo && project.liveDemo !== '#';
  const links = hasLiveDemo
    ? `<div class="project-links">
         <a class="btn btn-primary" href="${escapeHtml(project.liveDemo)}" ${EXTERNAL_LINK_ATTRS}>${escapeHtml(labels.liveDemo)}</a>
         <a class="btn btn-ghost" href="${escapeHtml(project.github)}" ${EXTERNAL_LINK_ATTRS}>${escapeHtml(labels.github)}</a>
       </div>`
    : `<div class="project-links">
         <a class="btn btn-ghost" href="${escapeHtml(project.github)}" ${EXTERNAL_LINK_ATTRS}>${escapeHtml(labels.github)}</a>
       </div>`;

  return `
    <article class="project-card motion-card ${isFlagship ? 'project-card--flagship' : ''}" data-testid="${testId}">
      <div class="project-card__meta">
        <span class="project-status">${escapeHtml(project.status)}</span>
        ${project.type === 'desktop' ? `<span class="project-type">${escapeHtml(labels.desktopApp)}</span>` : ''}
      </div>
      <h3>${escapeHtml(project.title)}</h3>
      <div class="project-body">${project.bodyHtml}</div>
      ${renderList(project.features, 'feature-list')}
      ${renderList(project.tech, 'tag-list tag-list--tech')}
      ${links}
    </article>
  `;
}

export function renderPortfolio(content) {
  const { hero, about, currentMission, techStack, education, contact, projects, site, certificates } =
    content;
  const { nav, sections, labels, footer } = site;

  const certificatesBlock =
    certificates.certificates?.length > 0
      ? `<div class="certificates" data-testid="certificates">
           <h3>${escapeHtml(labels.certificates)}</h3>
           <ul>${certificates.certificates
             .map(
               (cert) =>
                 `<li><a href="${escapeHtml(cert.url || '#')}" ${EXTERNAL_LINK_ATTRS}>${escapeHtml(cert.title)}</a> — ${escapeHtml(cert.provider)}</li>`
             )
             .join('')}</ul>
         </div>`
      : '';

  const navLinks = nav
    .map(({ id, label }) => `<a href="#${escapeHtml(id)}">${escapeHtml(label)}</a>`)
    .join('');

  const footerText = footer.replace('{year}', String(new Date().getFullYear()));

  return `
    <header class="site-header">
      <a class="brand" href="#hero" aria-label="${escapeHtml(hero.name)} home">
        <span class="monogram monogram--small" aria-hidden="true">PP</span>
        <span class="brand-name">${escapeHtml(hero.name)}</span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
      <nav id="site-nav" class="site-nav" aria-label="Primary" data-section-ids="${escapeHtml(nav.map(({ id }) => id).join(','))}">
        ${navLinks}
      </nav>
    </header>

    <main>
      <section id="hero" class="section section-hero glass-panel motion-reveal" data-motion-reveal aria-labelledby="hero-heading">
        <div class="hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">${escapeHtml(hero.location)}</p>
            <h1 id="hero-heading">${escapeHtml(hero.name)}</h1>
            <p class="hero-title">${escapeHtml(hero.title)}</p>
            <blockquote class="hero-tagline">${escapeHtml(hero.tagline)}</blockquote>
            <div class="hero-actions">
              <a class="btn btn-primary" href="#projects">${escapeHtml(hero.ctaProjects)}</a>
              <a class="btn btn-ghost" href="${escapeHtml(hero.cvHref)}" ${EXTERNAL_LINK_ATTRS}>${escapeHtml(hero.ctaCv)}</a>
            </div>
          </div>
          <div class="hero-visual">
            <div class="monogram monogram--hero" data-testid="monogram-avatar" aria-label="PP monogram avatar">PP</div>
          </div>
        </div>
      </section>

      <section id="about" class="section glass-panel motion-reveal" data-motion-reveal aria-labelledby="about-heading">
        <h2 id="about-heading">${escapeHtml(sections.about)}</h2>
        <div class="about-grid">
          <div class="about-intro">${about.bodyHtml}</div>
          <div class="about-details">
            <div class="about-block">
              <h3>${escapeHtml(labels.strengths)}</h3>
              ${renderList(about.strengths)}
            </div>
            <div class="about-block">
              <h3>${escapeHtml(labels.improvements)}</h3>
              <ul class="plain-list">${about.improvements.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
            </div>
            <p class="career-transition">${escapeHtml(about.careerTransition)}</p>
          </div>
        </div>
      </section>

      <section id="current-mission" class="section glass-panel motion-reveal" data-motion-reveal aria-labelledby="mission-heading">
        <h2 id="mission-heading">${escapeHtml(sections.currentMission)}</h2>
        <div class="mission-copy">${currentMission.bodyHtml}</div>
        ${renderList(currentMission.focus, 'mission-list')}
      </section>

      <section id="projects" class="section motion-reveal" data-motion-reveal aria-labelledby="projects-heading">
        <h2 id="projects-heading">${escapeHtml(sections.projects)}</h2>
        <div class="projects-grid">
          ${projects.map((project) => renderProjectCard(project, labels)).join('')}
        </div>
      </section>

      <section id="tech-stack" class="section glass-panel motion-reveal" data-motion-reveal aria-labelledby="tech-heading">
        <h2 id="tech-heading">${escapeHtml(sections.techStack)}</h2>
        <div class="stack-grid">
          <div>
            <h3>${escapeHtml(labels.backendSkills)}</h3>
            ${renderList(techStack.backend, 'tag-list tag-list--tech')}
          </div>
          <div>
            <h3>${escapeHtml(labels.interests)}</h3>
            ${renderList(techStack.interests, 'tag-list')}
          </div>
          <div>
            <h3>${escapeHtml(labels.learningTargets)}</h3>
            ${renderList(techStack.learning, 'tag-list tag-list--accent')}
          </div>
        </div>
      </section>

      <section id="education" class="section glass-panel motion-reveal" data-motion-reveal aria-labelledby="education-heading">
        <h2 id="education-heading">${escapeHtml(sections.education)}</h2>
        <div class="education-grid">
          <div>
            <h3>${escapeHtml(labels.formalEducation)}</h3>
            <ul class="timeline">
              ${education.formal
                .map(
                  (item) =>
                    `<li><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.period)}</span></li>`
                )
                .join('')}
            </ul>
          </div>
          <div>
            <h3>${escapeHtml(labels.selfLearning)}</h3>
            ${renderList(education.selfLearning)}
          </div>
          <div>
            <h3>${escapeHtml(labels.currentlyStudying)}</h3>
            ${renderList(education.currentlyStudying)}
          </div>
        </div>
        ${certificatesBlock}
        <div class="education-body">${education.bodyHtml}</div>
      </section>

      <section id="contact" class="section glass-panel section-contact motion-reveal" data-motion-reveal aria-labelledby="contact-heading">
        <h2 id="contact-heading">${escapeHtml(sections.contact)}</h2>
        <div class="contact-copy">${contact.bodyHtml}</div>
        <div class="contact-links">
          <a class="btn btn-primary" href="mailto:${escapeHtml(contact.email)}">${escapeHtml(labels.email)}</a>
          <a class="btn btn-ghost" href="${escapeHtml(contact.github)}" ${EXTERNAL_LINK_ATTRS}>${escapeHtml(labels.github)}</a>
          <a class="btn btn-ghost" href="${escapeHtml(contact.cvHref)}" ${EXTERNAL_LINK_ATTRS}>${escapeHtml(labels.downloadCv)}</a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <p>${escapeHtml(footerText)}</p>
    </footer>
  `;
}

export function applySiteMetadata(site) {
  document.title = site.pageTitle;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', site.metaDescription);
}
