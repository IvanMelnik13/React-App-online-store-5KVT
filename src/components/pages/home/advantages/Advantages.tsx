import React, { useState, useRef } from 'react'
import items from './advantagesList'
import useScreens from '../../../../hooks/useScreens'
import Advantage from './Advantage'
import cn from 'classnames'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation'

const Advantages: React.FC = () => {
	const screen = useScreens()
	const slidesPerView = screen.xl ? 4 : screen.lg ? 3 : screen.md ? 2 : 1

	const sliderRef = useRef<any>(null)

	const [slide, setSlide] = useState(1)

	return (
		<div>
			<h3 className='text-dark text-[36px] leading-[1.2] mb-[36px] md:mb-[70px]'>Наши преимущества</h3>
			<div>
				<Swiper
					observer
					observeParents
					watchOverflow
					modules={[Pagination]}
					pagination={{
						el: '.homepage-advantages-dotts',
						clickable: true
					}}
					ref={sliderRef}
					spaceBetween={screen.md ? 30 : 15}
					slidesPerView={slidesPerView}
					onRealIndexChange={(swiper) => setSlide(swiper.realIndex)}
				>
					{

						items.map((item, index) => {
							return (
								<SwiperSlide className='!h-auto' key={index}>
									<Advantage advantage={item} />
								</SwiperSlide>
							)
						})
					}
				</Swiper>
			</div>
			<div className={cn('[&>*.swiper-pagination-bullet-active]:opacity-100 homepage-advantages-dotts flex justify-center mt-[16px] !gap-[8px] [&>*]:!bg-blue [&>*]:!w-[14px] [&>*]:!h-[14px] [&>*]:rounded-[50%] [&>*]:opacity-[0.3] [&>*:only-child]:hidden',
				{ 'hidden': items.length - slidesPerView <= 0 })}>
			</div >
		</div>
	)
}

export default Advantages