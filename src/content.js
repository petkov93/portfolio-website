import { parse as parseYaml } from 'yaml';
import { marked } from 'marked';

import heroRaw from '../content/hero.md?raw';
import aboutRaw from '../content/about.md?raw';
import currentMissionRaw from '../content/current-mission.md?raw';
import techStackRaw from '../content/tech-stack.md?raw';
import educationRaw from '../content/education.md?raw';
import contactRaw from '../content/contact.md?raw';
import siteRaw from '../content/site.md?raw';
import certificatesRaw from '../content/certificates.md?raw';

const projectModules = import.meta.glob('../content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function parseMarkdown(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { bodyHtml: marked.parse(raw.trim()) };
  }

  const data = parseYaml(match[1]) ?? {};
  const content = match[2] ?? '';

  return {
    ...data,
    bodyHtml: marked.parse(content.trim()),
  };
}

function loadProjects() {
  const projects = Object.values(projectModules).map((raw) => parseMarkdown(raw));
  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.title.localeCompare(b.title);
  });
}

export function loadContent() {
  return {
    hero: parseMarkdown(heroRaw),
    about: parseMarkdown(aboutRaw),
    currentMission: parseMarkdown(currentMissionRaw),
    techStack: parseMarkdown(techStackRaw),
    education: parseMarkdown(educationRaw),
    contact: parseMarkdown(contactRaw),
    site: parseMarkdown(siteRaw),
    certificates: parseMarkdown(certificatesRaw),
    projects: loadProjects(),
  };
}
