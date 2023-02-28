import React from 'react'
import { ProductType } from '../../../dall/products-api'
import { SlBasket } from 'react-icons/sl'
import { v1 as uuid } from 'uuid'
import cn from 'classnames'
import { VscLoading } from 'react-icons/vsc'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { NavLink } from 'react-router-dom';

type PropsType = {
	product: ProductType
	likeDisabled: boolean
	setIsLike: (method: 'like' | 'unlike') => void
}

const Product: React.FC<PropsType> = ({ product, likeDisabled, setIsLike }) => {
	const marks = []

	if (product.isNew) {
		marks.push('NEW')
	}
	if (product.isPromo) {
		marks.push('SELL')
	}

	const toggleLike = () => {
		const method = product.isLike ? 'unlike' : 'like'
		setIsLike(method)
	}

	return (
		<article className='overflow-hidden rounded-[3px] flex flex-col h-full relative'>
			<button disabled={likeDisabled} onClick={toggleLike} className='absolute disabled:opacity-50 hover:opacity-70 top-[15px] right-[15px] z-[3]'>
				{
					product.isLike ? <AiFillHeart className='w-[25px] h-[25px] text-blue' /> : <AiOutlineHeart className='w-[25px] h-[25px] text-blue' />
				}
			</button>
			<div className='bg-lightgray rounded-[3px] pb-[100%] relative mb-[8px] md:mb-[20px]'>
				<div className='p-[26px] md:p-[30px] absolute w-full h-full'>
					<div className='w-full h-full bg-contain bg-no-repeat bg-center'
						style={{
							'backgroundImage': `url('${product.image}')`,
						}}></div>
				</div>
			</div>
			<div className='md:mb-[32px] mb-[43px]'>
				<div className='text-graystrong text-[16px] md:text-[18px] leading-[1.2] mb-[4px] md:mb-[7px]'>
					{product.type}
				</div>
				<NavLink to={`/product/${product.id}`} className='hover:underline text-[16px] md:text-[18px] text-dark'>
					{product.name}
				</NavLink>
			</div>
			<div className='flex flex-wrap gap-x-[20px] md:justify-start justify-between md:mb-[20px] mb-[16px]'>
				<div className='text-dark text-[20px] leading-[1.2] font-medium md:text-[24px]'>
					{product.price.newPrice || product.price.price} ₽
				</div>
				{
					product.price.newPrice &&
					<div className='text-[20px] leading-[1.2] font-medium md:text-[24px] text-gray line-through'>
						{product.price.price} ₽
					</div>
				}
			</div>
			<button
				disabled={!product.basket.isAvailable}
				className='disabled:bg-opacity-60 flex mt-auto w-full bg-blue text-white justify-center p-[5px] gap-[10px] items-center min-h-[51px] rounded-[3px] hover:bg-opacity-70 md:min-h-[55px]'>
				<SlBasket />
				<span>
					В корзину
				</span>
			</button>

			{
				marks.length > 0 &&
				<div className='absolute top-[15px] left-[0px] flex flex-col gap-[10px]'>
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
		</article>
	)
}

export default React.memo(Product)

export const ProductSkeleton = () => {
	return (
		<div className='h-full rounded-[3px] overflow-hidden flex flex-col'>
			<div className='pb-[100%] bg-lightgray relative w-full rounded-[3px] mb-[8px] md:mb-[20px] flex'>
				<div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
					<VscLoading className='w-[60px] h-[60px] text-gray animate-spin' />
				</div>
			</div>
			<div className='md:mb-[32px] mb-[43px]'>
				<div className='bg-lightgray h-[16px] w-[75%] md:h-[18px] mb-[4px] md:mb-[7px]'>
				</div>
				<h4 className='h-[16px] md:h-[18px] w-[50%] bg-lightgray'>
				</h4>
			</div>
			<div className='md:mb-[20px] mb-[16px]'>
				<div className='bg-lightgray w-[60%] h-[20px] md:h-[24px]'>
				</div>
			</div>
			<div className='w-full bg-lightgray md:min-h-[55px] min-h-[51px] mt-auto'>
			</div>
		</div>
	)
}