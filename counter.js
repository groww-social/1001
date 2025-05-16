function animateCount(el, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 20);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + (el.dataset.suffix || '');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + (el.dataset.suffix || '');
      }
    }, 20);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.getElementById('stats');
    const finalNums = statsSection.querySelectorAll('.finalnum');

    // Store targets and reset text
    finalNums.forEach(el => {
      const text = el.textContent.trim();
      const suffix = text.match(/[^\d]+$/)?.[0] || '';
      const num = parseInt(text, 10);
      el.dataset.suffix = suffix;
      el.dataset.target = num;
      el.textContent = '0' + suffix;
    });

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          finalNums.forEach(el => {
            animateCount(el, parseInt(el.dataset.target));
          });
          observer.unobserve(statsSection);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  });
