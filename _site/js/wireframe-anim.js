(function () {
  const container = document.querySelector('.home-hero-video');
  if (!container) return;

  // Scale the stage to fill the container
  function scaleStage() {
    const stage = document.getElementById('wf-stage');
    if (!stage) return;
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    const scaleX = w / 860;
    const scaleY = h / 480;
    const scale = Math.min(scaleX, scaleY);
    const inner = stage.querySelector('.morph-wrap');
    if (inner) {
      inner.style.transform = inner.classList.contains('show')
        ? `translateY(0) scale(${scale})`
        : `translateY(14px) scale(${scale})`;
      inner.style.transformOrigin = 'center center';
    }
    stage._scale = scale;
  }

  window.addEventListener('resize', scaleStage);
  scaleStage();

  const delay = ms => new Promise(r => setTimeout(r, ms));

  function moveCursor(el, toX, toY, dur) {
    return new Promise(r => {
      const sx = parseFloat(el.style.left), sy = parseFloat(el.style.top);
      const steps = 40, iv = dur / steps;
      let s = 0;
      const t = setInterval(() => {
        s++;
        const p = s / steps;
        const e = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
        el.style.left = (sx + (toX - sx) * e) + 'px';
        el.style.top  = (sy + (toY - sy) * e) + 'px';
        if (s >= steps) { clearInterval(t); r(); }
      }, iv);
    });
  }

  async function run() {
    const mw     = document.getElementById('mw');
    const mb     = document.getElementById('mb');
    const dc     = document.getElementById('dc');
    const pc     = document.getElementById('pc');
    const cursor = document.getElementById('cursor');
    const stand  = document.getElementById('stand');
    const base   = document.getElementById('base');
    const df     = document.getElementById('df');
    const finger = document.getElementById('finger');

    if (!mw) return;

    // Reset phone wireframes
    document.getElementById('pm').querySelectorAll('.wf-line,.wf-rect').forEach(el => el.classList.remove('drawn'));

    // 1. Fade in desktop
    const stage = document.getElementById('wf-stage');
    const scale = stage._scale || 1;
    mw.style.transform = `translateY(14px) scale(${scale})`;
    mw.style.transformOrigin = 'center center';
    mw.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    // trigger show
    requestAnimationFrame(() => {
      mw.style.transform = `translateY(0) scale(${scale})`;
      mw.style.opacity = '1';
    });
    await delay(1000);

    // 2. Draw sidebar
    const sb = document.getElementById('dsb').querySelectorAll('.wf-sline');
    sb.forEach((el, i) => setTimeout(() => el.classList.add('drawn'), i * 180));
    await delay(sb.length * 180 + 500);

    // 3. Draw main content
    const dmEls = document.getElementById('dm').querySelectorAll('.wf-line,.wf-rect');
    dmEls.forEach((el, i) => setTimeout(() => el.classList.add('drawn'), i * 220));
    await delay(dmEls.length * 220 + 700);

    // 4. Cursor glides in
    cursor.style.opacity = '1';
    await delay(300);
    await moveCursor(cursor, 110, 70, 1400);

    // 5. Click — ripple + flash
    const cr = document.getElementById('cr');
    cr.style.left = (parseFloat(cursor.style.left) - 7) + 'px';
    cr.style.top  = (parseFloat(cursor.style.top)  - 7) + 'px';
    cr.classList.add('pop');
    cursor.style.transform = 'scale(0.85)';
    df.classList.add('flash');
    await delay(220);
    cursor.style.transform = '';
    df.classList.remove('flash');
    df.classList.add('fade');
    await delay(400);
    df.classList.remove('fade');

    // 6. Cursor fades, stand fades, box morphs
    await delay(500);
    cursor.style.opacity = '0';
    stand.classList.add('stand-hidden');
    base.classList.add('stand-hidden');
    await delay(150);
    dc.classList.add('hidden');
    mb.classList.add('is-phone');
    await delay(600);

    // 7. Phone content fades in
    pc.classList.add('show');
    await delay(500);

    // 8. Draw phone elements
    const pmEls = document.getElementById('pm').querySelectorAll('.wf-line,.wf-rect');
    pmEls.forEach((el, i) => setTimeout(() => el.classList.add('drawn'), i * 200));
    await delay(pmEls.length * 200 + 500);

    // 9. Swipe carousel
    const track = document.getElementById('carousel-track');
    const dots  = ['cd0', 'cd1', 'cd2'].map(id => document.getElementById(id));
    await delay(700);
    track.style.transform = 'translateX(-33.333%)';
    dots[0].classList.remove('active'); dots[1].classList.add('active');
    await delay(1100);
    track.style.transform = 'translateX(-66.666%)';
    dots[1].classList.remove('active'); dots[2].classList.add('active');
    await delay(1800);

    // 10. Check appears
    const checkOverlay = document.getElementById('check-overlay');
    const checkCircle  = document.getElementById('check-circle');
    checkOverlay.classList.add('show');
    await delay(80);
    checkCircle.classList.add('pop');
    await delay(1800);

    // 11. Fade out and reset
    const wfStage = document.getElementById('wf-stage');
    wfStage.style.transition = 'opacity 0.8s ease';
    wfStage.style.opacity = '0';
    await delay(900);

    // Full reset
    wfStage.style.transition = 'none';
    wfStage.style.opacity = '1';
    mw.style.opacity = '0';
    mb.classList.remove('is-phone');
    dc.classList.remove('hidden');
    pc.classList.remove('show');
    stand.classList.remove('stand-hidden');
    base.classList.remove('stand-hidden');
    cursor.style.left = '170px';
    cursor.style.top = '100px';
    cursor.style.transform = '';
    cursor.style.opacity = '0';
    finger.classList.remove('show', 'tap');

    document.querySelectorAll('#wf-stage .drawn').forEach(el => el.classList.remove('drawn'));
    track.style.transition = 'none';
    track.style.transform = '';
    setTimeout(() => { track.style.transition = ''; }, 50);
    dots.forEach((d, i) => { if (d) d.classList.toggle('active', i === 0); });
    checkOverlay.classList.remove('show');
    checkCircle.classList.remove('pop');
    document.querySelectorAll('#wf-stage .pop').forEach(el => el.classList.remove('pop'));
    document.querySelectorAll('#wf-stage .flash, #wf-stage .fade').forEach(el => {
      el.classList.remove('flash', 'fade');
    });

    await delay(400);
    run();
  }

  // Small delay to let layout settle before first scale
  setTimeout(() => { scaleStage(); run(); }, 100);
})();
