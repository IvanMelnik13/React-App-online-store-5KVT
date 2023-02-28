import MockAdapter from 'axios-mock-adapter'
import { instance, ResponseDataType } from './api'
import { comments, products, categories } from './products'

const getProducts = (productsArr: Array<ProductType>, count: number) => {
	let productsNewArr = []
	productsNewArr = products.filter((_, index) => index < count)
	// for (let i = 0; i < count; i++) {
	// 	productsNewArr.push(products[Math.floor(Math.random() * productsArr.length)])
	// }
	return productsNewArr
}

var mock = new MockAdapter(instance, { delayResponse: 1000 })

mock.onGet('/products', { params: { count: 4, isNew: true, numberCount: 1 } }).reply(200, {
	resultCode: 0,
	message: null,
	data: {
		products: products.filter(item => item.isNew).filter((_, index) => index < 4),
		totalCount: 15
	}
})
mock.onGet('/products', { params: { count: 4, isBest: true, numberCount: 1 } }).reply(200, {
	resultCode: 0,
	message: null,
	data: {
		products: products.filter(item => item.isBest).filter((_, index) => index < 4),
		totalCount: 15
	}
})
mock.onGet('/products', { params: { count: 4, isPromo: true, numberCount: 1 } }).reply(200, {
	resultCode: 0,
	message: null,
	data: {
		products: products.filter(item => item.isPromo).filter((_, index) => index < 4),
		totalCount: 15
	}
})
mock.onGet("/products").reply(200, {
	resultCode: 0,
	message: null,
	data: {
		products: products.filter((item, index) => index < 30),
		totalCount: 130,
	}
})
mock.onGet("/products/:id/comments").reply(200, {
	resultCode: 0,
	message: null,
	data: {
		comments: comments.filter((_, index) => index < 1),
		totalCount: 5,
	}
})
mock.onGet('/product/:id').reply(200, {
	resultCode: 0,
	message: null,
	data: {
		id: 110012,
		category: 'battery',
		type: 'battery',
		name: 'battery 2000 supe ef  ew fw ef erg erg r g er weg ew r-puper',
		image: 'https://imgpng.ru/d/automotive_battery_PNG12101.png',
		isLike: true,
		isNew: true,
		isPromo: true,
		isBest: true,
		brand: 'super-company',
		basket: {
			count: 0,
			isAvailable: true
		},
		price: {
			price: 2441,
			newPrice: 1000,
		},
		stat: {
			rating: 4.8,
			commentsCount: 12,
		},
		model: 1129973,
		characteristics: {
			'Характеристика1': 'Значение',
			'Характеристика2': 'Значение',
			'Характеристика3': 'Значение',
			'Характеристика4': 'Значение',
			'Характеристика5': 'Значение',
			'Характеристика6': 'Значение',
			'Характеристика7': 'Значение',
			'Характеристика8': 'Значение',
			'Характеристика9': 'Значение',
			'Характеристика10': 'Значение',
			'Характеристика11': 'Значение',
		},
		deskription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	}
})
mock.onGet("/categories").reply(200, {
	resultCode: 0,
	message: null,
	data: {
		categories: categories,
	}
})
mock.onPut('/product/:id/like').reply(200, {
	resultCode: 0,
	message: null,
	data: {}
})
mock.onPut('/product/:id/rating').reply(200, {
	resultCode: 0,
	message: null,
	data: {}
})
mock.onPut('/product/:id/basket').reply(200, {
	resultCode: 0,
	message: null,
	data: {}
})

const productsAPI = {
	getProducts(params: ParamsGetProductsType | null) {
		return instance.get<ResponseDataType<{
			totalCount: number
			products: Array<ProductType>
		}>>('/products', { params: params }).then(response => response.data)
	},
	toggleIsLikeProduct(id: number, isLike: boolean) {
		return instance.put<ResponseDataType<{}>>('/product/:id/like', { isLike }).then(response => response.data)
	},
	getComments(id: number, count: number, numberCount: number) {
		return instance.get<ResponseDataType<{
			comments: CommentType[],
			totalCount: number
		}>>(`/products/:id/comments`, { params: { count, numberCount: numberCount - 1 } }).then(response => response.data)
	},
	getCardProduct(id: number) {
		return instance.get<ResponseDataType<
			CardProductType
		>>('/product/:id').then(response => response.data)
	},
	sendRating(id: number, rating: number) {
		return instance.put<ResponseDataType<{}>>('/product/:id/rating', { rating }).then(response => response.data)
	},
	setBasketCount(id: number, count: number) {
		return instance.put<ResponseDataType<{}>>('/product/:id/basket', { count }).then(response => response.data)
	}
}

export default productsAPI

export type ParamsGetProductsType = {
	category?: string
	type?: string
	price?: {
		min?: number
		max?: number
	}
	brand?: Array<string>
	rating?: number
	isBest?: boolean
	isNew?: boolean
	isPromo?: boolean
	isLike?: boolean
	isDelivery?: boolean
	isPickup?: boolean
	isOrded?: boolean
	count?: number
	numberCount?: number
	isAvailable?: boolean
	search?: string
	rec?: number
	typeSorting?: 'relevance' | 'ascendingprice' | 'descendingprice'
}

export type ProductType = {
	id: number
	category: string
	type: string
	name: string
	image: string
	isLike: boolean
	isNew: boolean
	isPromo: boolean
	isBest: boolean
	brand: string
	basket: {
		count: number
		isAvailable: boolean
	}
	price: {
		price: number
		newPrice?: number
	}
}

export type CardProductType = ProductType & {
	stat: {
		rating: number
		commentsCount: number
	}
	model: number
	basket: {
		count: number
		isAvailable: boolean
	}
	characteristics: { [key: string]: string }
	deskription: string
}

export type CommentType = {
	id: number
	author: {
		id: number
		name: string
		avatar: string
	}
	raiting: number
	text: string
}