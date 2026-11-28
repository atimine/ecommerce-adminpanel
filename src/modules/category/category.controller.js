class CategoryController {
	async getCategories(req, res) {
		res.render('categories', {
			pageTitle: 'Categories',
			pageDescription: 'Create and manage product categories.',
			searchPlaceholder: 'Search category...',
			searchAction: '/categories',
			q: '',
			pageCss: 'categories',
			pageJs: 'categories',
			total: 8,
			categories: [
				{ id: 1, name: 'T-Shirts', products: 120, suspended: false },
			],
			pagination: {
				page: 1,
				pages: 1,
				firstUrl: '',
				prevUrl: '',
				nextUrl: '',
				lastUrl: '',
			}, // optional
		})

		//   /categories?add=1 opens the "Create category" dialog straight away.

		//   POST routes used here:
		//     /categories (create)   /categories/:id/edit   /categories/:id/suspend   /categories/:id/activate   /categories/:id/delete
		// --}}
	}
}

module.exports = new CategoryController()
