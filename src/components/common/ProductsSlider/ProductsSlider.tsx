import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ProductType } from '../../../dall/products-api'
import { Swiper, SwiperSlide } from 'swiper/react'
import useScreens from './../../../hooks/useScreens'
import 'swiper/scss'
import { v1 as uuid } from "uuid"
import Product, { ProductSkeleton } from './Product'

type PropsType = {
	title: string
	products: Array<ProductType>
	loading: (count: number, numberCount: number) => void
	totalCount: number
	countNumber: number
	loadingLikeProducts: number[]
	setIsLikeProduct: (id: number, method: 'like' | 'unlike') => void
}

const ProductsSlider: React.FC<PropsType> = ({ title, products, loading, totalCount, countNumber, loadingLikeProducts, setIsLikeProduct }) => {
	const [slide, setSlide] = useState(1)
	const sliderRef = useRef<any>(null)

	const screen = useScreens()
	const sliderPerView = screen.lg ? 4 : screen.md ? 3 : 2

	const handlePrev = () => {
		if (!sliderRef.current) return
		sliderRef.current.swiper.slidePrev()
	}
	const handleNext = () => {
		if (!sliderRef.current) return
		sliderRef.current.swiper.slideNext()
	}

	useEffect(() => {
		if ((slide >= products.length - sliderPerView + 2) && products.length > 0) {
			loading(sliderPerView, Math.ceil(products.length / sliderPerView) + 1)
		}
	}, [slide, products, sliderPerView])

	return (
		<div>

			<div className='flex md:justify-between justify-center mb-[32px] md:mb-[70px]'>
				<h3 className='text-dark text-[36px] leading-[1.2]'>{title}</h3>
				<div className='md:flex hidden gap-[10px]'>
					<button
						disabled={slide == 1}
						className='sliderBtn'
						onClick={handlePrev}>
						<IconArrow />
					</button>
					<button
						disabled={slide >= totalCount - sliderPerView + 1}
						className='sliderBtn scale-[-1]'
						onClick={handleNext}>
						<IconArrow />
					</button>
				</div>
			</div>

			<Swiper
				onRealIndexChange={(swiper) => setSlide(swiper.realIndex + 1)}
				ref={sliderRef}
				spaceBetween={screen.md ? 30 : 15}
				slidesPerView={sliderPerView}
			>
				{
					products.map((item) => {
						const setIsLike = (method: 'like' | 'unlike') => {
							setIsLikeProduct(item.id, method)
						}
						return (
							<SwiperSlide className='!h-auto' key={uuid()}>
								<Product likeDisabled={loadingLikeProducts.includes(item.id)} setIsLike={setIsLike} product={item} />
							</SwiperSlide>
						)
					})
				}
				{
					(slide <= totalCount - sliderPerView + 1 || products.length == 0) &&
					Array.from({ length: products.length == 0 ? sliderPerView : totalCount - products.length > sliderPerView ? sliderPerView : totalCount - products.length }, () => 0).map(() => {
						return (
							<SwiperSlide className='!h-auto' key={uuid()}>
								<ProductSkeleton />
							</SwiperSlide>
						)
					})
				}
			</Swiper>

		</div >
	)
}

export default ProductsSlider

export const IconArrow = () => {
	return (
		<span style={{
			'width': 0,
			'height': 0,
			'borderTop': '6.25px solid transparent',
			'borderRight': '6.25px solid white',
			'borderBottom': '6.25px solid transparent',
		}}></span>
	)
}