// Appelle callback(élément, rang dans le lot) la première fois que chaque
// élément entre à l'écran, puis cesse de l'observer.
export function onFirstVisible(elements, callback, { threshold = 0 } = {}) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      callback(entry.target, i);
    });
  }, { threshold });

  elements.forEach((el) => observer.observe(el));
}
