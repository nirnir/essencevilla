// Shared Tweaks panel for all pages.
const { TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakSelect } = window;

const EEV_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "linen",
  "displayFont": "Italiana"
}/*EDITMODE-END*/;

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('eev_theme', theme); } catch (e) {}
}

function applyDisplayFont(font) {
  const map = {
    'Italiana': "'Italiana', serif",
    'Playfair Display': "'Playfair Display', serif",
    'Cormorant Garamond': "'Cormorant Garamond', serif"
  };
  let el = document.getElementById('__eev_display_override');
  if (!el) { el = document.createElement('style'); el.id = '__eev_display_override'; document.head.appendChild(el); }
  el.textContent = `h1,h2,h3,h4,.display,.bigword,.wordmark,.word-big,.page-head .title{font-family:${map[font]||map['Italiana']}!important}`;
}

function EEVTweaks() {
  const [t, setTweak] = useTweaks(EEV_DEFAULTS);
  React.useEffect(() => { applyTheme(t.theme); }, [t.theme]);
  React.useEffect(() => { applyDisplayFont(t.displayFont); }, [t.displayFont]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Palette" />
      <TweakRadio
        label="Theme"
        value={t.theme}
        options={[
          { value: 'linen',    label: 'Linen' },
          { value: 'nocturne', label: 'Nocturne' },
          { value: 'atlantic', label: 'Atlantic' },
        ]}
        onChange={v => setTweak('theme', v)}
      />
      <TweakSection label="Typography" />
      <TweakSelect
        label="Display font"
        value={t.displayFont}
        options={[
          { value: 'Italiana',           label: 'Italiana — couture' },
          { value: 'Playfair Display',   label: 'Playfair — editorial' },
          { value: 'Cormorant Garamond', label: 'Cormorant — classical' },
        ]}
        onChange={v => setTweak('displayFont', v)}
      />
    </TweaksPanel>
  );
}

const __eev_root = document.createElement('div');
__eev_root.id = '__eev_tweaks_root';
document.body.appendChild(__eev_root);
ReactDOM.createRoot(__eev_root).render(<EEVTweaks />);

// preload Playfair so font switch is instant
const __pf = document.createElement('link');
__pf.rel = 'stylesheet';
__pf.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap';
document.head.appendChild(__pf);
