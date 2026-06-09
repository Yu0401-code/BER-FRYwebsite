/* ============================================================
   BER FRY — 三宮のバー / marketing site
   script.js  ·  loaded as <script type="text/babel" src="script.js">
   Mobile-first responsive site. Self-contained: the design-system
   components (Button / Tag / Eyebrow / Card / Divider / Input) are
   inlined below, styled via the CSS custom properties in style.css.
   ============================================================ */

/* ============================================================
   1 · Design-system components
   ============================================================ */
function Button({ children, variant = 'primary', size = 'md', fullWidth = false, disabled = false, iconLeft = null, iconRight = null, onClick, type = 'button', ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const sizes = {
    sm: { padding: '8px 16px', font: 'var(--text-xs)' },
    md: { padding: '12px 26px', font: 'var(--text-sm)' },
    lg: { padding: '16px 38px', font: 'var(--text-base)' },
  }[size];
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
    fontFamily: 'var(--font-ui)', fontWeight: 'var(--weight-medium)', letterSpacing: 'var(--tracking-wide)',
    fontSize: sizes.font, padding: sizes.padding, width: fullWidth ? '100%' : 'auto',
    border: '1px solid transparent', borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
    transition: 'background var(--dur-base) var(--ease-soft), color var(--dur-base) var(--ease-soft), border-color var(--dur-base) var(--ease-soft), box-shadow var(--dur-base) var(--ease-soft), transform var(--dur-fast) var(--ease-soft)',
    transform: press && !disabled ? 'translateY(1px)' : 'none', whiteSpace: 'nowrap', userSelect: 'none',
  };
  const variants = {
    primary: { background: hover && !disabled ? 'var(--accent-hover)' : 'var(--accent)', color: 'var(--text-on-accent)', borderColor: 'transparent', boxShadow: hover && !disabled ? 'var(--glow-amber-md)' : 'var(--glow-amber-sm)' },
    secondary: { background: hover && !disabled ? 'var(--accent-soft)' : 'transparent', color: hover && !disabled ? 'var(--accent-hover)' : 'var(--text-primary)', borderColor: hover && !disabled ? 'var(--border-accent)' : 'var(--border-default)' },
    ghost: { background: 'transparent', color: hover && !disabled ? 'var(--accent)' : 'var(--text-secondary)', borderColor: 'transparent' },
  }[variant];
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{ ...base, ...variants }} {...rest}>
      {iconLeft}{children}{iconRight}
    </button>
  );
}

function Tag({ children, variant = 'default', ...rest }) {
  const variants = {
    default: { background: 'var(--veil-cream-04)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' },
    accent: { background: 'var(--accent-soft)', color: 'var(--amber-300)', border: '1px solid var(--veil-amber-20)' },
    solid: { background: 'var(--accent)', color: 'var(--text-on-accent)', border: '1px solid transparent' },
  }[variant];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', fontWeight: 'var(--weight-medium)', letterSpacing: 'var(--tracking-wide)', padding: '4px 12px', borderRadius: 'var(--radius-pill)', whiteSpace: 'nowrap', lineHeight: 1.4, ...variants }} {...rest}>
      {children}
    </span>
  );
}

function Eyebrow({ children, rule = true, align = 'left', ...rest }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', justifyContent: align === 'center' ? 'center' : 'flex-start', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', fontWeight: 'var(--weight-medium)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', color: 'var(--accent)', ...(rest.style || {}) }}>
      {rule && <span aria-hidden="true" style={{ width: '28px', height: '1px', background: 'var(--accent)', opacity: 0.7, display: 'inline-block' }} />}
      {children}
    </span>
  );
}

function Card({ children, glow = false, padding = 'var(--space-8)', hoverable = false, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => hoverable && setHover(true)} onMouseLeave={() => hoverable && setHover(false)}
      style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding, boxShadow: glow ? 'var(--shadow-lg), var(--glow-amber-sm)' : hover ? 'var(--shadow-lg)' : 'var(--shadow-md)', borderColor: hover ? 'var(--border-strong)' : 'var(--border-default)', transition: 'box-shadow var(--dur-base) var(--ease-soft), border-color var(--dur-base) var(--ease-soft), transform var(--dur-base) var(--ease-soft)', transform: hover ? 'translateY(-2px)' : 'none', ...(rest.style || {}) }}>
      {children}
    </div>
  );
}

