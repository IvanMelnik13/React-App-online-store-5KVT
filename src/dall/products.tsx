import { CommentType, ProductType } from "./products-api"

export const products: Array<ProductType> = [{
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
	}
}]

for (let i = 1; i <= 100; i++) {
	products.push({
		id: i,
		category: 'battery',
		type: 'battery',
		name: 'battery 2000 super-puper',
		image: 'https://imgpng.ru/d/automotive_battery_PNG12101.png',
		isLike: false,
		isNew: false,
		isPromo: false,
		isBest: false,
		brand: 'super-company',
		basket: {
			count: 0,
			isAvailable: true
		},
		price: {
			price: 2441,
		}
	})
}
for (let i = 101; i <= 110; i++) {
	products.push({
		id: i,
		category: 'battery',
		type: 'battery',
		name: 'battery 2000 super-puper',
		image: 'https://imgpng.ru/d/automotive_battery_PNG12101.png',
		isLike: false,
		isNew: true,
		isPromo: false,
		isBest: false,
		brand: 'super-company',
		basket: {
			count: 0,
			isAvailable: true
		},
		price: {
			price: 2441,
		}
	})
}
for (let i = 111; i <= 120; i++) {
	products.push({
		id: i,
		category: 'battery',
		type: 'battery',
		name: 'battery 2000 super-puper',
		image: 'https://imgpng.ru/d/automotive_battery_PNG12101.png',
		isLike: false,
		isNew: false,
		isPromo: true,
		isBest: false,
		brand: 'super-company',
		basket: {
			count: 0,
			isAvailable: true
		},
		price: {
			price: 2441,
			newPrice: 1000,
		}
	})
}
for (let i = 121; i <= 130; i++) {
	products.push({
		id: i,
		category: 'battery',
		type: 'battery',
		name: 'Battery 2000 super-puper',
		image: 'https://imgpng.ru/d/automotive_battery_PNG12101.png',
		isLike: false,
		isNew: false,
		isPromo: false,
		isBest: true,
		brand: 'super-company',
		basket: {
			count: 0,
			isAvailable: true
		},
		price: {
			price: 2441,
		}
	})
}

export const comments: Array<CommentType> = []

for (let i = 1; i <= 10; i++) {
	comments.push({
		id: i,
		author: {
			id: i,
			name: 'Commentator',
			avatar: 'https://vraki.net/sites/default/files/mood/89129a91-2f67-4c1b-9de9-ed18465df732.jpeg',
		},
		raiting: i,
		text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
	})
}

export const categories: Array<string> = ['Accumulators', 'Control blocks', 'Generators', 'Air conditioning equipment', 'Heating', 'Perforators', 'Wires', 'Chandeliers']