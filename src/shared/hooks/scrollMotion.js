export function installScrollMotion() {
  const root = document.querySelector('.app'), header = root && root.querySelector('.topbar');
  if (!header)
    return { refresh() { }, dispose() { } };
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0, observer = null, disposed = false;
  const update = () => {
    frame = 0;
    if (disposed)
      return;
    const doc = document.documentElement;
    const max = Math.max(0, doc.scrollHeight - window.innerHeight);
    const progress = max ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
    header.style.setProperty('--scroll-progress', String(progress));
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  const schedule = () => {
    if (!frame && !disposed)
      frame = requestAnimationFrame(update);
  };
  const refresh = () => {
    if (disposed)
      return;
    if (observer)
      observer.disconnect();
    schedule();
    if (media.matches || !('IntersectionObserver' in window))
      return;
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          if (entry.target.contains(document.activeElement))
            continue;
          entry.target.classList.add('nyro-scroll-reveal');
        }
      }
    }, { threshold: 0.08 });
    const sections = root.querySelectorAll('.page-content > .surface, .page-content > .wallet-grid, .page-content > .service-section, .page-content > .bottom-grid');
    for (const section of sections) {
      if (section.getBoundingClientRect().top >= window.innerHeight + 16 && !section.classList.contains('nyro-scroll-reveal'))
        observer.observe(section);
    }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', refresh, { passive: true });
  const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(schedule) : null;
  if (resizeObserver)
    resizeObserver.observe(root);
  if (media.addEventListener)
    media.addEventListener('change', refresh);
  else
    media.addListener(refresh);
  refresh();
  return {
    refresh, dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      if (observer)
        observer.disconnect();
      if (resizeObserver)
        resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', refresh);
      if (media.removeEventListener)
        media.removeEventListener('change', refresh);
      else
        media.removeListener(refresh);
    }
  };
}
