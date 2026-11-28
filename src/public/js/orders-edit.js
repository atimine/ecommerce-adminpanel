/* Edit orders: assign-courier dialog */
;(function () {
	'use strict'

	var dialog = document.getElementById('courierDialog')
	if (!dialog) return // only on the "Confirmed" tab

	var form = document.getElementById('courierForm')
	var select = document.getElementById('courierSelect')
	var text = document.getElementById('courierText')
	var field = select.closest('.field')

	document.addEventListener('click', function (e) {
		var btn = e.target.closest('[data-assign]')
		if (!btn) return

		form.setAttribute(
			'action',
			'/orders/' + btn.getAttribute('data-order') + '/courier',
		)
		text.textContent =
			'Choose who will deliver order ' + btn.getAttribute('data-order-id') + '.'

		var current = btn.getAttribute('data-current')
		select.value = current || ''
		if (select.value !== (current || '')) select.value = '' // current courier no longer in the list
		field.classList.remove('is-invalid')

		if (typeof dialog.showModal === 'function') dialog.showModal()
		else dialog.setAttribute('open', '')
	})

	select.addEventListener('change', function () {
		field.classList.remove('is-invalid')
	})

	form.addEventListener('submit', function (e) {
		if (!select.value) {
			e.preventDefault()
			field.classList.add('is-invalid')
			select.focus()
		}
	})

	dialog.querySelectorAll('[data-dialog-close]').forEach(function (b) {
		b.addEventListener('click', function () {
			dialog.close()
		})
	})
	dialog.addEventListener('click', function (e) {
		if (e.target === dialog) dialog.close()
	})
})()
