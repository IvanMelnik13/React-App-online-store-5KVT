import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import ProductsSection from '../home/ProductsSection'
import { ThunkDispatch } from 'redux-thunk'
import { AppStateType } from '../../../bll/store'
import { AnyAction } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { getCardProduct } from '../../../bll/card-reducer'
import ProductCardInfo from './ProductCardInfo'
import { v4 as uuid } from 'uuid'
import Comments from './Comments'
import BreadCrumbs from '../../common/BreadCrumbs'

type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>

const ProductCard = () => {
	const { id } = useParams()

	const dispatch: AppDispatch = useDispatch()

	const isLoading = useSelector((state: AppStateType) => state.card.isLoading)
	const cardProduct = useSelector((state: AppStateType) => state.card.cardProduct)
	const error = useSelector((state: AppStateType) => state.card.error)

	useEffect(() => {
		dispatch(getCardProduct(Number(id)))
	}, [id])

	return (
		<div className='pt-[32px] lg:pt-[20px]'>
			<div>
				<BreadCrumbs path={[{ name: 'Главная', path: '/home' }, { name: 'Каталог товаров', path: '/catalog' }]} end='Карточка товара' />
			</div>
			<div className='pt-[32px] pb-[56px] lg:pb-[100px] lg:pt-[50px]'>
				{
					isLoading && <div>Loading...</div>
				}

				{
					!isLoading && !error && (cardProduct != null) &&
					<>
						<div className='mb-[64px] lg:mb-[50px]'>
							<ProductCardInfo cardProduct={cardProduct} />
						</div>

						<div className='mb-[16px] lg:mb-[30px]'>
							<BlockComponent title='Характеристики'>
								<ul className='flex lg:gap-x-[30px] lg:gap-y-[20px] gap-y-[16px] flex-wrap'>
									{
										Object.keys(cardProduct.characteristics).map(item => {
											return (
												<li key={uuid()} className='flex basis-[100%] lg:basis-[calc(50%-15px)] justify-between lg:text-[18px] leading-[1.2] mb-[16px]'>
													<span className='text-graystrong'>{item} </span>
													<span className='text-dark'>
														{
															cardProduct.characteristics[item]
														}
													</span>
												</li>
											)
										})
									}
								</ul>
							</BlockComponent>
						</div>

						<div className='flex gap-[16px] flex-wrap mb-[56px] lg:mb-[50px]'>
							<div className='basis-[100%] lg:basis-[calc(50%-15px)]'>
								<BlockComponent title='Описание'>
									<div className='text-graystrong lg:text-[18px]'>
										{
											cardProduct.deskription
										}
									</div>
								</BlockComponent>
							</div>
							<div className='basis-[100%] min-w-0 lg:basis-[calc(50%-15px)] bg-lightgray rounded-[3px] overflow-hidden'>
								<Comments id={cardProduct.id} />
							</div>
						</div>

						<div>
							<ProductsSection name='rec' title='С этим товаром покупают' recID={Number(id)} />
						</div>
					</>
				}
			</div>
		</div>
	)
}

const BlockComponent: React.FC<{
	children?: JSX.Element
	title: string
}> = ({ children, title }) => {
	return (
		<div className='bg-lightgray py-[24px] px-[16px] lg:p-[30px] rounded-[3px] overflow-hidden'>
			<h4 className='text-dark text-[24px] pb-[24px] border-b-[1px] border-b-gray'>{title}</h4>
			<div className='pt-[24px]'>
				{children}
			</div>
		</div>
	)
}

export default ProductCard