function Divider({ ornament = false, spacing = 'var(--space-8)', ...rest }) {
  const line = { flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--cream-500), transparent)', opacity: 0.6 };
  return (
    <div role="separator" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', width: '100%', marginTop: spacing, marginBottom: spacing, ...(rest.style || {}) }}>
      <span style={line} />
      {ornament && <span aria-hidden="true" style={{ width: '6px', height: '6px', transform: 'rotate(45deg)', background: 'var(--accent)', boxShadow: 'var(--glow-amber-sm)', flexShrink: 0 }} />}
      {ornament && <span style={line} />}
    </div>
  );
}

function Input({ label, id, type = 'text', placeholder, value, defaultValue, onChange, multiline = false, rows = 4, required = false, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `inp-${label}` : undefined);
  const fieldStyle = {
    width: '100%', boxSizing: 'border-box', background: 'var(--veil-cream-04)', border: '1px solid',
    borderColor: focus ? 'var(--border-accent)' : 'var(--border-default)', borderRadius: 'var(--radius-sm)',
    padding: '12px 14px', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)',
    lineHeight: 1.6, outline: 'none', boxShadow: focus ? 'var(--glow-amber-sm)' : 'none',
    transition: 'border-color var(--dur-base) var(--ease-soft), box-shadow var(--dur-base) var(--ease-soft)',
    resize: multiline ? 'vertical' : 'none',
  };
  return (
    <label htmlFor={inputId} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      {label && (
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', fontWeight: 'var(--weight-medium)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: focus ? 'var(--accent)' : 'var(--text-muted)', transition: 'color var(--dur-base) var(--ease-soft)' }}>
          {label}
          {required && <span style={{ marginLeft: '0.5em', fontSize: '0.82em', letterSpacing: 'var(--tracking-wide)', color: 'var(--accent)' }}>必須</span>}
        </span>
      )}
      {multiline
        ? <textarea id={inputId} rows={rows} placeholder={placeholder} value={value} defaultValue={defaultValue} onChange={onChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={fieldStyle} {...rest} />
        : <input id={inputId} type={type} placeholder={placeholder} value={value} defaultValue={defaultValue} onChange={onChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={fieldStyle} {...rest} />}
    </label>
  );
}

/* ============================================================
   2 · Responsive helpers & constants
   ============================================================ */
