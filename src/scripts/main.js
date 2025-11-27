document.addEventListener('DOMContentLoaded', () => {
  console.log('main.js carregado');

  const relationshipStartDate = new Date('2025-08-29T00:00:00');
  const countdownElement = document.getElementById('countdown');

  function updateCountdown() {
    if (!countdownElement) return;
    const now = new Date();
    let duration = now - relationshipStartDate;
    if (isNaN(duration)) {
      countdownElement.textContent = 'data inválida';
      return;
    }
    if (duration < 0) duration = 0;

    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days} dias ${hours}h ${minutes}m ${seconds}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // CARROSSEL
  const items = Array.from(document.querySelectorAll('.carousel-item'));
  if (items.length === 0) {
    console.warn('carousel: nenhum item encontrado');
    return;
  }

  const dotsContainer = document.getElementById('dots');
  let current = 0;
  let intervalId = null;

  function show(index) {
    index = (index + items.length) % items.length;
    items.forEach((it, i) => {
      it.classList.toggle('active', i === index);
    });
    if (dotsContainer) {
      const dots = Array.from(dotsContainer.children);
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }
    current = index;
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  // cria dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    items.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', `Slide ${i + 1}`);
      btn.addEventListener('click', () => { show(i); restartAuto(); });
      dotsContainer.appendChild(btn);
    });
  }

  document.getElementById('nextBtn')?.addEventListener('click', () => { next(); restartAuto(); });
  document.getElementById('prevBtn')?.addEventListener('click', () => { prev(); restartAuto(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); restartAuto(); }
    if (e.key === 'ArrowLeft') { prev(); restartAuto(); }
  });

  function startAuto() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(next, 4500);
  }
  function restartAuto() { startAuto(); }

  // iniciar
  show(0);
  startAuto();
});
