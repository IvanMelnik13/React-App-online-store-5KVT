export const categories = [
	{
		name: 'Аккумуляторы',
		link: 'accumulator',
		subitems:
			Array.from({ length: 30 }, () => 0).map((item, index) => {
				return {
					name: 'Подкатегория ' + index.toString(),
					link: 'subcategory' + index.toString()
				}
			})
	},
	{
		name: 'Блоки контроля',
		link: 'controlblock',
		subitems: Array.from({ length: 30 }, () => 0).map((item, index) => {
			return {
				name: 'Подкатегория ' + index.toString(),
				link: 'subcategory' + index.toString()
			}
		})
	},
	{
		name: 'Генераторы',
		link: 'generator',
		subitems: Array.from({ length: 30 }, () => 0).map((item, index) => {
			return {
				name: 'Подкатегория ' + index.toString(),
				link: 'subcategory' + index.toString()
			}
		})
	},
	{
		name: 'Климатическая техника',
		link: 'climatictechnique',
		subitems: Array.from({ length: 30 }, () => 0).map((item, index) => {
			return {
				name: 'Подкатегория ' + index.toString(),
				link: 'subcategory' + index.toString()
			}
		})
	},
	{
		name: 'Отопление',
		link: 'heating',
		subitems: Array.from({ length: 30 }, () => 0).map((item, index) => {
			return {
				name: 'Подкатегория ' + index.toString(),
				link: 'subcategory' + index.toString()
			}
		})
	},
	{
		name: 'Перфораторы',
		link: 'perforator',
		subitems: Array.from({ length: 30 }, () => 0).map((item, index) => {
			return {
				name: 'Подкатегория ' + index.toString(),
				link: 'subcategory' + index.toString()
			}
		})
	},
	{
		name: 'Провода',
		link: 'wire',
		subitems: Array.from({ length: 30 }, () => 0).map((item, index) => {
			return {
				name: 'Подкатегория ' + index.toString(),
				link: 'subcategory' + index.toString()
			}
		})
	},
	{
		name: 'Люстры',
		link: 'chandelier',
		subitems: Array.from({ length: 30 }, () => 0).map((item, index) => {
			return {
				name: 'Подкатегория ' + index.toString(),
				link: 'subcategory' + index.toString()
			}
		})
	},
	{
		name: 'Перфораторы',
		link: 'perforator2',
		subitems: Array.from({ length: 30 }, () => 0).map((item, index) => {
			return {
				name: 'Подкатегория ' + index.toString(),
				link: 'subcategory' + index.toString()
			}
		})
	},
	{
		name: 'Провода',
		link: 'wire2',
		subitems: Array.from({ length: 30 }, () => 0).map((item, index) => {
			return {
				name: 'Подкатегория ' + index.toString(),
				link: 'subcategory' + index.toString()
			}
		})
	},
	{
		name: 'Люстры',
		link: 'chandelier2',
		subitems: Array.from({ length: 30 }, () => 0).map((item, index) => {
			return {
				name: 'Подкатегория ' + index.toString(),
				link: 'subcategory' + index.toString()
			}
		})
	},
]

export default categories