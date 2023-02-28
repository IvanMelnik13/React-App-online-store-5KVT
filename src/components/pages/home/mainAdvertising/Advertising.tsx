import React from 'react'
import { NavLink } from 'react-router-dom'
import { IconArrow } from '../../../common/ProductsSlider/ProductsSlider'
import useScreens from './../../../../hooks/useScreens'

import bg01 from '../../../../assets/images/mainAdvantages/bg01.png'
import img01 from '../../../../assets/images/mainAdvantages/img01.png'
import bg02 from '../../../../assets/images/mainAdvantages/bg02.png'
import img02 from '../../../../assets/images/mainAdvantages/img02.png'

export const AdvertisingSnow: React.FC<PropsType> = ({ handleNext, handlePrev, link }) => {
	const screen = useScreens()

	return (
		<div
			style={{ 'backgroundImage': `url(${bg01})` }}
			className='bg-cover md:flex'>
			<div className='basis-[50%] lg:px-[100px] lg:py-[75px] md:px-[50px] md:py-[30px] p-[30px]'>
				<div className='lg:max-w-[340px]'>
					<h4 className='text-dark md:text-start text-[48px] text-center font-bold leading-[1.2] mb-[24px] lg:text-[64px] md:mb-[20px]'>
						Сильнее Снегопада
					</h4>
					<div className='text-graystrong text-[18px] text-center leading-[1.2] md:text-start'>
						Большой выбор снегоуборочных машин. Качественные устройства для любого бюджета
					</div>
					{
						screen.md &&
						<div className='mt-[51px]'>
							<Control handleNext={handleNext} handlePrev={handlePrev} link={link} />
						</div>
					}
				</div>
			</div>
			<div className='basis-[50%]'>
				<div className='flex justify-center items-center h-full'>
					<div className='relative'>
						<img className='max-w-full' src={img01} alt="" />
						<div className='text-white py-[8px] px-[16px] rounded-[3px] bg-orange inline-block absolute top-[10%] right-[7%]'>
							ОТ 10800 ₽
						</div>
						<div className='text-white py-[8px] px-[16px] rounded-[3px] bg-blue inline-block absolute bottom-[20%] left-[4%]'>
							СНЕГОУБОРЩИКИ
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export const AdvertistingChainsaw: React.FC<PropsType> = ({ handleNext, handlePrev, link }) => {
	const screen = useScreens()

	return (
		<div
			style={{ 'backgroundImage': `url(${bg02})` }}
			className='bg-cover md:flex'>
			<div className='basis-[50%] lg:px-[100px] lg:py-[75px] md:px-[50px] md:py-[30px] p-[30px]'>
				<div className='lg:max-w-[340px]'>
					<h4 className='text-white md:text-start text-[48px] text-center font-bold leading-[1.2] mb-[24px] lg:text-[64px] md:mb-[20px]'>
						Электро-Бензо инструмент
					</h4>
					<div className='text-graystrong text-[36px] text-center leading-[1.2] md:text-start'>
						большой выбор и хорошие цены
					</div>
					{
						screen.md &&
						<div className='mt-[51px]'>
							<Control handleNext={handleNext} handlePrev={handlePrev} link={link} />
						</div>
					}
				</div>
			</div>
			<div className='basis-[50%]'>
				<div className='flex justify-end items-end h-full'>
					<div className='relative'>
						<img className='max-w-full' src={img02} alt="" />
					</div>
				</div>
			</div>
		</div>
	)
}

export const Control: React.FC<{ handlePrev: () => void, handleNext: () => void, link: string }> = ({ handleNext, handlePrev, link }) => {
	return (
		<div className='flex gap-[16px] items-stretch md:gap-[20px]'>
			<NavLink className='min-h-full md:max-w-[185px] rounded-[3px] text-[16px] leading-[1.2] font-medium flex-auto p-[5px] text-white hover:bg-opacity-70 flex justify-center items-center bg-blue' to={link}>Подробнее</NavLink>
			<div className='flex gap-[16px] md:gap-[10px]'>
				<button
					onClick={handlePrev}
					className='sliderBtn lg:w-[55px] lg:h-[55px] w-[51px] h-[51px]'>
					<IconArrow />
				</button>
				<button
					onClick={handleNext}
					className='sliderBtn scale-[-1] lg:h-[55px] lg:w-[55px] w-[51px] h-[51px]'>
					<IconArrow />
				</button>
			</div>
		</div>
	)
}

type PropsType = {
	link: string
	handlePrev: () => void
	handleNext: () => void
}