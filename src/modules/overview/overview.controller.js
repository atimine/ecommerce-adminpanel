class OverviewController {
	async getOverviewInfo(req, res) {
		res.render('overview', {
			layout: 'main',
			pageTitle: 'Dashboard',
			pageDescription:
				'Manage inventory, analyze data, and track orders with ease',
			pageCss: 'overview',
		})
	}
}

module.exports = new OverviewController()
