/* Clients / Couriers: add + edit dialog */
(function () {
  'use strict';

  var dialog = document.getElementById('personDialog');
  if (!dialog) return;

  var form     = document.getElementById('personForm');
  var title    = document.getElementById('personTitle');
  var submit   = document.getElementById('personSubmit');
  var fields   = {
    name:     document.getElementById('pName'),
    phone:    document.getElementById('pPhone'),
    telegram: document.getElementById('pTelegram'),
    location: document.getElementById('pLocation')
  };

  function clearErrors() {
    Object.keys(fields).forEach(function (k) {
      var f = fields[k].closest('.field');
      f.classList.remove('is-invalid');
      fields[k].removeAttribute('aria-invalid');
    });
  }

  function open(action, mode, data) {
    data = data || {};
    form.setAttribute('action', action || '');
    title.textContent  = (mode === 'edit' ? dialog.getAttribute('data-edit-title') : dialog.getAttribute('data-add-title')) || title.textContent;
    submit.textContent = mode === 'edit' ? 'Save changes' : 'Add';

    fields.name.value     = data.name || '';
    fields.phone.value    = data.phone || '';
    fields.telegram.value = data.telegram || '';
    fields.location.value = data.location || '';
    clearErrors();

    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    fields.name.focus();
  }

  document.addEventListener('click', function (e) {
    var edit = e.target.closest('[data-edit-person]');
    var add  = e.target.closest('[data-add-person]');
    if (edit) {
      open(edit.getAttribute('data-action'), 'edit', {
        name:     edit.getAttribute('data-name'),
        phone:    edit.getAttribute('data-phone'),
        telegram: edit.getAttribute('data-telegram'),
        location: edit.getAttribute('data-location')
      });
    } else if (add) {
      open(add.getAttribute('data-action'), 'add');
    }
  });

  // pages can link here with ?add=1 to open the "add" dialog straight away
  var autoAdd = document.querySelector('[data-add-person]');
  if (autoAdd && /[?&]add=1(&|$)/.test(location.search)) open(autoAdd.getAttribute('data-action'), 'add');

  /* validation */
  function mark(el, bad) {
    el.closest('.field').classList.toggle('is-invalid', bad);
    if (bad) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
  }

  Object.keys(fields).forEach(function (k) {
    fields[k].addEventListener('input', function () { mark(fields[k], false); });
  });

  form.addEventListener('submit', function (e) {
    var bad = [];
    if (!fields.name.value.trim()) bad.push(fields.name);
    if (fields.phone.value.replace(/\D/g, '').length < 7) bad.push(fields.phone);
    if (!fields.telegram.value.trim()) bad.push(fields.telegram);

    [fields.name, fields.phone, fields.telegram].forEach(function (el) { mark(el, bad.indexOf(el) !== -1); });

    if (bad.length) { e.preventDefault(); bad[0].focus(); }
  });

  dialog.querySelectorAll('[data-dialog-close]').forEach(function (b) {
    b.addEventListener('click', function () { dialog.close(); });
  });
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
})();
