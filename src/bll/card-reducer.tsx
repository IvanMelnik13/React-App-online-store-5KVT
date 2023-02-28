import { InferActionTypes, ThunkTypes } from "./store"
import productsAPI, { CardProductType, CommentType } from "../dall/products-api"
import { AnyAction } from 'redux'
import { actions as productsActions } from "./products-reducer"

const initialState = {
	cardProduct: null as CardProductType | null,
	error: null as string | null,
	isLoading: false,
	comments: {
		items: [] as Array<CommentType>,
		totalCount: null as null | number,
		count: 1,
		numberCount: null as null | number,
		error: null as null | string,
	},
	ratingDisabled: false,
	likeDisabled: false,
	basketError: {
		count: null as number | null
	}
}

const cardReducer = (state = initialState, action: ActionsTypes): StateType => {
	switch (action.type) {
		case 'online-store/card-reducer/CARD_PRODUCT_ADDED':
			return {
				...state,
				cardProduct: action.cardProduct
			}
		case 'online-store/card-reducer/SET_COMMENTS':
			return {
				...state,
				comments: {
					...state.comments,
					items: action.comments
				}
			}
		case 'online-store/card-reducer/SET_COMMENTS_ERROR':
			return {
				...state,
				comments: {
					...state.comments,
					error: action.error
				}
			}
		case 'online-store/card-reducer/SET_COMMENTS_NUMBER_COUNT':
			return {
				...state,
				comments: {
					...state.comments,
					numberCount: action.numberCount
				}
			}
		case 'online-store/card-reducer/SET_COMMENTS_TOTAL_COUNT':
			return {
				...state,
				comments: {
					...state.comments,
					totalCount: action.totalCount
				}
			}
		case 'online-store/card-reducer/SET_ERROR':
			return {
				...state,
				comments: {
					...state.comments,
					error: action.error
				}
			}
		case 'online-store/card-reducer/SET_IS_LOADING':
			return {
				...state,
				isLoading: action.isLoading
			}
		case 'online-store/card-reducer/SET_RATING':
			if (state.cardProduct) {
				return {
					...state,
					cardProduct: {
						...state.cardProduct,
						stat: {
							...state.cardProduct.stat,
							rating: action.rating
						}
					}
				}
			} else {
				return state
			}
		case 'online-store/card-reducer/SET_RATING_DISABLED':
			return {
				...state,
				ratingDisabled: action.disabled
			}
		case 'online-store/card-reducer/SET_BASKET_COUNT':
			return {
				...state,
				cardProduct: {
					...state.cardProduct,
					basket: {
						...state.cardProduct?.basket,
						count: action.count
					}
				} as CardProductType
			}
		case 'online-store/card-reducer/SET_IS_LIKE':
			return {
				...state,
				cardProduct: {
					...state.cardProduct,
					isLike: action.isLike
				} as CardProductType
			}
		case 'online-store/card-reducer/SET_LIKE_DISABLED':
			return {
				...state,
				likeDisabled: action.disabled
			}
		case 'online-store/card-reducer/SET_BASKET_ERROR': {
			return {
				...state,
				basketError: {
					...state.basketError,
					count: action.count
				}
			}
		}
		default:
			return state
	}
}

