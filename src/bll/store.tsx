import { createStore, combineReducers, applyMiddleware } from "redux"
import { compose, Action } from "redux"
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import cardReducer from "./card-reducer"
import productsReducer from "./products-reducer"
import catalogReducer from './catalog-reducer'

//Гавный редьюсер
let rootReducer = combineReducers({
	products: productsReducer,
	card: cardReducer,
	catalog: catalogReducer,
});

//@ts-ignore
const store = createStore(rootReducer, (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(applyMiddleware(thunkMiddleware)))

//Получение типов значений объекта
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never
//Получение типов, возвращаемых объектов функциями, находящимися в объекте. Получение типов actions, возвращаемых actionscreators.
export type InferActionTypes<T extends { [key: string]: (...args: any) => any }> = ReturnType<InferValueTypes<T>>

export type ThunkTypes<T extends Action<any>> = ThunkAction<void, AppStateType, unknown, T>

//Тип состояния state
export type AppStateType = ReturnType<typeof rootReducer>

export default store;