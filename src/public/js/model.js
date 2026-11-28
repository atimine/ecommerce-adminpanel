/* Shared confirm dialog (delete / block / confirm / cancel). See partials/confirm-dialog.hbs */
;(function () {
	'use strict'

	var dialog = document.getElementById('confirmDialog')
	if (!dialog) return

	var form = document.getElementById('confirmForm')
	var title = document.getElementById('confirmTitle')
	var text = document.getElementById('confirmText')
	var ok = document.getElementById('confirmOk')
	var dismiss = document.getElementById('confirmDismiss')
	var icon = document.getElementById('confirmIcon')
	var iconUse = icon.querySelector('use')

	document.addEventListener('click', function (e) {
		var btn = e.target.closest('[data-confirm]')
		if (!btn) return

		var success = btn.getAttribute('data-confirm-tone') === 'success'

		title.textContent =
			btn.getAttribute('data-confirm-title') || 'Are you sure?'
		text.textContent =
			btn.getAttribute('data-confirm-text') || "This action can't be undone."
		ok.textContent = btn.getAttribute('data-confirm-button') || 'Delete'
		dismiss.textContent = btn.getAttribute('data-confirm-dismiss') || 'Cancel'
		form.setAttribute('action', btn.getAttribute('data-confirm-action') || '')

		icon.className =
			'tint dialog__icon ' + (success ? 'tint--green' : 'tint--red')
		iconUse.setAttribute(
			'href',
			'#' +
				(btn.getAttribute('data-confirm-icon') ||
					(success ? 'i-check-circle' : 'i-trash')),
		)
		ok.className = 'btn ' + (success ? 'btn--primary' : 'btn--danger')

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