export const actions = {
	cardProductAdded(cardProduct: CardProductType) {
		return {
			type: 'online-store/card-reducer/CARD_PRODUCT_ADDED',
			cardProduct
		} as const
	},
	setComments(comments: Array<CommentType>) {
		return {
			type: 'online-store/card-reducer/SET_COMMENTS',
			comments
		} as const
	},
	setCommentsTotalCount(totalCount: number) {
		return {
			type: 'online-store/card-reducer/SET_COMMENTS_TOTAL_COUNT',
			totalCount
		} as const
	},
	setCommentsNumberCount(numberCount: number) {
		return {
			type: 'online-store/card-reducer/SET_COMMENTS_NUMBER_COUNT',
			numberCount
		} as const
	},
	setError(error: string) {
		return {
			type: 'online-store/card-reducer/SET_ERROR',
			error
		} as const
	},
	setCommentsError(error: string) {
		return {
			type: 'online-store/card-reducer/SET_COMMENTS_ERROR',
			error
		} as const
	},
	setIsLoading(isLoading: boolean) {
		return {
			type: 'online-store/card-reducer/SET_IS_LOADING',
			isLoading
		} as const
	},
	setRating(rating: number) {
		return {
			type: 'online-store/card-reducer/SET_RATING',
			rating
		} as const
	},
	setRatingDisabled(disabled: boolean) {
		return {
			type: 'online-store/card-reducer/SET_RATING_DISABLED',
			disabled
		} as const
	},
	setBasketCount(count: number) {
		return {
			type: 'online-store/card-reducer/SET_BASKET_COUNT',
			count
		} as const
	},
	setIsLike(isLike: boolean) {
		return {
			type: 'online-store/card-reducer/SET_IS_LIKE',
			isLike
		} as const
	},
	setLikeDisabled(disabled: boolean) {
		return {
			type: 'online-store/card-reducer/SET_LIKE_DISABLED',
			disabled
		} as const
	},
	setBasketError(count: number) {
		return {
			type: 'online-store/card-reducer/SET_BASKET_ERROR',
			count
		} as const
	}
}

export const setBasketCount = (id: number, count: number): ThunkType => async (dispatch, getState) => {
	try {
		const beforeCount = getState().card.cardProduct?.basket.count
		const data = await productsAPI.setBasketCount(id, count)
		if (data.resultCode == 0) {
			dispatch(actions.setBasketCount(count))
		} else {
			dispatch(actions.setBasketCount(beforeCount || 0))
			dispatch(actions.setBasketError(beforeCount || 0))
		}
	} catch (error) {
		alert('Какая-то ошибка...')
	}
}

export const setIsLike = (id: number, isLike: boolean): ThunkType => async (dispatch) => {
	try {
		dispatch(actions.setLikeDisabled(true))
		const data = await productsAPI.toggleIsLikeProduct(id, isLike)
		dispatch(actions.setLikeDisabled(false))
		if (data.resultCode == 0) {
			dispatch(actions.setIsLike(isLike))
		}
	} catch (error) {
		alert('Какая-то ошибка...')
	}
}

export const getComments = (id: number, count: number, numberCount: number): ThunkType => async (dispatch, getState) => {
	try {
		const dataComments = await productsAPI.getComments(id, count, numberCount)
		if (dataComments.resultCode == 0) {
			dispatch(actions.setComments([...dataComments.data.comments, ...getState().card.comments.items]))
			dispatch(actions.setCommentsTotalCount(dataComments.data.totalCount))
			dispatch(actions.setCommentsNumberCount(numberCount))
		} else {
			dispatch(actions.setCommentsError(dataComments.message![0] || 'Some error'))
		}
	} catch (error) {
		alert('Какая-то ошибка. Перезагрузите страницу')
	}
}

export const getCardProduct = (id: number): ThunkTypes<AnyAction> => async (dispatch, getState) => {
	try {
		dispatch(actions.setIsLoading(true))
		const dataCard = await productsAPI.getCardProduct(id)
		if (dataCard.resultCode == 0) {
			dispatch(actions.cardProductAdded(dataCard.data))
		} else {
			dispatch(actions.setError(dataCard.message![0] || 'Some error'))
		}
		dispatch(actions.setComments([]))
		dispatch(productsActions.setProduct('rec', []))
		dispatch(actions.setIsLoading(false))

		dispatch(getComments(id, getState().card.comments.count, 1))
	} catch (error) {
		alert('Какая-то ошибка. Перезагрузите страницу')
	}
}

export const setRating = (id: number, rating: number): ThunkType => async (dispatch) => {
	try {
		dispatch(actions.setRatingDisabled(true))
		const data = await productsAPI.sendRating(id, rating)
		if (data.resultCode == 0) {
			dispatch(actions.setRating(rating))
		}
		dispatch(actions.setRatingDisabled(false))
	} catch (error) {
		alert('Какая-то ошибка. Перезагрузите страницу')
	}
}

export default cardReducer

type StateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = ThunkTypes<ActionsTypes>