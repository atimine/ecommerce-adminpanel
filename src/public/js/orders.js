/* Orders list: submit the month filter as soon as it changes */
;(function () {
	'use strict'
	var select = document.getElementById('month')
	var form = document.getElementById('monthForm')
	if (select && form)
		select.addEventListener('change', function () {
			form.submit()
		})
})()
