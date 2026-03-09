const themes = {
  purple: {
    bgTop: 'rgba(48, 21, 79, 1)',
    bgBottom: 'rgba(16, 8, 40, 1)',
    panelTop: 'rgba(190, 112, 255, 0.95)',
    panelBottom: 'rgba(123, 63, 199, 0.95)',
    text: 'rgba(248, 245, 255, 1)'
  },
  green: {
    bgTop: 'rgba(20, 65, 36, 1)',
    bgBottom: 'rgba(8, 28, 14, 1)',
    panelTop: 'rgba(113, 255, 154, 0.95)',
    panelBottom: 'rgba(42, 148, 76, 0.95)',
    text: 'rgba(239, 255, 245, 1)'
  },
  blue: {
    bgTop: 'rgba(16, 48, 92, 1)',
    bgBottom: 'rgba(6, 18, 41, 1)',
    panelTop: 'rgba(132, 220, 255, 0.95)',
    panelBottom: 'rgba(57, 123, 220, 0.95)',
    text: 'rgba(241, 250, 255, 1)'
  }
};

const root = document.documentElement;
const codeLabel = document.getElementById('themeCode');

function applyTheme(name) {
  const t = themes[name];
  if (!t) return;

  root.style.setProperty('--bg-top', t.bgTop);
  root.style.setProperty('--bg-bottom', t.bgBottom);
  root.style.setProperty('--panel-top', t.panelTop);
  root.style.setProperty('--panel-bottom', t.panelBottom);
  root.style.setProperty('--text', t.text);

  codeLabel.textContent = `Theme ${name.toUpperCase()} • bg: ${t.bgTop} -> ${t.bgBottom}`;
}

document.querySelectorAll('[data-theme]').forEach((btn) => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
});

applyTheme('purple');
