class OrderController {
	async getClients(req, res) {
		res.render('clients', {
			pageTitle: 'Clients',
			pageDescription: 'View and manage all your clients easily.',
			searchPlaceholder: 'Search client...',
			searchAction: '/clients',
			q: '',
			pageCss: 'people',
			pageJs: 'people',
			total: 4600,
			clients: [
				{
					id: 1,
					name: 'Gail C. Anderson',
					initials: 'GA',
					phone: '+998 90 123 45 67',
					telegramId: '5120093321',
					location: 'Chilonzor 9, Tashkent',
					blocked: false, // true = blocked
				},
			],
			pagination: {
				page: 1,
				pages: 10,
				firstUrl: '',
				prevUrl: '',
				nextUrl: '/clients?page=2',
				lastUrl: '/clients?page=10',
			},
		})

		//   POST routes used here:
		//     /clients/:id/block   /clients/:id/unblock   /clients/:id/edit   /clients/:id/delete
		// --}}
	}
}

module.exports = new OrderController()