const BP = 768; /* mobile-first breakpoint */
const ADDRESS = '神戸市中央区中山手通1-1-1 ロンロンビル';
const MAP_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=17&output=embed`;

function useIsDesktop(bp = BP) {
  const [d, setD] = React.useState(() => (typeof window !== 'undefined' ? window.innerWidth >= bp : false));
  React.useEffect(() => {
    const update = () => setD(window.innerWidth >= bp);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [bp]);
  return d;
}

function Section({ id, children, style = {}, innerStyle = {} }) {
  const d = useIsDesktop();
  return (
    <section id={id} data-screen-label={id} style={{ padding: d ? 'var(--space-32) var(--space-10)' : 'var(--space-20) var(--space-6)', position: 'relative', ...style }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', ...innerStyle }}>{children}</div>
    </section>
  );
}

function Frame({ src, alt = '', ratio, radius = 'var(--radius-lg)', style = {} }) {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: ratio, overflow: 'hidden', borderRadius: radius, border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-lg)', ...style }}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}

function MapEmbed({ ratio = '16 / 10' }) {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: ratio, overflow: 'hidden', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-lg)' }}>
      <iframe title="BER FRY 地図 — 神戸市中央区中山手通" src={MAP_SRC} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, filter: 'invert(0.92) hue-rotate(180deg) brightness(0.95) contrast(0.92)' }} />
    </div>
  );
}

/* ============================================================
   3 · Sections
   ============================================================ */
const NAV_LINKS = [['store', '店について'], ['signatures', 'シグネチャー'], ['visit', '営業時間・アクセス']];

function Wordmark({ size = 20 }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
      <img src="assets/mark.svg" alt="" width={size * 1.5} height={size * 1.5} style={{ filter: 'drop-shadow(var(--glow-amber-sm))' }} />
      <span style={{ fontFamily: 'var(--font-accent)', fontSize: `${size}px`, fontWeight: 500, letterSpacing: 'var(--tracking-widest)', color: 'var(--cream-50)', paddingLeft: '0.34em', whiteSpace: 'nowrap' }}>BER FRY</span>
    </span>
  );
}

function MenuToggle({ open, onClick }) {
  const bar = (t) => ({ display: 'block', height: '1.5px', width: '22px', background: 'var(--cream-100)', borderRadius: '2px', transition: 'transform var(--dur-base) var(--ease-soft), opacity var(--dur-fast) var(--ease-soft)', ...t });
  return (
    <button onClick={onClick} aria-label={open ? 'メニューを閉じる' : 'メニューを開く'} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '44px', height: '44px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
      <span style={bar(open ? { transform: 'translateY(7.5px) rotate(45deg)' } : null)} />
      <span style={bar(open ? { opacity: 0 } : null)} />
      <span style={bar(open ? { transform: 'translateY(-7.5px) rotate(-45deg)' } : null)} />
    </button>
  );
}

function Nav({ onReserve, onNav }) {
  const d = useIsDesktop();
  const [scrolled, setScrolled] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  React.useEffect(() => {
    const target = document.querySelector('[data-scroll]');
    const handler = () => setScrolled((target ? target.scrollTop : window.scrollY) > 24);
    (target || window).addEventListener('scroll', handler);
    return () => (target || window).removeEventListener('scroll', handler);
  }, []);
  React.useEffect(() => { if (d) setMenu(false); }, [d]);
  const go = (id) => { setMenu(false); onNav(id); };
  const reserve = () => { setMenu(false); onReserve(); };
  return (
    <React.Fragment>
      <header style={{ position: 'sticky', top: 0, zIndex: 'var(--z-sticky)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: d ? '0 var(--space-10)' : '0 var(--space-5)', height: d ? '76px' : '64px', background: (scrolled || menu) ? 'rgba(11,9,7,0.78)' : 'transparent', backdropFilter: (scrolled || menu) ? 'var(--blur-md)' : 'none', WebkitBackdropFilter: (scrolled || menu) ? 'var(--blur-md)' : 'none', borderBottom: `1px solid ${(scrolled && !menu) ? 'var(--border-subtle)' : 'transparent'}`, transition: 'background var(--dur-base) var(--ease-soft), border-color var(--dur-base) var(--ease-soft)' }}>
        <button onClick={() => go('top')} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <Wordmark size={d ? 20 : 18} />
        </button>
        {d ? (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
            {NAV_LINKS.map(([id, label]) => (
              <button key={id} onClick={() => go(id)} className="bf-navlink" style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-wide)', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>{label}</button>
            ))}
            <Button variant="secondary" size="sm" onClick={reserve}>ご予約</Button>
          </nav>
        ) : (
          <MenuToggle open={menu} onClick={() => setMenu((m) => !m)} />
        )}
      </header>
      {!d && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 'var(--z-overlay)', paddingTop: '64px', background: 'rgba(8,6,5,0.92)', backdropFilter: 'var(--blur-md)', WebkitBackdropFilter: 'var(--blur-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-8)', opacity: menu ? 1 : 0, pointerEvents: menu ? 'auto' : 'none', transition: 'opacity var(--dur-base) var(--ease-soft)' }}>
          <img src="assets/mark.svg" alt="" width="52" height="52" style={{ filter: 'drop-shadow(var(--glow-amber-md))', marginBottom: 'var(--space-2)' }} />
          {NAV_LINKS.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-wide)', color: 'var(--cream-100)', background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--space-2)' }}>{label}</button>
          ))}
          <div style={{ marginTop: 'var(--space-4)' }}><Button variant="primary" size="lg" onClick={reserve}>ご予約はこちら</Button></div>
          <div style={{ marginTop: 'var(--space-6)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>OPEN 18:00 – 02:00 ・ 日曜定休</div>
        </div>
      )}
    </React.Fragment>
  );
}

function Hero({ onReserve, onNav }) {
  const d = useIsDesktop();
  const navH = d ? 76 : 64;
  return (
    <section data-screen-label="Hero" style={{ position: 'relative', minHeight: `calc(100dvh - ${navH}px)`, marginTop: `-${navH}px`, paddingTop: `${navH}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden', background: 'var(--surface-page)' }}>
      <img src="assets/interior-back-bar.png" alt="BER FRY の店内 — 棚を埋めるボトルとカウンター" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 38%', display: 'block' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(75% 60% at 50% 46%, rgba(11,9,7,0.30), rgba(11,9,7,0.74) 80%), linear-gradient(to bottom, rgba(11,9,7,0.70) 0%, rgba(11,9,7,0.18) 30%, rgba(11,9,7,0.42) 64%, rgba(11,9,7,0.94) 100%), radial-gradient(60% 50% at 50% 40%, rgba(201,138,61,0.14), transparent 64%)' }} />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-5)', padding: '0 var(--space-6)', width: '100%', maxWidth: d ? '860px' : '560px' }}>
        <img src="assets/mark.svg" alt="" width={d ? 64 : 50} height={d ? 64 : 50} style={{ filter: 'drop-shadow(var(--glow-amber-md))' }} />
        <Eyebrow align="center">Sannomiya · Kobe</Eyebrow>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(38px, 8.5vw, 84px)', lineHeight: 1.18, letterSpacing: 'var(--tracking-wide)', color: 'var(--cream-50)', margin: 0, textWrap: 'balance' }}>
          マスターと話す、<br />いつもの一杯を。
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: d ? 'var(--text-lg)' : 'var(--text-base)', lineHeight: 1.9, color: 'var(--cream-100)', margin: 'var(--space-1) 0 0' }}>
          ひとりでも、ふたりでも。三宮の片隅で。
        </p>
        <div style={{ display: 'flex', flexDirection: d ? 'row' : 'column', gap: 'var(--space-3)', marginTop: 'var(--space-6)', width: d ? 'auto' : '100%', maxWidth: '320px' }}>
          <Button variant="primary" size="lg" fullWidth={!d} onClick={onReserve}>ご予約はこちら</Button>
          <Button variant="secondary" size="lg" fullWidth={!d} onClick={() => onNav('signatures')}>メニューを見る</Button>
        </div>
      </div>
    </section>
  );
}

