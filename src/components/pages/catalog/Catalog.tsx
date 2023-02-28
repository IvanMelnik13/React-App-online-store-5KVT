import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiltersType, TypeSortingType, likeUnlikeProducts } from '../../../bll/catalog-reducer'
import { getProducts, actions } from './../../../bll/catalog-reducer'
import { ThunkDispatch } from 'redux-thunk';
import { AppStateType } from '../../../bll/store'
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux'
import Product, { ProductSkeleton } from '../../common/ProductsSlider/Product'
import BreadCrumbs from './../../common/BreadCrumbs'
import useScreens from './../../../hooks/useScreens'
import Select from './Select'
import { IoOptionsOutline } from 'react-icons/io5'
import CatalogFilters from './CatalogFilters'
import Pagination from './Pagination'

type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>

const Catalog = () => {
	const dispatch: AppDispatch = useDispatch()

	const screen = useScreens()

	const navigate = useNavigate()
	const { search } = useLocation()

	const filters = useSelector((state: AppStateType) => state.catalog.filters)
	const totalCount = useSelector((state: AppStateType) => state.catalog.totalCount)
	const count = useSelector((state: AppStateType) => state.catalog.count)
	const numberCount = useSelector((state: AppStateType) => state.catalog.numberCount)
	const products = useSelector((state: AppStateType) => state.catalog.items)
	const typeSorting = useSelector((state: AppStateType) => state.catalog.typeSorting)
	const isLoading = useSelector((state: AppStateType) => state.catalog.isLoading)
	const listLikeDisabledProducts = useSelector((state: AppStateType) => state.catalog.listLikeDisabledProducts)

	const countDefault = screen.md ? 9 : 8

	useEffect(() => {
		if (countDefault == 8) {
			dispatch(actions.setCount(8))
		}
	}, [countDefault])

	useEffect(() => {
		const parseBooleanString = (value: any) => {
			return value == 'true' ? true : value == 'false' ? false : null
		}

		const url = new URLSearchParams(search.slice(1))
		const minprice = url.get('minprice')
		const maxprice = url.get('maxprice')
		const filtersQuery: FiltersType = {
			category: url.get('category'),
			type: url.get('type'),
			price: {
				min: Number(minprice) || null,
				max: Number(maxprice) || null
			},
			brand: url.get('brand')?.split(',') || null,
			rating: Number(url.get('rating')) || null,
			isNew: parseBooleanString(url.get('new')),
			isPromo: parseBooleanString(url.get('promo')),
			isDelivery: parseBooleanString(url.get('delivery')),
			isPickup: parseBooleanString(url.get('pickup')),
			isOrder: parseBooleanString(url.get('order')),
			isAvailable: parseBooleanString(url.get('available')),
			search: url.get('search') || null,
		}

		const countQuery = url.get('count')
		const numberCountQuery = url.get('page')
		const typeSortingQuery = ['relevance', 'ascendingprice', 'descendingprice'].includes(url.get('sorting') || '') ? url.get('sorting') : null

		dispatch(actions.setFilters(filtersQuery))
		dispatch(actions.setCount(Number(countQuery) || countDefault))
		dispatch(actions.setNumberCount(Number(numberCountQuery) || 1))
		dispatch(actions.setTypeSorting(typeSortingQuery as TypeSortingType || 'relevance'))
	}, [])

	useEffect(() => {
		const query: Record<string, string> = {}
		if (numberCount) {
			query.page = numberCount.toString()
		}
		if (count) {
			query.count = count.toString()
		}
		if (typeSorting) {
			query.sorting = typeSorting
		}
		if (filters) {
			const filtersKeys = Object.keys(filters).filter(key => {
				if (filters[key as keyof FiltersType]) return true
				return false
			})
			filtersKeys.forEach(key => {
				let k = key.replace('is', '').toLocaleLowerCase()
				if (k != 'price') {
					if (filters[key as keyof typeof filters]) {
						query[k] = filters[key as keyof typeof filters]?.toString() || ''
					}
				}
				if (k == 'price') {
					if (filters.price?.min) {
						query.minprice = filters.price.min.toString()
					}
					if (filters.price?.max) {
						query.maxprice = filters.price.max.toString()
					}
				}
			})
		}
		const queryString = new URLSearchParams(query).toString()
		navigate({
			pathname: '/catalog',
			search: `?${queryString}`
		})
		if (filters)
			dispatch(getProducts(Number(count) || countDefault, Number(numberCount) || 1, typeSorting as TypeSortingType || 'relevance', filters))
	}, [filters, numberCount, typeSorting, count])

	const [isOpenFilters, setIsOpenFilters] = React.useState(false)

	if (count && numberCount && typeSorting)
		return (
			<div className='pt-[32px] pb-[56px]'>
				<BreadCrumbs path={[{ name: 'Главная', path: '/home' }]} end='Каталог товаров' />
				<div className='pt-[32px]'>
					<div className='mb-[32px] lg:mb-[56px] lg:flex lg:justify-between lg:items-center'>
						<h2 className='text-[36px] text-dark mb-[32px] lg:mb-[0]'>Каталог товаров</h2>
						<div className='flex justify-between'>
							<div className='flex gap-[30px] lg:gap-[50px]'>
								<div>
									<Select options={[{ lable: 'по актуальности', value: 'relevance' }, { lable: 'по возрастанию цены', value: 'ascendingprice' }, { lable: 'по убыванию цены', value: 'descendingprice' }]} name='Сортировать' activeValue={typeSorting || 'relevance'} handler={(value) => dispatch(actions.setTypeSorting(value as TypeSortingType))} />
								</div>
								{
									screen.md &&
									<div>
										<Select options={[{ lable: 'по 9', value: 9 }, { lable: 'по 8', value: 8 }, { lable: 'по 7', value: 7 }]} name='Сортировать' activeValue={count} handler={(value) => dispatch(actions.setCount(value as number))} />
									</div>
								}
							</div>
							{
								!screen.lg &&
								<div>
									<button onClick={() => setIsOpenFilters(o => !o)} className='w-[30px] h-[30px] bg-blue rounded-[3px] text-white text-[24px] flex items-center justify-center hover:bg-opacity-50'>
										<IoOptionsOutline />
									</button>
								</div>
							}
						</div>
					</div>
					<div className='lg:flex lg:gap-[30px]'>
						<div className='lg:basis-[263px]'>
							{
								((!screen.lg && isOpenFilters) || screen.lg) &&
								<CatalogFilters close={() => setIsOpenFilters(false)} />
							}
						</div>
						<div className='w-full'>
							<div className='grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-[15px] lg:gap-[30px] lg:mb-[50px] mb-[40px]'>
								{
									isLoading ?
										Array.from({ length: count }).map((item, index) => {
											return (
												<ProductSkeleton key={index} />
											)
										}) :
										products?.map((item, index) => {
											return (
												<Product
													key={index}
													product={item}
													likeDisabled={listLikeDisabledProducts.includes(item.id)}
													setIsLike={(method) => dispatch(likeUnlikeProducts(item.id, method))} />
											)
										})
								}
							</div>
							{
								totalCount &&
								<div className='flex justify-center'>
									<Pagination
										totalCount={totalCount || 1}
										numberCount={numberCount}
										count={count}
										setNumberCount={(numberCount) => {
											dispatch(actions.setNumberCount(numberCount))
										}} />
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		)
	else
		return (
			<div>
				Loading...
			</div>
		)
}

export default Catalog