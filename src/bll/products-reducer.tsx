import { InferActionTypes, ThunkTypes } from "./store"
import { ParamsGetProductsType, ProductType } from "../dall/products-api"
import productsAPI from '../dall/products-api'

const initialState = {
	best: {
		items: [],
		totalCount: 0,
		numberCount: 0,
		loadingLikeProductsID: [],
		isLoading: false,
	} as ProductsSectionType,
	new: {
		items: [],
		totalCount: 0,
		numberCount: 0,
		loadingLikeProductsID: [],
		isLoading: false,
	} as ProductsSectionType,
	promo: {
		items: [],
		totalCount: 0,
		numberCount: 0,
		loadingLikeProductsID: [],
		isLoading: false,
	} as ProductsSectionType,
	rec: {
		items: [],
		totalCount: 0,
		numberCount: 0,
		loadingLikeProductsID: [],
		isLoading: false,
	} as ProductsSectionType,
}

const productsReducer = (state = initialState, action: ActionsTypes): StateType => {
	switch (action.type) {
		case 'online-store-5kvt/products-reducer/PRODUCTS_ADDED':
			return {
				...state,
				[action.section]: {
					...state[action.section],
					items: [
						...state[action.section]['items'],
						...action.products
					]
				}
			}
		case 'online-store-5kvt/products-reducer/SET_NUMBER_COUNT':
			return {
				...state,
				[action.section]: {
					...state[action.section],
					numberCount: action.numberCount
				}
			}
		case 'online-store-5kvt/products-reducer/SET_TOTAL_COUNT':
			return {
				...state,
				[action.section]: {
					...state[action.section],
					totalCount: action.totalCount
				}
			}
		case 'online-store-5kvt/products-reducer/ADD_LOADING_LIKE_PRODUCT_ID':
			switch (action.method) {
				case 'add':
					return {
						...state,
						[action.section]: {
							...state[action.section],
							loadingLikeProductsID: [...state[action.section].loadingLikeProductsID, action.id]
						}
					}
				case 'del':
					return {
						...state,
						[action.section]: {
							...state[action.section],
							loadingLikeProductsID: state[action.section].loadingLikeProductsID.filter(id => id != action.id)
						}
					}
				default:
					return state
			}
		case 'online-store-5kvt/products-reducer/SET_IS_LIKE_PRODUCT':
			return {
				...state,
				[action.section]: {
					...state[action.section],
					items: state[action.section].items.map(item => {
						if (item.id != action.id) {
							return item
						} else {
							return {
								...item,
								isLike: action.method == 'like' ? true : false
							}
						}
					})
				}
			}
		case 'online-store-5kvt/products-reducer/SET_PRODUCTS':
			return {
				...state,
				[action.section]: {
					...state[action.section],
					items: action.products
				}
			}
		case 'online-store-5kvt/products-reducer/SET_IS_LOADING':
			return {
				...state,
				[action.section]: {
					...state[action.section],
					isLoading: action.isLoading
				}
			}
		default:
			return state
	}
}

export const actions = {
	setIsLoading(section: SectionType, isLoading: boolean) {
		return {
			type: 'online-store-5kvt/products-reducer/SET_IS_LOADING',
			section,
			isLoading
		} as const
	},
	setProduct(section: SectionType, products: Array<ProductType>) {
		return {
			type: 'online-store-5kvt/products-reducer/SET_PRODUCTS',
			section,
			products,
		} as const
	},
	productsAdded(section: SectionType, products: Array<ProductType>) {
		return {
			type: 'online-store-5kvt/products-reducer/PRODUCTS_ADDED',
			section,
			products,
		} as const
	},
	setTotalCount(section: SectionType, totalCount: number) {
		return {
			type: 'online-store-5kvt/products-reducer/SET_TOTAL_COUNT',
			section,
			totalCount,
		} as const
	},
	setNumberCount(section: SectionType, numberCount: number) {
		return {
			type: 'online-store-5kvt/products-reducer/SET_NUMBER_COUNT',
			section,
			numberCount,
		} as const
	},
	setLoadingLikeProductID(section: SectionType, id: number, method: 'del' | 'add') {
		return {
			type: 'online-store-5kvt/products-reducer/ADD_LOADING_LIKE_PRODUCT_ID',
			section,
			id,
			method
		} as const
	},
	setIsLikeProduct(section: SectionType, id: number, method: 'like' | 'unlike') {
		return {
			type: 'online-store-5kvt/products-reducer/SET_IS_LIKE_PRODUCT',
			section,
			id,
			method
		} as const
	}
}

export const getProductsSection = (section: SectionType, params: { count: number, numberCount: number, recID?: number }): ThunkType => async (dispatch) => {
	let paramsEnd: ParamsGetProductsType = params
	switch (section) {
		case 'best':
			paramsEnd = {
				...paramsEnd,
				isBest: true
			}
			break
		case 'new':
			paramsEnd = {
				...paramsEnd,
				isNew: true
			}
			break
		case 'promo':
			paramsEnd = {
				...paramsEnd,
				isPromo: true
			}
			break
		case 'rec':
			paramsEnd = paramsEnd
	}
	try {
		dispatch(actions.setIsLoading(section, true))
		const data = await productsAPI.getProducts(paramsEnd)
		dispatch(actions.setIsLoading(section, false))
		if (data.resultCode == 0) {
			dispatch(actions.productsAdded(section, data.data.products))
			dispatch(actions.setNumberCount(section, params.numberCount))
			dispatch(actions.setTotalCount(section, data.data.totalCount))
		} else {
			alert(data.message)
		}
	} catch (error) {
		alert(error)
	}
}

export const setLikeProductSection = (section: SectionType, id: number, method: 'like' | 'unlike'): ThunkType => async (dispatch) => {
	try {
		dispatch(actions.setLoadingLikeProductID(section, id, 'add'))
		const data = await productsAPI.toggleIsLikeProduct(id, method == 'like' ? true : false)
		dispatch(actions.setLoadingLikeProductID(section, id, 'del'))
		dispatch(actions.setIsLikeProduct(section, id, method))
	} catch (error) {
		alert(error)
		dispatch(actions.setLoadingLikeProductID(section, id, 'del'))
	}
}

export default productsReducer

type ProductsSectionType = {
	items: Array<ProductType>
	totalCount: number
	numberCount: number
	loadingLikeProductsID: number[]
	isLoading: boolean
}

type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = ThunkTypes<ActionsTypes>
type StateType = typeof initialState

type SectionType = 'new' | 'promo' | 'best' | 'rec'