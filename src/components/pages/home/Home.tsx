import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../bll/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from "redux"
import ProductsSection from './ProductsSection'
import Advantages from './advantages/Advantages'
import MainAdvertising from './mainAdvertising/MainAdvertising'
import AdvertistingBanner from './AdvertistingBanner/AdvertistingBanner'

type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>

const Home: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()

	return (
		<div className='[&>*:not(:last-child)]:mb-[56px] md:[&>*:not(:last-child)]:mb-[100px] pb-[56px] md:pb-[100px] pt-[20px]'>
			<div>
				<MainAdvertising />
			</div>

			<div>
				<ProductsSection name='best' title='Товары месяца' />
			</div>
			<div>
				<ProductsSection name='new' title='Новинки' />
			</div>

			<div>
				<AdvertistingBanner />
			</div>

			<div>
				<ProductsSection name='promo' title='Акции недели' />
			</div>

			<div>
				<Advantages />
			</div>
		</div>
	)
}

export default Home