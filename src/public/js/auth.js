/* Login page: show/hide password + simple required-field check */
;(function () {
	'use strict'

	var form = document.getElementById('loginForm')
	var password = document.getElementById('password')
	var toggle = document.getElementById('togglePassword')
	if (!form) return

	// show / hide password
	toggle.addEventListener('click', function () {
		var show = password.type === 'password'
		password.type = show ? 'text' : 'password'
		toggle.setAttribute('aria-pressed', String(show))
		toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password')
		toggle
			.querySelector('use')
			.setAttribute('href', show ? '#i-eye-off' : '#i-eye')
		password.focus()
	})

	// clear the error as soon as the person types
	form.querySelectorAll('.input').forEach(function (input) {
		input.addEventListener('input', function () {
			input.closest('.field').classList.remove('is-invalid')
			input.removeAttribute('aria-invalid')
		})
	})

	// block submit if a field is empty (the server still has to validate)
	form.addEventListener('submit', function (e) {
		var firstBad = null
		form.querySelectorAll('.input').forEach(function (input) {
			var bad = !input.value.trim()
			input.closest('.field').classList.toggle('is-invalid', bad)
			if (bad) {
				input.setAttribute('aria-invalid', 'true')
				if (!firstBad) firstBad = input
			}
		})
		if (firstBad) {
			e.preventDefault()
			firstBad.focus()
		}
	})
})()
