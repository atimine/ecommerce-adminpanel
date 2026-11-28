/* Create / edit product: image upload, live preview card, validation */
(function () {
  'use strict';

  var form = document.getElementById('productForm');
  if (!form) return;

  var MAX_FILES = 5, MAX_MB = 5;
  var ALLOWED = ['image/png', 'image/jpeg', 'image/gif'];
  var PLACEHOLDER = '/img/placeholder.svg';

  var $ = function (id) { return document.getElementById(id); };
  var input = $('images'), drop = $('drop'), thumbs = $('thumbs'), uploadErr = $('uploadError');
  var pvImage = $('pvImage'), pvThumbs = $('pvThumbs'), pvName = $('pvName'), pvDesc = $('pvDesc'), pvPrice = $('pvPrice');
  var nameEl = $('name'), descEl = $('description'), priceEl = $('price'), catEl = $('category'), countEl = $('descCount');

  var initialImage = pvImage.getAttribute('src');
  var items = [];                       // [{ file, url }]  first item = main image

  /* ---------- upload ---------- */
  function syncInput() {
    var dt = new DataTransfer();
    items.forEach(function (it) { dt.items.add(it.file); });
    input.files = dt.files;
  }

  function showUploadError(msg) {
    uploadErr.textContent = msg || '';
    uploadErr.closest('.upload-field').classList.toggle('is-invalid', !!msg);
  }

  function addFiles(list) {
    var problems = [];
    Array.prototype.forEach.call(list, function (file) {
      if (ALLOWED.indexOf(file.type) === -1) { problems.push(file.name + ': only PNG, JPG and GIF are allowed.'); return; }
      if (file.size > MAX_MB * 1024 * 1024)   { problems.push(file.name + ': larger than ' + MAX_MB + ' MB.'); return; }
      if (items.length >= MAX_FILES)          { problems.push('You can upload up to ' + MAX_FILES + ' images.'); return; }
      items.push({ file: file, url: URL.createObjectURL(file) });
    });
    showUploadError(problems.filter(function (p, i) { return problems.indexOf(p) === i; }).join(' '));
    syncInput();
    render();
  }

  input.addEventListener('change', function () { addFiles(input.files); });

  ['dragenter', 'dragover'].forEach(function (ev) {
    drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('is-over'); });
  });
  ['dragleave', 'drop'].forEach(function (ev) {
    drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('is-over'); });
  });
  drop.addEventListener('drop', function (e) {
    if (e.dataTransfer && e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  });

  thumbs.addEventListener('click', function (e) {
    var remove = e.target.closest('[data-remove]');
    var pick   = e.target.closest('[data-pick]');
    if (remove) {
      var i = Number(remove.getAttribute('data-remove'));
      URL.revokeObjectURL(items[i].url);
      items.splice(i, 1);
    } else if (pick) {
      var j = Number(pick.getAttribute('data-pick'));
      items.unshift(items.splice(j, 1)[0]);          // make it the main image
    } else return;
    syncInput();
    render();
  });

  function render() {
    // thumbnails under the drop zone
    thumbs.hidden = items.length === 0;
    thumbs.innerHTML = items.map(function (it, i) {
      return '<li class="thumb' + (i === 0 ? ' is-main' : '') + '">' +
        '<button class="thumb__pick" type="button" data-pick="' + i + '" aria-label="Use image ' + (i + 1) + ' as main"><img src="' + it.url + '" alt=""></button>' +
        (i === 0 ? '<span class="thumb__badge">Main</span>' : '') +
        '<button class="thumb__remove" type="button" data-remove="' + i + '" aria-label="Remove image ' + (i + 1) + '"><svg class="icon"><use href="#i-x"/></svg></button>' +
        '</li>';
    }).join('');

    // preview card
    pvImage.src = items.length ? items[0].url : initialImage;
    pvThumbs.hidden = items.length < 2;
    pvThumbs.innerHTML = items.length < 2 ? '' : items.map(function (it, i) {
      return '<img class="' + (i === 0 ? 'is-main' : '') + '" src="' + it.url + '" alt="">';
    }).join('');
  }

  /* ---------- live preview text ---------- */
  function updateText() {
    pvName.textContent = nameEl.value.trim() || 'Product name';
    pvDesc.textContent = descEl.value.trim() || 'Short description about the product';
    var p = parseFloat(priceEl.value);
    pvPrice.textContent = '$ ' + (isNaN(p) || p < 0 ? '0.00' : p.toFixed(2));
    countEl.textContent = descEl.value.length + ' / ' + descEl.maxLength;
  }
  [nameEl, descEl, priceEl].forEach(function (el) { el.addEventListener('input', updateText); });

  /* ---------- validation ---------- */
  function setInvalid(el, bad) {
    var field = el.closest('.field');
    field.classList.toggle('is-invalid', bad);
    if (bad) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
  }

  [nameEl, descEl, priceEl, catEl].forEach(function (el) {
    el.addEventListener('input',  function () { setInvalid(el, false); });
    el.addEventListener('change', function () { setInvalid(el, false); });
  });

  form.addEventListener('submit', function (e) {
    var bad = [];
    if (!nameEl.value.trim())                          bad.push(nameEl);
    if (!catEl.value)                                  bad.push(catEl);
    if (!(parseFloat(priceEl.value) > 0))              bad.push(priceEl);
    if (!descEl.value.trim())                          bad.push(descEl);
    [nameEl, catEl, priceEl, descEl].forEach(function (el) { setInvalid(el, bad.indexOf(el) !== -1); });

    var needImage = items.length === 0 && form.getAttribute('data-has-image') !== 'true';
    if (needImage) showUploadError('Upload at least one image.');

    if (bad.length || needImage) {
      e.preventDefault();
      if (needImage) drop.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else bad[0].focus();
    }
  });

  updateText();
})();
