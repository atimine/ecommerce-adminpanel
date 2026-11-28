class ProfileController {
	async getProfileInfo(req, res) {
		res.render('profile', {
			pageTitle: 'Profile',
			pageDescription: 'Update your personal details and password.',
			pageCss: 'profile',
			pageJs: 'profile',
			user: {
				name: 'Adham',
				email: 'adham@example.com',
				role: 'Admin',
				avatar: 'avatar-3.svg',
			}, // also used by the navbar
			success: 'Profile updated.', // optional green message
			error: '', // optional red message (e.g. "Current password is wrong")
		})

		// The form posts to /profile with: avatar (file name), name, email, currentPassword, newPassword, confirmPassword.
		// Leave the password fields empty to keep the current password.
		// Sample avatars are in /public/img/avatars/avatar-1.svg ... avatar-8.svg (replace them with your own).
	}
}

module.exports = new ProfileController()
