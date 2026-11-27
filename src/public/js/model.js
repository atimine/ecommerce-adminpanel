/* Shared confirm dialog (delete / block). See partials/confirm-dialog.hbs */
;(function () {
	'use strict'

	var dialog = document.getElementById('confirmDialog')
	if (!dialog) return

	var form = document.getElementById('confirmForm')
	var title = document.getElementById('confirmTitle')
	var text = document.getElementById('confirmText')
	var ok = document.getElementById('confirmOk')

	document.addEventListener('click', function (e) {
		var btn = e.target.closest('[data-confirm]')
		if (!btn) return

		title.textContent =
			btn.getAttribute('data-confirm-title') || 'Are you sure?'
		text.textContent =
			btn.getAttribute('data-confirm-text') || "This action can't be undone."
		ok.textContent = btn.getAttribute('data-confirm-button') || 'Delete'
		form.setAttribute('action', btn.getAttribute('data-confirm-action') || '')

		if (typeof dialog.showModal === 'function') dialog.showModal()
		else dialog.setAttribute('open', '')
	})

	dialog.querySelectorAll('[data-dialog-close]').forEach(function (b) {
		b.addEventListener('click', function () {
			dialog.close()
		})
	})

	// click on the dark backdrop closes it
	dialog.addEventListener('click', function (e) {
		if (e.target === dialog) dialog.close()
	})
})()