function About() {
  const d = useIsDesktop();
  return (
    <Section id="store" innerStyle={{ display: 'grid', gridTemplateColumns: d ? '1fr 1fr' : '1fr', gap: d ? 'var(--space-24)' : 'var(--space-10)', alignItems: 'center' }}>
      <div style={{ maxWidth: '46ch', order: d ? 0 : 2 }}>
        <Eyebrow>About the bar</Eyebrow>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: d ? 'var(--text-2xl)' : 'var(--text-xl)', lineHeight: 1.3, letterSpacing: 'var(--tracking-wide)', color: 'var(--cream-50)', margin: 'var(--space-5) 0 var(--space-6)' }}>
          灯りのともる、夜のとなり。
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)', margin: 0 }}>
          カウンターの端から二番目が、いつもの席。マスターに今日あったことを話すうちに、隣に座った人とも、自然と言葉が交わっていく。
        </p>
        <Divider ornament spacing="var(--space-8)" />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)', margin: 0 }}>
          ひとりで来ても、ふたりで来ても。特別な日も、なんでもない日も。BER FRY は、三宮の夜にそっと灯る、もうひとつの居場所です。
        </p>
        <div style={{ marginTop: 'var(--space-8)' }}>
          <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'var(--text-lg)', color: 'var(--text-muted)' }}>— Master, BER FRY</span>
        </div>
      </div>
      <div style={{ position: 'relative', order: d ? 0 : 1 }}>
        <Frame src="assets/interior-counter.png" alt="BER FRY のカウンター席" ratio={d ? '3 / 4' : '4 / 3'} />
      </div>
    </Section>
  );
}

const SIGNATURES = [
  { jp: '琥珀のオールドファッションド', en: 'Amber Old Fashioned', note: '樽香をまとったバーボンに、自家製ビターと黒糖を一滴。', price: '¥1,400', tag: 'ウイスキー', feature: true },
  { jp: '六甲のジントニック', en: 'Rokko Gin & Tonic', note: '神戸のクラフトジンに、すだちと山椒の香りをのせて。', price: '¥1,200', tag: 'カクテル' },
  { jp: '夜のいちじく', en: 'Midnight Fig', note: 'ラム、いちじく、ひとさじの蜂蜜。デザートのような一杯。', price: '¥1,300', tag: 'スイート' },
];

