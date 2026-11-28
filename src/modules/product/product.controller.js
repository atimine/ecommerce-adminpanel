class ProductController {
	async getProducts(req, res) {
		res.render('products', {
			pageTitle: 'Products',
			pageDescription: 'View and manage all listed products easily.',
			pageCss: 'products',
			pageJs: 'products',
			total: 5786,
			filterLabel: 'All Price', // optional breadcrumb text
			q: '', // current search text
			categories: [
				{ slug: 't-shirts', name: 'T-Shirts', count: 120, checked: false },
			],
			priceMin: 0,
			priceMax: 1100, // optional, current custom range
			products: [
				{
					id: 1,
					name: '...',
					description: '...',
					price: '320.00',
					likes: 128,
					image: '/img/products/1.jpg',
				},
			],
		})
	}

	async createProduct(req, res) {
		res.render('product-form', {
			pageTitle: 'Create Product',
			pageDescription: 'View and manage all listed products easily.',
			pageCss: 'product-form',
			pageJs: 'product-form',
			submitLabel: 'Create Product',
			categories: [{ slug: 't-shirts', name: 'T-Shirts' }],
		})

		// 		{{!--
		//   CREATE:

		// 	  EDIT: same view, add  product: { name, description, price, category, image }
		// 	  and mark the current category with  selected: true  inside categories.
		// The form posts multipart/form-data: fields name, category, price, description, images (file, multiple).
	}
}

module.exports = new ProductController()
