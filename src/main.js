import { loadContent } from './content.js';
import { applySiteMetadata, renderPortfolio } from './render.js';
import { initNavigation } from './nav.js';
import { initMotion } from './motion/index.js';
import './styles/main.css';

const app = document.querySelector('#app');
const content = loadContent();
applySiteMetadata(content.site);
app.innerHTML = renderPortfolio(content);
app.removeAttribute('aria-busy');

initMotion();
initNavigation();