function Signatures() {
  const d = useIsDesktop();
  return (
    <Section id="signatures" style={{ background: 'var(--surface-raised)' }}>
      <div style={{ textAlign: 'center', marginBottom: d ? 'var(--space-16)' : 'var(--space-10)' }}>
        <Eyebrow align="center">Signature</Eyebrow>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: d ? 'var(--text-3xl)' : 'var(--text-2xl)', letterSpacing: 'var(--tracking-wide)', color: 'var(--cream-50)', margin: 'var(--space-5) 0 0' }}>
          今夜の、はじめの一杯
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-secondary)', marginTop: 'var(--space-4)' }}>
          季節と気分にあわせて。お好みを伝えていただければ、一杯をおつくりします。
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: d ? 'repeat(3, 1fr)' : '1fr', gap: d ? 'var(--space-8)' : 'var(--space-5)' }}>
        {SIGNATURES.map((drink) => (
          <Card key={drink.en} glow={drink.feature} hoverable padding={d ? 'var(--space-8)' : 'var(--space-6)'}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Tag variant={drink.feature ? 'accent' : 'default'}>{drink.feature ? '本日のおすすめ' : drink.tag}</Tag>
              <span style={{ fontFamily: 'var(--font-accent)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--accent)' }}>{drink.price}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', color: 'var(--cream-50)', margin: 'var(--space-6) 0 var(--space-1)', lineHeight: 1.4 }}>{drink.jp}</h3>
            <p style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 'var(--text-base)', color: 'var(--text-muted)', margin: 0 }}>{drink.en}</p>
            <Divider spacing="var(--space-5)" />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{drink.note}</p>
          </Card>
        ))}
      </div>
      <p style={{ textAlign: 'center', marginTop: 'var(--space-12)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
        ※ 表示は税込価格です。チャージ ¥700 / お一人さま。
      </p>
    </Section>
  );
}

const HOURS = [['月 – 木', '18:00 – 02:00'], ['金 – 土', '18:00 – 03:00'], ['日', '定休日']];

function HoursRow({ day, time, closed }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-wide)', color: 'var(--text-secondary)' }}>{day}</span>
      <span style={{ fontFamily: 'var(--font-accent)', fontSize: 'var(--text-md)', color: closed ? 'var(--text-faint)' : 'var(--cream-100)', letterSpacing: '0.02em' }}>{time}</span>
    </div>
  );
}

function InfoRow({ k, v, accent }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'baseline' }}>
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--text-muted)', width: '64px', flexShrink: 0 }}>{k}</span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: accent ? 'var(--accent)' : 'var(--text-primary)', letterSpacing: '0.02em', lineHeight: 1.6 }}>{v}</span>
    </div>
  );
}

function Reservation() {
  const d = useIsDesktop();
  const [sent, setSent] = React.useState(false);
  return (
    <Card glow padding={d ? 'var(--space-10)' : 'var(--space-6)'}>
      {sent ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8) 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <img src="assets/mark.svg" alt="" width="48" height="48" style={{ filter: 'drop-shadow(var(--glow-amber-md))' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-xl)', color: 'var(--cream-50)', margin: 0 }}>ご予約ありがとうございます</h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0, maxWidth: '32ch' }}>
            折り返し、お電話にて確認のご連絡をいたします。今夜、カウンターでお待ちしております。
          </p>
          <Button variant="ghost" size="sm" onClick={() => setSent(false)}>もう一度入力する</Button>
        </div>
      ) : (
        <React.Fragment>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)', gap: 'var(--space-3)' }}>
            <Eyebrow>Reservation</Eyebrow>
            <Tag variant="accent">本日 空席わずか</Tag>
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-xl)', color: 'var(--cream-50)', margin: '0 0 var(--space-6)' }}>席をご用意します</h3>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <Input label="お名前" placeholder="山田 太郎" required />
            <div style={{ display: 'grid', gridTemplateColumns: d ? '1fr 1fr' : '1fr', gap: 'var(--space-4)' }}>
              <Input label="ご希望日時" placeholder="6/14 20:00" required />
              <Input label="人数" placeholder="2名" required />
            </div>
            <Input label="ご要望" multiline rows={3} placeholder="記念日、お好みのお酒など" />
            <Button variant="primary" size="lg" fullWidth type="submit">予約を申し込む</Button>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
              お急ぎの場合は、お電話（078-322-3480）でも承ります。
            </p>
          </form>
        </React.Fragment>
      )}
    </Card>
  );
}

