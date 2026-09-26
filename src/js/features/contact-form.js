import { t } from '../i18n/index.js';

// Envoi AJAX vers Formspree avec retour en ligne. Sans JS, le formulaire garde
// son envoi classique (POST puis page de confirmation Formspree).
export function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('cf-status');
  if (!form) return;

  // Le message porte sa clé i18n : un changement de langue le retraduit
  const setStatus = (key, state) => {
    if (!status) return;
    status.classList.remove('is-success', 'is-error');
    if (!key) {
      delete status.dataset.i18n;
      status.textContent = '';
      return;
    }
    status.dataset.i18n = key;
    status.textContent = t(key);
    if (state) status.classList.add(`is-${state}`);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Pot de miel rempli : robot, on n'envoie rien
    if (form.querySelector('input[name="_gotcha"]')?.value) return;

    let replyTo = form.querySelector('input[name="_replyto"]');
    if (!replyTo) {
      replyTo = Object.assign(document.createElement('input'), { type: 'hidden', name: '_replyto' });
      form.appendChild(replyTo);
    }
    replyTo.value = form.querySelector('input[name="email"]').value;

    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    setStatus('contact.sending');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus('contact.success', 'success');
    } catch {
      setStatus('contact.error', 'error');
    } finally {
      submit.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
}
