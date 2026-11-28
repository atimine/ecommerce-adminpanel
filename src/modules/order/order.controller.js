class OrderController {
	async getOrders(req, res) {
		res.render('orders', {
			pageTitle: 'Orders List',
			pageDescription: 'View and manage all customer orders easily.',
			pageCss: 'orders',
			pageJs: 'orders',
			monthLast: false, // true when "Last Month" is selected
			stats: {
				refund: 490,
				cancel: 241,
				shipped: 630,
				delivering: 170,
				review: 210,
				pendingPayment: 608,
				delivered: 200,
				inProgress: 656,
			},
			orders: [
				{
					uid: 1,
					id: '#583488/80',
					date: '29 April 2024',
					customer: 'Gail C. Anderson',
					priority: 'Normal',
					total: '$1,230.00',
					paymentStatus: 'Paid',
					paymentClass: 'paid',
					items: 4,
					delivery: '#D-57837678', // or '--'
					status: 'Draft',
					statusClass: 'draft', // draft | packaging | completed | canceled | shipped | delivering | delivered | pending | progress
				},
			],
			pagination: {
				page: 1,
				pages: 10,
				firstUrl: '',
				prevUrl: '',
				nextUrl: '/orders?page=2',
				lastUrl: '/orders?page=10',
			},
		})
	}

	async editOrder(req, res) {
		res.render('orders-edit', {
			pageTitle: 'Edit Orders',
			pageDescription: 'Confirm or cancel new orders and assign couriers.',
			pageCss: 'orders-edit',
			pageJs: 'orders-edit',
			tabNew: true, // exactly one of tabNew / tabConfirmed / tabCanceled is true
			tabConfirmed: false,
			tabCanceled: false,
			counts: { new: 12, confirmed: 48, canceled: 7 },
			couriers: [
				{ id: 1, name: 'Jasur Toshmatov', phone: '+998 90 123 45 67' },
			], // used by the assign dialog
			orders: [
				{
					uid: 1,
					id: '#583488/80',
					date: '29 April 2024',
					customer: 'Gail C. Anderson',
					address: 'Chilonzor 9, Tashkent',
					items: 4,
					total: '$1,230.00',
					paymentStatus: 'Paid',
					paymentClass: 'paid',
					courier: 'Jasur Toshmatov',
					courierId: 1, // confirmed tab only; empty = not assigned
				},
			],
			pagination: {
				page: 1,
				pages: 3,
				firstUrl: '',
				prevUrl: '',
				nextUrl: '/orders/edit?tab=new&page=2',
				lastUrl: '/orders/edit?tab=new&page=3',
			},
		})

		// POST routes used here:
		//   /orders/:uid/confirm   /orders/:uid/cancel   /orders/:uid/courier  (field: courier = courier id)
	}
}

module.exports = new OrderController()