function Visit() {
  const d = useIsDesktop();
  return (
    <Section id="visit" innerStyle={{ display: 'grid', gridTemplateColumns: d ? '1fr 1fr' : '1fr', gap: d ? 'var(--space-24)' : 'var(--space-12)', alignItems: 'start' }}>
      <div>
        <Eyebrow>Hours &amp; Access</Eyebrow>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: d ? 'var(--text-3xl)' : 'var(--text-2xl)', letterSpacing: 'var(--tracking-wide)', color: 'var(--cream-50)', margin: 'var(--space-5) 0 var(--space-8)' }}>
          灯りを目印に。
        </h2>
        <div style={{ marginBottom: 'var(--space-8)' }}>
          {HOURS.map(([day, time]) => <HoursRow key={day} day={day} time={time} closed={time === '定休日'} />)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <InfoRow k="住所" v="〒650-0004 神戸市中央区中山手通 1-1-1 ロンロンビル 2F" />
          <InfoRow k="アクセス" v="各線 三宮駅より徒歩 4 分" />
          <InfoRow k="電話" v="078-322-3480" accent />
          <InfoRow k="席数" v="カウンター 8席 ・ テーブル 1卓" />
        </div>
        <Divider spacing="var(--space-8)" />
        <MapEmbed ratio={d ? '16 / 9' : '4 / 3'} />
        <div style={{ marginTop: 'var(--space-4)', textAlign: 'center' }}>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--accent)', textDecoration: 'none' }}>
            Google マップで開く →
          </a>
        </div>
      </div>
      <Reservation />
    </Section>
  );
}

function FootCol({ title, links, onNav }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 'var(--space-2)' }}>{title}</span>
      {links.map(([label, id]) => (
        <button key={id} onClick={() => onNav(id)} style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{label}</button>
      ))}
    </div>
  );
}

function Footer({ onNav }) {
  const d = useIsDesktop();
  return (
    <footer style={{ background: 'var(--ink-950)', padding: d ? 'var(--space-20) var(--space-10) var(--space-12)' : 'var(--space-16) var(--space-6) var(--space-10)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: d ? 'row' : 'column', justifyContent: 'space-between', alignItems: 'flex-start', gap: d ? 'var(--space-12)' : 'var(--space-10)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '32ch' }}>
            <Wordmark size={d ? 22 : 20} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', lineHeight: 1.9, color: 'var(--text-muted)', margin: 0 }}>
              三宮の片隅で、灯りのともる夜のとなり。<br />ひとりでも、ふたりでも。
            </p>
          </div>
          <div style={{ display: 'flex', gap: d ? 'var(--space-20)' : 'var(--space-12)', flexWrap: 'wrap' }}>
            <FootCol title="Menu" links={[['店について', 'store'], ['シグネチャー', 'signatures'], ['営業時間・アクセス', 'visit']]} onNav={onNav} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 'var(--space-2)' }}>Visit</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.8 }}>神戸市中央区中山手通 1-1-1 ロンロンビル 2F</span>
              <span style={{ fontFamily: 'var(--font-accent)', fontSize: 'var(--text-md)', color: 'var(--cream-100)' }}>078-322-3480</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>OPEN 18:00 – 02:00 ・ 日曜定休</span>
            </div>
          </div>
        </div>
        <Divider spacing="var(--space-12)" />
        <div style={{ display: 'flex', flexDirection: d ? 'row' : 'column', justifyContent: 'space-between', alignItems: d ? 'center' : 'flex-start', gap: 'var(--space-4)' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', color: 'var(--text-faint)', letterSpacing: 'var(--tracking-wide)' }}>© 2026 BER FRY · Sannomiya, Kobe</span>
          <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
            {['Instagram', 'X', 'Google Maps'].map((s) => (
              <span key={s} style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--text-muted)', cursor: 'pointer' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   4 · App
   ============================================================ */
function App() {
  const scrollRef = React.useRef(null);
  const onNav = (id) => {
    const root = scrollRef.current;
    if (!root) return;
    if (id === 'top') { root.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = root.querySelector('#' + id);
    if (el) root.scrollTo({ top: el.offsetTop - 56, behavior: 'smooth' });
  };
  const onReserve = () => onNav('visit');
  return (
    <div ref={scrollRef} data-scroll className="bf-scroll">
      <Nav onReserve={onReserve} onNav={onNav} />
      <Hero onReserve={onReserve} onNav={onNav} />
      <About />
      <Signatures />
      <Visit />
      <Footer onNav={onNav} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
