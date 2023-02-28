import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../bll/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from "redux"
import useScreens from '../../../hooks/useScreens'
import ProductsSlider from '../../common/ProductsSlider/ProductsSlider'
import { getProductsSection, setLikeProductSection } from '../../../bll/products-reducer'

type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>

const ProductsSection: React.FC<PropsType> = ({ title, name, recID }) => {
	const sectionProducts = useSelector((state: AppStateType) => state.products[name].items)

	const dispatch: AppDispatch = useDispatch()

	const screen = useScreens()
	const count = screen.lg ? 4 : screen.md ? 3 : 2

	useEffect(() => {
		let params = recID ? { count, numberCount: 1, recID } : { count, numberCount: 1 }
		dispatch(getProductsSection(name, params))
	}, [])

	const isLoading = useSelector((state: AppStateType) => state.products[name].isLoading)
	const loading = (count: number, numberCount: number) => {
		let params = recID ? { count, numberCount, recID } : { count, numberCount }
		if (!isLoading) {
			dispatch(getProductsSection(name, params))
		}
	}

	const totalCount = useSelector((state: AppStateType) => state.products[name].totalCount)
	const countNumber = useSelector((state: AppStateType) => state.products[name].numberCount)

	const loadingLikeProducts = useSelector((state: AppStateType) => state.products[name].loadingLikeProductsID)
	const setIsLikeProduct = (id: number, method: 'like' | 'unlike') => {
		dispatch(setLikeProductSection(name, id, method))
	}

	return (
		<ProductsSlider title={title} products={sectionProducts} loading={loading} totalCount={totalCount} countNumber={countNumber} loadingLikeProducts={loadingLikeProducts} setIsLikeProduct={setIsLikeProduct} />
	)
}

export default ProductsSection

type PropsType = {
	title: string
	name: 'promo' | 'new' | 'best' | 'rec'
	recID?: number
}