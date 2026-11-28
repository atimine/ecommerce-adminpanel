/* Profile: avatar picker, live summary, show/hide password, validation */
(function () {
  'use strict';

  var form = document.getElementById('profileForm');
  if (!form) return;

  var $ = function (id) { return document.getElementById(id); };
  var nameEl = $('pfName'), emailEl = $('pfEmail');
  var curEl = $('pfCurrent'), newEl = $('pfNew'), confEl = $('pfConfirm');
  var sumAvatar = $('sumAvatar'), sumName = $('sumName'), sumEmail = $('sumEmail');
  var radios = Array.prototype.slice.call(form.querySelectorAll('input[name="avatar"]'));

  /* ---------- avatar ---------- */
  var saved = form.getAttribute('data-avatar');
  radios.forEach(function (r) { r.checked = saved ? r.value === saved : r.defaultChecked; });
  if (saved && !radios.some(function (r) { return r.checked; })) radios[0].checked = true;

  radios.forEach(function (r) {
    r.addEventListener('change', function () {
      if (r.checked) sumAvatar.src = r.parentNode.querySelector('img').src;
    });
  });

  /* ---------- live summary ---------- */
  nameEl.addEventListener('input',  function () { sumName.textContent  = nameEl.value.trim(); });
  emailEl.addEventListener('input', function () { sumEmail.textContent = emailEl.value.trim(); });

  /* ---------- show / hide password ---------- */
  form.querySelectorAll('[data-toggle-password]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = $(btn.getAttribute('data-toggle-password'));
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.setAttribute('aria-pressed', String(show));
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      btn.querySelector('use').setAttribute('href', show ? '#i-eye-off' : '#i-eye');
    });
  });

  /* ---------- validation ---------- */
  function mark(el, bad) {
    el.closest('.field').classList.toggle('is-invalid', bad);
    if (bad) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
  }

  [nameEl, emailEl, curEl, newEl, confEl].forEach(function (el) {
    el.addEventListener('input', function () { mark(el, false); });
  });

  form.addEventListener('submit', function (e) {
    var bad = [];
    var wantsPassword = !!(curEl.value || newEl.value || confEl.value);

    if (!nameEl.value.trim()) bad.push(nameEl);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) bad.push(emailEl);

    if (wantsPassword) {
      if (!curEl.value) bad.push(curEl);
      if (newEl.value.length < 8) bad.push(newEl);
      if (confEl.value !== newEl.value) bad.push(confEl);
    }

    [nameEl, emailEl, curEl, newEl, confEl].forEach(function (el) { mark(el, bad.indexOf(el) !== -1); });

    if (bad.length) { e.preventDefault(); bad[0].focus(); }
  });
})();
