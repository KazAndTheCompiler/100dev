const themes = {
  purple: { bgTop:'rgba(48, 21, 79, 1)', bgBottom:'rgba(16, 8, 40, 1)', panelTop:'rgba(190, 112, 255, 0.95)', panelBottom:'rgba(123, 63, 199, 0.95)', text:'rgba(248, 245, 255, 1)' },
  green: { bgTop:'rgba(20, 65, 36, 1)', bgBottom:'rgba(8, 28, 14, 1)', panelTop:'rgba(113, 255, 154, 0.95)', panelBottom:'rgba(42, 148, 76, 0.95)', text:'rgba(239, 255, 245, 1)' },
  blue: { bgTop:'rgba(16, 48, 92, 1)', bgBottom:'rgba(6, 18, 41, 1)', panelTop:'rgba(132, 220, 255, 0.95)', panelBottom:'rgba(57, 123, 220, 0.95)', text:'rgba(241, 250, 255, 1)' },

  sunset: { bgTop:'rgba(114, 33, 48, 1)', bgBottom:'rgba(41, 13, 24, 1)', panelTop:'rgba(255, 164, 118, 0.95)', panelBottom:'rgba(198, 63, 88, 0.95)', text:'rgba(255, 244, 240, 1)' },
  aurora: { bgTop:'rgba(17, 62, 80, 1)', bgBottom:'rgba(8, 22, 33, 1)', panelTop:'rgba(138, 255, 216, 0.95)', panelBottom:'rgba(78, 160, 255, 0.95)', text:'rgba(236, 252, 255, 1)' },
  ember: { bgTop:'rgba(92, 34, 20, 1)', bgBottom:'rgba(34, 12, 7, 1)', panelTop:'rgba(255, 203, 118, 0.95)', panelBottom:'rgba(169, 48, 48, 0.95)', text:'rgba(255, 247, 236, 1)' },

  oceanic: { bgTop:'rgba(18, 47, 98, 1)', bgBottom:'rgba(8, 21, 44, 1)', panelTop:'rgba(128, 228, 255, 0.95)', panelBottom:'rgba(33, 77, 183, 0.95)', text:'rgba(239, 249, 255, 1)' },
  neonNoir: { bgTop:'rgba(37, 23, 76, 1)', bgBottom:'rgba(14, 9, 30, 1)', panelTop:'rgba(150, 112, 255, 0.95)', panelBottom:'rgba(42, 24, 90, 0.95)', text:'rgba(247, 242, 255, 1)' },
  cyberlime: { bgTop:'rgba(57, 77, 14, 1)', bgBottom:'rgba(21, 30, 6, 1)', panelTop:'rgba(221, 255, 117, 0.95)', panelBottom:'rgba(68, 124, 26, 0.95)', text:'rgba(248, 255, 230, 1)' }
};

const root = document.documentElement;
const codeLabel = document.getElementById('themeCode');
const swatches = Array.from(document.querySelectorAll('[data-theme]'));

function applyTheme(name) {
  const t = themes[name];
  if (!t) return;

  root.style.setProperty('--bg-top', t.bgTop);
  root.style.setProperty('--bg-bottom', t.bgBottom);
  root.style.setProperty('--panel-top', t.panelTop);
  root.style.setProperty('--panel-bottom', t.panelBottom);
  root.style.setProperty('--text', t.text);

  swatches.forEach((s) => s.classList.toggle('is-active', s.dataset.theme === name));
  codeLabel.textContent = `Theme ${name.toUpperCase()} • bg: ${t.bgTop} -> ${t.bgBottom}`;
}

swatches.forEach((btn) => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
});

applyTheme('purple');
