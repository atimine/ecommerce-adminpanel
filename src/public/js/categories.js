/* Categories: create + edit dialog */
;(function () {
	'use strict'

	var dialog = document.getElementById('categoryDialog')
	if (!dialog) return

	var form = document.getElementById('categoryForm')
	var title = document.getElementById('categoryTitle')
	var submit = document.getElementById('categorySubmit')
	var input = document.getElementById('categoryName')
	var field = input.closest('.field')

	function open(action, mode, name) {
		form.setAttribute('action', action || '')
		title.textContent = mode === 'edit' ? 'Edit category' : 'Create category'
		submit.textContent = mode === 'edit' ? 'Save changes' : 'Create'
		input.value = name || ''
		field.classList.remove('is-invalid')
		input.removeAttribute('aria-invalid')

		if (typeof dialog.showModal === 'function') dialog.showModal()
		else dialog.setAttribute('open', '')
		input.focus()
		input.select()
	}

	document.addEventListener('click', function (e) {
		var edit = e.target.closest('[data-edit-category]')
		var add = e.target.closest('[data-add-category]')
		if (edit)
			open(
				edit.getAttribute('data-action'),
				'edit',
				edit.getAttribute('data-name'),
			)
		else if (add) open(add.getAttribute('data-action'), 'add')
	})

	// /categories?add=1 opens the create dialog straight away
	var autoAdd = document.querySelector('[data-add-category]')
	if (autoAdd && /[?&]add=1(&|$)/.test(location.search))
		open(autoAdd.getAttribute('data-action'), 'add')

	input.addEventListener('input', function () {
		field.classList.remove('is-invalid')
		input.removeAttribute('aria-invalid')
	})

	form.addEventListener('submit', function (e) {
		if (!input.value.trim()) {
			e.preventDefault()
			field.classList.add('is-invalid')
			input.setAttribute('aria-invalid', 'true')
			input.focus()
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
