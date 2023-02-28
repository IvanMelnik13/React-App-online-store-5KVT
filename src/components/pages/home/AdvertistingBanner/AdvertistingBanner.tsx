import React from 'react'
import image from '../../../../assets/images/advertistingBanner/image.png'
import { NavLink } from 'react-router-dom';

const AdvertistingBanner = () => {
	return (
		<div className='bg-blue flex flex-col items-center px-[50px] pb-[50px] md:flex-row md:py-[50px] md:gap-[50px] lg:px-[100px]'>
			<div className=''>
				<img className='max-w-[100%]' src={banner.image} alt="" />
			</div>
			<div className='text-left md:basis-[50%] flex-auto text-white text-[20px] leading-[1.2] flex flex-col gap-[45px] md:text-[24px]'>
				<div>
					{banner.name}
				</div>
				<span className='w-[100px] h-[1px] bg-white'></span>
				<NavLink to={banner.url} className='bg-white self-start hover:bg-opacity-50 text-blue inline-flex justify-center items-center rounded-[3px] min-h-[51px] p-[15px] md:w-full md:min-h-[55px] max-w-[262px]'>
					Перейти в каталог
				</NavLink>
			</div>
		</div>
	)
}

const banner = {
	image: image,
	name: 'Стабилизаторы и Источники бесперебойного питания энергии',
	url: '/catalog?search=stabilizer'
}

export default AdvertistingBanner