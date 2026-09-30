import { t } from '../i18n/index.js';
import { showToast } from '../ui/toast.js';

const SEND_TIMEOUT = 15000;
const MIN_MESSAGE_LENGTH = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Clé i18n du message d'erreur d'un champ, ou null s'il est valide
function fieldProblem(field) {
  const value = field.value.trim();
  if (field.required && !value) return 'contact.errRequired';
  if (field.type === 'email' && !EMAIL_PATTERN.test(value)) return 'contact.errEmail';
  if (field.name === 'message' && value.length < MIN_MESSAGE_LENGTH) return 'contact.errShort';
  return null;
}

// Envoi AJAX vers Formspree (sans JS : POST classique).
export function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('cf-status');
  if (!form) return;

  // Validation par JS, pas par les bulles du navigateur
  form.noValidate = true;

  const fields = [...form.querySelectorAll('.form-group input, .form-group textarea')];
  const submit = form.querySelector('[type="submit"]');
  const submitLabel = submit.querySelector('[data-i18n]');
  const idleLabelKey = submitLabel.dataset.i18n;
  const touched = new WeakSet();

  // Le statut porte sa clé i18n : il suit les changements de langue
  const setStatus = (key, state) => {
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

  const setSubmitLabel = (key) => {
    submitLabel.dataset.i18n = key;
    submitLabel.textContent = t(key);
  };

  const showProblem = (field, key) => {
    const error = field.closest('.form-group').querySelector('.field-error');
    if (key) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    if (!error) return;
    if (key) {
      error.dataset.i18n = key;
      error.textContent = t(key);
    } else {
      delete error.dataset.i18n;
      error.textContent = '';
    }
  };

  fields.forEach((field) => {
    // Validation à la première sortie du champ, puis en direct
    field.addEventListener('blur', () => {
      touched.add(field);
      showProblem(field, fieldProblem(field));
    });
    field.addEventListener('input', () => {
      if (touched.has(field)) showProblem(field, fieldProblem(field));
      if (status.classList.contains('is-error') || status.classList.contains('is-success')) setStatus(null);
    });
  });

  const textarea = form.querySelector('textarea');
  const autosize = () => {
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight + 2, 420)}px`;
  };
  textarea?.addEventListener('input', autosize);

  textarea?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) form.requestSubmit();
  });

  const validate = () => {
    let firstInvalid = null;
    fields.forEach((field) => {
      touched.add(field);
      const problem = fieldProblem(field);
      showProblem(field, problem);
      if (problem && !firstInvalid) firstInvalid = field;
    });
    firstInvalid?.focus();
    return !firstInvalid;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Pot de miel rempli : robot, on n'envoie rien
    if (form.querySelector('input[name="_gotcha"]')?.value) return;

    if (!validate()) {
      setStatus('contact.fix', 'error');
      return;
    }

    let replyTo = form.querySelector('input[name="_replyto"]');
    if (!replyTo) {
      replyTo = Object.assign(document.createElement('input'), { type: 'hidden', name: '_replyto' });
      form.appendChild(replyTo);
    }
    replyTo.value = form.querySelector('input[name="email"]').value;

    submit.disabled = true;
    submit.classList.add('is-loading');
    form.setAttribute('aria-busy', 'true');
    setSubmitLabel('contact.sending');
    setStatus(null);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      form.reset();
      fields.forEach((field) => { touched.delete(field); showProblem(field, null); });
      autosize();
      setStatus('contact.success', 'success');
      showToast({
        id: 'contact', title: t('contact.toastTitle'), text: t('contact.toastText'), closeLabel: t('toast.close'),
      });
    } catch {
      setStatus('contact.error', 'error');
    } finally {
      clearTimeout(timer);
      submit.disabled = false;
      submit.classList.remove('is-loading');
      form.removeAttribute('aria-busy');
      setSubmitLabel(idleLabelKey);
    }
  });
}
