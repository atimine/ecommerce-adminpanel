/* Products list: price checkboxes, custom range slider, mobile filter panel */
;(function () {
	'use strict'

	/* ---------- mobile filter panel ---------- */
	var toggle = document.getElementById('filterToggle')
	var filters = document.getElementById('filters')
	if (toggle && filters) {
		toggle.addEventListener('click', function () {
			var open = filters.classList.toggle('is-open')
			toggle.setAttribute('aria-expanded', String(open))
		})
	}

	/* ---------- price checkboxes ("All Price" is exclusive) ---------- */
	var checks = Array.prototype.slice.call(
		document.querySelectorAll('#priceChecks input[type="checkbox"]'),
	)
	var allBox = checks.filter(function (c) {
		return c.value === 'all'
	})[0]

	checks.forEach(function (box) {
		box.addEventListener('change', function () {
			if (box === allBox && box.checked) {
				checks.forEach(function (c) {
					if (c !== allBox) c.checked = false
				})
			} else if (box !== allBox && box.checked && allBox) {
				allBox.checked = false
			}
			if (
				allBox &&
				!checks.some(function (c) {
					return c.checked
				})
			)
				allBox.checked = true
			if (box.checked) resetRange() // checkboxes and custom range don't mix
		})
	})

	/* ---------- custom price range ---------- */
	var range = document.getElementById('range')
	var rMin = document.getElementById('rangeMin')
	var rMax = document.getElementById('rangeMax')
	var nMin = document.getElementById('minPrice')
	var nMax = document.getElementById('maxPrice')
	var tip = document.getElementById('rangeTip')
	if (!range) return

	var LIMIT = Number(rMin.max)
	var STEP = Number(rMin.step) || 1

	function paint() {
		var lo = Number(rMin.value),
			hi = Number(rMax.value)
		range.style.setProperty('--lo', lo / LIMIT)
		range.style.setProperty('--hi', hi / LIMIT)
		tip.textContent = '$' + hi
		// keep the min thumb reachable when both handles sit at the far right
		rMin.style.zIndex = lo >= LIMIT - STEP * 2 ? 3 : 1
		nMin.value = lo
		nMax.value = hi
	}

	function resetRange() {
		rMin.value = 0
		rMax.value = LIMIT
		paint()
	}

	function usedRange() {
		if (allBox) {
			checks.forEach(function (c) {
				c.checked = false
			})
			allBox.checked = false
		}
	}

	rMin.addEventListener('input', function () {
		if (Number(rMin.value) > Number(rMax.value) - STEP)
			rMin.value = Number(rMax.value) - STEP
		usedRange()
		paint()
	})
	rMax.addEventListener('input', function () {
		if (Number(rMax.value) < Number(rMin.value) + STEP)
			rMax.value = Number(rMin.value) + STEP
		usedRange()
		paint()
	})

	function fromNumber(input, slider, isMin) {
		input.addEventListener('change', function () {
			var v = parseInt(input.value, 10)
			if (isNaN(v)) v = isMin ? 0 : LIMIT
			v = Math.max(0, Math.min(LIMIT, v))
			if (isMin) v = Math.min(v, Number(rMax.value) - STEP)
			else v = Math.max(v, Number(rMin.value) + STEP)
			slider.value = v
			usedRange()
			paint()
		})
	}
	fromNumber(nMin, rMin, true)
	fromNumber(nMax, rMax, false)

	paint()
})()
