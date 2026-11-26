/* =========================================================
   Shoplytic admin – base behaviour
   1) mobile sidebar  2) submenu accordion + active link
   3) notifications dropdown
   ========================================================= */
;(function () {
	'use strict'

	var body = document.body

	/* ---------- 1) Mobile sidebar ---------- */
	function openSidebar() {
		body.classList.add('sidebar-open')
	}
	function closeSidebar() {
		body.classList.remove('sidebar-open')
	}

	var openBtn = document.getElementById('sidebarOpen')
	var closeBtn = document.getElementById('sidebarClose')
	var overlay = document.getElementById('overlay')

	if (openBtn) openBtn.addEventListener('click', openSidebar)
	if (closeBtn) closeBtn.addEventListener('click', closeSidebar)
	if (overlay) overlay.addEventListener('click', closeSidebar)

	/* ---------- 2) Submenus + active link ---------- */
	var groups = Array.prototype.slice.call(
		document.querySelectorAll('[data-group]'),
	)

	function setOpen(group, open) {
		group.classList.toggle('is-open', open)
		var toggle = group.querySelector('.nav__toggle')
		if (toggle) toggle.setAttribute('aria-expanded', String(open))
	}

	groups.forEach(function (group) {
		var toggle = group.querySelector('.nav__toggle')
		toggle.addEventListener('click', function () {
			var willOpen = !group.classList.contains('is-open')
			groups.forEach(function (g) {
				setOpen(g, false)
			}) // accordion: one open at a time
			setOpen(group, willOpen)
		})
	})

	// Mark the link whose data-match is the longest match for the current path.
	// (preview.html sets window.__ACTIVE_PATH__ because it is opened as a file)
	var path =
		(window.__ACTIVE_PATH__ || location.pathname).replace(/\/+$/, '') || '/'
	var best = null,
		bestLen = -1

	document.querySelectorAll('[data-match]').forEach(function (link) {
		var m = link.getAttribute('data-match')
		var hit =
			m === '/' ? path === '/' : path === m || path.indexOf(m + '/') === 0
		if (hit && m.length > bestLen) {
			best = link
			bestLen = m.length
		}
	})

	if (best) {
		best.classList.add('is-active')
		var parentGroup = best.closest('[data-group]')
		if (parentGroup) {
			parentGroup.classList.add('is-current')
			setOpen(parentGroup, true)
		}
	}

	/* ---------- 3) Notifications ---------- */
	var notif = document.getElementById('notif')
	var notifBtn = document.getElementById('notifBtn')
	var notifDot = document.getElementById('notifDot')
	var notifRead = document.getElementById('notifRead')

	function setNotif(open) {
		if (!notif) return
		notif.classList.toggle('is-open', open)
		notifBtn.setAttribute('aria-expanded', String(open))
	}

	if (notif) {
		notifBtn.addEventListener('click', function (e) {
			e.stopPropagation()
			setNotif(!notif.classList.contains('is-open'))
		})

		notif.addEventListener('click', function (e) {
			e.stopPropagation()
		})

		notifRead.addEventListener('click', function () {
			notif.querySelectorAll('.is-unread').forEach(function (el) {
				el.classList.remove('is-unread')
			})
			notifDot.classList.add('is-hidden')
		})

		document.addEventListener('click', function () {
			setNotif(false)
		})
	}

	document.addEventListener('keydown', function (e) {
		if (e.key !== 'Escape') return
		setNotif(false)
		closeSidebar()
	})

	// If the window grows past the mobile breakpoint, make sure the drawer state is reset
	window.addEventListener('resize', function () {
		if (window.innerWidth > 1100) closeSidebar()
	})
})()
