class CourierController {
	async getCouriers(req, res) {
		res.render('courier', {
			pageTitle: 'Couriers',
			pageDescription: 'View and manage all your couriers easily.',
			searchPlaceholder: 'Search courier...',
			searchAction: '/couriers',
			q: '',
			pageCss: 'people',
			pageJs: 'people',
			total: 24,
			couriers: [
				{
					id: 1,
					name: 'Jasur Toshmatov',
					initials: 'JT',
					phone: '+998 90 123 45 67',
					telegramId: '5120093321',
					location: 'Chilonzor, Tashkent',
					blocked: false,
				},
			],
			pagination: {
				page: 1,
				pages: 3,
				firstUrl: '',
				prevUrl: '',
				nextUrl: '/couriers?page=2',
				lastUrl: '/couriers?page=3',
			},
		})
	}

	async getHistory(req, res) {
		res.render('courier-history', {
			pageTitle: 'Courier History',
			pageDescription: 'See how many orders each courier has completed.',
			searchPlaceholder: 'Search courier...',
			searchAction: '/couriers/history',
			q: '',
			pageCss: 'people',
			pageJs: 'orders', // orders.js only submits the period filter
			periodLast: false,
			periodAll: false, // both false = "This Month"
			totalCompleted: 1284,
			couriers: [
				{
					// sorted by completed, highest first
					rank: 1,
					top: true, // top: true highlights the first three
					name: 'Jasur Toshmatov',
					initials: 'JT',
					phone: '+998 90 123 45 67',
					completed: 214,
					percent: 100, // percent = completed / highest completed * 100
				},
			],
			pagination: {
				page: 1,
				pages: 2,
				firstUrl: '',
				prevUrl: '',
				nextUrl: '/couriers/history?page=2',
				lastUrl: '/couriers/history?page=2',
			},
		})
	}
}

module.exports = new CourierController()
