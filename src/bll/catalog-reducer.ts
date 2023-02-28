import { ProductType } from "../dall/products-api"
import { InferActionTypes, ThunkTypes } from "./store"
import productsAPI from './../dall/products-api'
import cleanObject from './../utils/cleanObject';

const initialState: StateType = {
	items: null,
	totalCount: null,
	count: null,
	numberCount: null,
	typeSorting: null,
	filters: {
		category: null,
		type: null,
		price: {
			min: null,
			max: null,
		},
		brand: null,
		rating: null,
		isNew: null,
		isPromo: null,
		isDelivery: null,
		isPickup: null,
		isOrder: null,
		isAvailable: null,
		search: null,
	} as FiltersType,
	isLoading: false,
	listLikeDisabledProducts: [],
}

const catalogReducer = (state = initialState, action: ActionTypes): StateType => {
	switch (action.type) {
		case 'online-store-5kvt/catalog-reducer/SET_PRODUCTS':
			return {
				...state,
				items: action.products
			}
		case 'online-store-5kvt/catalog-reducer/SET_COUNT':
			return {
				...state,
				count: action.count
			}
		case 'online-store-5kvt/catalog-reducer/SET_FILTERS':
			return {
				...state,
				filters: action.filters
			}
		case 'online-store-5kvt/catalog-reducer/SET_IS_LOADING':
			return {
				...state,
				isLoading: action.isLoading
			}
		case 'online-store-5kvt/catalog-reducer/SET_NUMBER_COUNT':
			return {
				...state,
				numberCount: action.numberCount
			}
		case 'online-store-5kvt/catalog-reducer/SET_TOTAL_COUNT':
			return {
				...state,
				totalCount: action.totalCount
			}
		case 'online-store-5kvt/catalog-reducer/SET_TYPE_SORTING':
			return {
				...state,
				typeSorting: action.typeSorting
			}
		case 'online-store-5kvt/catalog-reducer/SET_LIST_LIKE_DISABLED_PRODUCTS':
			return {
				...state,
				listLikeDisabledProducts: action.method == 'add' ? [...state.listLikeDisabledProducts, action.id] : state.listLikeDisabledProducts.filter(id => id != action.id)
			}
		case 'online-store-5kvt/catalog-reducer/LIKE_UNLIKE_PRODUCT':
			if (state.items) {
				return {
					...state,
					items: state.items.map(item => {
						if (item.id == action.id) {
							return {
								...item,
								isLike: action.method == 'like' ? true : false
							}
						} else {
							return item
						}
					})
				}
			} else {
				return state
			}
		default:
			return state
	}
}

//'online-store-5kvt/catalog-reducer/'
export const actions = {
	setProducts(products: ProductType[]) {
		return {
			type: 'online-store-5kvt/catalog-reducer/SET_PRODUCTS',
			products
		} as const
	},
	setTotalCount(totalCount: number) {
		return {
			type: 'online-store-5kvt/catalog-reducer/SET_TOTAL_COUNT',
			totalCount
		} as const
	},
	setCount(count: number) {
		return {
			type: 'online-store-5kvt/catalog-reducer/SET_COUNT',
			count
		} as const
	},
	setNumberCount(numberCount: number) {
		return {
			type: 'online-store-5kvt/catalog-reducer/SET_NUMBER_COUNT',
			numberCount
		} as const
	},
	setTypeSorting(typeSorting: TypeSortingType) {
		return {
			type: 'online-store-5kvt/catalog-reducer/SET_TYPE_SORTING',
			typeSorting
		} as const
	},
	setFilters(filters: FiltersType) {
		return {
			type: 'online-store-5kvt/catalog-reducer/SET_FILTERS',
			filters
		} as const
	},
	setIsLoading(isLoading: boolean) {
		return {
			type: 'online-store-5kvt/catalog-reducer/SET_IS_LOADING',
			isLoading
		} as const
	},
	setListLikeDisabledProducts(id: number, method: 'add' | 'delete') {
		return {
			type: 'online-store-5kvt/catalog-reducer/SET_LIST_LIKE_DISABLED_PRODUCTS',
			id,
			method
		} as const
	},
	likeUnlikeProduct(id: number, method: 'like' | 'unlike') {
		return {
			type: 'online-store-5kvt/catalog-reducer/LIKE_UNLIKE_PRODUCT',
			id,
			method
		} as const
	}
}

export const getProducts = (count: number, numberCount: number, typeSorting: TypeSortingType, filters: FiltersType): ThunkType => async (dispatch) => {
	try {
		dispatch(actions.setIsLoading(true))
		const data = await productsAPI.getProducts({ ...cleanObject(filters), count, numberCount: numberCount - 1, typeSorting })
		dispatch(actions.setIsLoading(false))
		if (data.resultCode == 0) {
			//dispatch(actions.setCount(count))
			//dispatch(actions.setFilters(filters))
			//dispatch(actions.setNumberCount(numberCount))
			//dispatch(actions.setTypeSorting(typeSorting))
			dispatch(actions.setProducts(data.data.products.filter((item, index) => index < count)))
			dispatch(actions.setTotalCount(data.data.totalCount))
		}
	} catch (error) {
		alert('Какая-то ошибка... Перезагрузите страницу')
	}
}

export const likeUnlikeProducts = (id: number, method: 'like' | 'unlike'): ThunkType => async (dispatch) => {
	try {
		dispatch(actions.setListLikeDisabledProducts(id, 'add'))
		const data = await productsAPI.toggleIsLikeProduct(id, method == 'like' ? true : false)
		dispatch(actions.setListLikeDisabledProducts(id, 'delete'))
		dispatch(actions.likeUnlikeProduct(id, method))
	} catch (error) {
		alert('Какая-то ошибка... Перезагрузите страницу')
	}
}

export default catalogReducer

export const nullFilters = {
	category: null,
	type: null,
	price: {
		min: null,
		max: null,
	},
	brand: null,
	rating: null,
	isNew: null,
	isPromo: null,
	isDelivery: null,
	isPickup: null,
	isOrder: null,
	isAvailable: null,
	search: null,
}

type StateType = {
	items: null | Array<ProductType>
	totalCount: null | number
	count: null | number
	numberCount: null | number
	typeSorting: null | TypeSortingType
	filters: FiltersType
	isLoading: boolean
	listLikeDisabledProducts: number[]
}
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = ThunkTypes<ActionTypes>

export type FiltersType = {
	category: string | null
	type: string | null
	price: {
		min: number | null
		max: number | null
	}
	brand: Array<string> | null
	rating: number | null
	isNew: boolean | null
	isPromo: boolean | null
	isDelivery: boolean | null
	isPickup: boolean | null
	isOrder: boolean | null
	isAvailable: boolean | null
	search: string | null
}
export type TypeSortingType = 'relevance' | 'ascendingprice' | 'descendingprice'