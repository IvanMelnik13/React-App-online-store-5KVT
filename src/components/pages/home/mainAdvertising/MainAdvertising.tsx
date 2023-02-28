import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import useScreens from './../../../../hooks/useScreens'
import { Control, AdvertisingSnow, AdvertistingChainsaw } from './Advertising'

const links = [
	'/catalog?search=снегоуборщики',
	'/catalog?search=электро-бензо'
]

const MainAdvertising = () => {
	const screen = useScreens()
	const slidesPerView = 1

	const [slide, setSlide] = useState(0)

	const sliderRef = useRef<any>(null)
	const handlePrev = () => {
		if (!sliderRef.current) return
		sliderRef.current.swiper.slidePrev()
	}
	const handleNext = () => {
		if (!sliderRef.current) return
		sliderRef.current.swiper.slideNext()
	}

	return (
		<div>
			<Swiper
				spaceBetween={screen.md ? 30 : 15}
				slidesPerView={slidesPerView}
				onRealIndexChange={(swiper) => setSlide(swiper.realIndex)}
				autoHeight
				loop
				ref={sliderRef}
				className='rounded-[3px] overflow-hidden'
			>
				{/* {
					items.map((item, index) => {
						return (
							<SwiperSlide key={index}>
								<Advertising handleNext={handleNext} handlePrev={handlePrev} />
							</SwiperSlide>
						)
					})
				} */}
				<SwiperSlide>
					<AdvertisingSnow handleNext={handleNext} handlePrev={handlePrev} link={links[0]} />
				</SwiperSlide>
				<SwiperSlide>
					<AdvertistingChainsaw handleNext={handleNext} handlePrev={handlePrev} link={links[1]} />
				</SwiperSlide>
			</Swiper>
			{
				!screen.md &&
				<div className='mt-[16px]'>
					<Control handleNext={handleNext} handlePrev={handlePrev} link={links[slide]} />
				</div>
			}
		</div>
	)
}

export default MainAdvertising