import React, { useState } from 'react'
import { CardProductType } from '../../../dall/products-api'
import StarRating from './StarRating'
import { setBasketCount, setRating } from '../../../bll/card-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../bll/store'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import cn from 'classnames'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { SlBasket } from 'react-icons/sl'
import useScreens from './../../../hooks/useScreens'
import { setIsLike } from './../../../bll/card-reducer'
import { v4 as uuid } from 'uuid'

type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>

const ProductCardInfo: React.FC<{
	cardProduct: CardProductType
}> = ({ cardProduct }) => {
	const screen = useScreens()
	const dispatch: AppDispatch = useDispatch()

	let marks = []
	if (cardProduct.isPromo) {
		marks.push('SELL')
	}
	if (cardProduct.isNew) {
		marks.push('NEW')
	}

	const ratingDisabled = useSelector((state: AppStateType) => state.card.ratingDisabled)
	const ratingHandler = (value: number) => {
		dispatch(setRating(cardProduct.id, value))
	}

	const basketErrorCount = useSelector((state: AppStateType) => state.card.basketError.count)
	const [basketLocalCount, setBasketLocalCount] = useState(cardProduct.basket.count)
	React.useEffect(() => {
		if (basketErrorCount) {
			setBasketLocalCount(basketErrorCount)
		}
	}, [basketErrorCount])
	const basketHandler = (value: number) => {
		setBasketLocalCount(value)
		dispatch(setBasketCount(cardProduct.id, value))
	}

	const likeDisabled = useSelector((state: AppStateType) => state.card.likeDisabled)
	const likeHandler = (isLike: boolean) => {
		dispatch(setIsLike(cardProduct.id, isLike))
	}

	return (
		<div className='lg:flex gap-[30px] items-stretch'>
			{
				screen.lg &&
				<div className='basis-[calc(50%-15px)] self-center'>
					<div className='relative'>
						<Image img={cardProduct.image} />
						{
							marks.length > 0 &&
							<div className='absolute top-[15px] left-[0px] flex flex-col gap-[10px] z-20'>
								{

									marks.map((mark, index) => {
										return (
											<div key={uuid()} className={cn('left-[0px] text-white text-[14px] leading-[1.2] min-h-[22px] min-w-[50px] flex justify-center items-center rounded-r-[3px] bg-orange', { 'bg-red': mark == 'SELL' })}>
												{mark}
											</div>
										)
									})
								}
							</div>
						}
					</div>
				</div>
			}
			<div className='basis-[calc(50%-15px)] lg:bg-lightgray lg:p-[30px]'>
				<div className='border-b-[1px] border-b-gray pb-[16px] lg:pb-[30px] lg:flex justify-between gap-[10px]'>
					<Name name={cardProduct.name} type={cardProduct.type} />
					{
						screen.lg &&
						<div className='shrink-0 pt-[5px]'>
							<LikeButton isLike={cardProduct.isLike} likeHandler={likeHandler} disabled={likeDisabled} />
						</div>
					}
				</div>
				<div className='border-b-[1px] border-b-gray py-[16px] lg:py-[30px]'>
					<Stat value={cardProduct.stat.rating} disabled={ratingDisabled} ratingHandler={ratingHandler} commentsCount={cardProduct.stat.commentsCount} />
				</div>
				<div className='py-[16px] lg:border-b-gray lg:border-b-[1px] lg:py-[30px]'>
					<ArticleModel art={cardProduct.id} model={cardProduct.model} />
				</div>
				{
					!screen.lg &&
					<div className='relative'>
						<Image img={cardProduct.image} />
						{
							!cardProduct.basket.isAvailable &&
							<div className='absolute bottom-[10px] left-0'>
								<NotAvailable />
							</div>
						}
						{
							marks.length > 0 &&
							<div className='absolute top-[15px] left-[0px] flex flex-col gap-[10px] z-20'>
								{

									marks.map((mark, index) => {
										return (
											<div key={uuid()} className={cn('left-[0px] text-white text-[14px] leading-[1.2] min-h-[22px] min-w-[50px] flex justify-center items-center rounded-r-[3px] bg-orange', { 'bg-red': mark == 'SELL' })}>
												{mark}
											</div>
										)
									})
								}
							</div>
						}
					</div>
				}
				<div className='py-[16px] ;g:py-[30px] flex justify-between gap-[24px] items-center lg:border-b-gray lg:border-b-[1px]'>
					<Price price={cardProduct.price.price} newPrice={cardProduct.price.newPrice || null} />
					<BasketCounter count={basketLocalCount} basketHandler={basketHandler} disabled={!cardProduct.basket.isAvailable} />
				</div>
				<div className='flex justify-between gap-[24px] pt-[16px] lg:pt-[30px] items-center'>
					<BasketButton count={basketLocalCount} basketHandler={basketHandler} disabled={!cardProduct.basket.isAvailable} />
					{
						!screen.lg &&
						<LikeButton isLike={cardProduct.isLike} likeHandler={likeHandler} disabled={likeDisabled} />
					}
					{
						screen.lg && !cardProduct.basket.isAvailable &&
						<NotAvailable />
					}
				</div>
			</div>
		</div >
	)
}

