// Notifications (langue, CV, copie…) dans une région aria-live unique ;
// le survol ou le focus suspend le minuteur.

const REGION_ID = 'toast-region';
const DEFAULT_DURATION = 3600;

function getRegion() {
  let region = document.getElementById(REGION_ID);
  if (!region) {
    region = Object.assign(document.createElement('div'), { id: REGION_ID, className: 'toast-region' });
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    document.body.appendChild(region);
  }
  return region;
}

function textElement(className, value) {
  const el = document.createElement('span');
  el.className = className;
  el.textContent = value;
  return el;
}

// title ; text (ligne secondaire) ; detail (ligne technique en capitales) ; kind : success | error | info ;
// id (remplace un toast de même id) ; duration en ms (0 = jusqu'à la fermeture) ; closeLabel (accessible).
export function showToast({
  title, text = '', detail = '', kind = 'success', id = '', duration = DEFAULT_DURATION, closeLabel = 'Close',
}) {
  const region = getRegion();
  if (id) region.querySelector(`[data-toast-id="${id}"]`)?.remove();

  const toast = document.createElement('div');
  toast.className = `toast is-${kind}`;
  if (id) toast.dataset.toastId = id;
  if (kind === 'error') toast.setAttribute('role', 'alert');

  const icon = textElement('toast-icon', kind === 'error' ? '!' : kind === 'info' ? 'i' : '✓');
  icon.setAttribute('aria-hidden', 'true');

  const body = document.createElement('span');
  body.className = 'toast-body';
  body.append(textElement('toast-title', title));
  if (detail) body.append(textElement('toast-detail', detail));
  if (text) body.append(textElement('toast-text', text));

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'toast-close';
  close.setAttribute('aria-label', closeLabel);
  close.textContent = '×';

  toast.append(icon, body, close);

  let timer = null;
  let remaining = duration;
  let startedAt = 0;

  const dismiss = () => {
    clearTimeout(timer);
    if (!toast.isConnected) return;
    toast.classList.remove('is-visible');
    const remove = () => toast.remove();
    toast.addEventListener('transitionend', remove, { once: true });
    setTimeout(remove, 400); // repli si la transition est désactivée
  };
  const start = () => {
    if (!duration || timer) return;
    startedAt = Date.now();
    timer = setTimeout(dismiss, remaining);
    toast.classList.remove('is-paused');
  };
  const pause = () => {
    if (!duration || !timer) return;
    clearTimeout(timer);
    timer = null;
    remaining -= Date.now() - startedAt;
    toast.classList.add('is-paused');
  };

  close.addEventListener('click', dismiss);
  toast.addEventListener('mouseenter', pause);
  toast.addEventListener('mouseleave', start);
  toast.addEventListener('focusin', pause);
  toast.addEventListener('focusout', start);

  if (duration) toast.style.setProperty('--toast-duration', `${duration}ms`);
  else toast.classList.add('is-sticky');

  region.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('is-visible'));
  start();

  return dismiss;
}