const BasketCounter: React.FC<{ count: number, basketHandler: (count: number) => void, disabled: boolean }> = ({ count, basketHandler, disabled }) => {
	return (
		<div className='p-[13px] min-h-[45px] inline-flex gap-[26px] border-gray border-[1px] text-dark items-center'>
			<button className='w-[19px] h-[19px] text-[19px] flex items-center justify-center' disabled={count == 0} onClick={() => basketHandler(count - 1)}>-</button>
			<div className='text-blue'>
				{count}
			</div>
			<button className='w-[19px] h-[19px] text-[19px] flex items-center justify-center' disabled={disabled} onClick={() => basketHandler(count + 1)}>+</button>
		</div>
	)
}

const Image: React.FC<{ img: string }> = ({ img }) => {
	return (
		<div className='relative pb-[100%]'>
			<img className='absolute top-0 left-0 w-full h-full object-contain' src={img} alt="" />
		</div>
	)
}

const Name: React.FC<{ name: string, type: string }> = ({ name, type }) => {
	return (
		<div className='text-[24px] text-dark'>
			<span className=''>
				{type}{' '}
			</span>
			<span className='text-graystrong'>
				{name}
			</span>
		</div>
	)
}

const Stat: React.FC<{ value: number, disabled: boolean, ratingHandler: (value: number) => void, commentsCount: number }> = ({ value, disabled, ratingHandler, commentsCount }) => {
	return (
		<div className='flex justify-between items-center'>
			<div className={cn({ 'opacity-50': disabled })}>
				<StarRating value={value} allowedEdit={!disabled} handler={ratingHandler} />
			</div>
			<div className='text-graystrong'>
				Отзывы ({commentsCount})
			</div>
		</div>
	)
}

const ArticleModel: React.FC<{ art: number, model: number }> = ({ art, model }) => {
	return (
		<div className='flex gap-[30px] text-dark'>
			<div>
				<span className='text-graystrong'>Артикул: </span>
				<span>
					{art}
				</span>
			</div>
			<div>
				<span className='text-graystrong'>Модель: </span>
				<span>
					{model}
				</span>
			</div>
		</div>
	)
}

const NotAvailable = () => {
	return (
		<div className='text-red'>Нет в наличии</div>
	)
}

const Price: React.FC<{ price: number, newPrice: number | null }> = ({ price, newPrice }) => {
	return (
		<div className='flex gap-[24px] text-[24px]'>
			<div className='text-dark'>
				{newPrice ? newPrice : price} ₽
			</div>
			{
				newPrice &&
				<div className='text-graystrong line-through'>
					{price}
				</div>
			}
		</div>
	)
}

const BasketButton: React.FC<{ basketHandler: (count: number) => void, disabled: boolean, count: number }> = ({ basketHandler, disabled, count }) => {
	return (
		<button className='flex lg:max-w-[263px] lg:min-h-[55px] items-center justify-center min-h-[51px] hover:bg-opacity-70 disabled:bg-opacity-50 flex-auto bg-blue py-[5px] px-[16px] text-white rounded-[3px] gap-[10px]' disabled={disabled} onClick={() => basketHandler(count + 1)}>
			<SlBasket />
			<span>
				В корзину
			</span>
		</button>
	)
}

const LikeButton: React.FC<{ isLike: boolean, disabled: boolean, likeHandler: (isLike: boolean) => void }> = ({ isLike, disabled, likeHandler }) => {
	const screen = useScreens()

	return (
		<button className='h-[51px] w-[51px] lg:h-auto lg:w-auto bg-blue lg:bg-transparent hover:bg-opacity-70 disabled:bg-opacity-50 rounded-[3px] text-white lg:text-blue flex items-center justify-center'
			disabled={disabled} onClick={() => likeHandler(!isLike)}>
			{
				!isLike &&
				< AiOutlineHeart className='w-[25px] h-[25px]' />
			}
			{
				isLike &&
				<AiFillHeart className='w-[25px] h-[25px]' />
			}
		</button>
	)
}

export default ProductCardInfo