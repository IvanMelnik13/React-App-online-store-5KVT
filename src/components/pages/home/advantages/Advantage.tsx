import React from 'react'

const Advantage: React.FC<PropsType> = ({ advantage: { image, title, text } }) => {
	return (
		<div className='bg-lightgray h-full flex justify-center flex-col py-[24px] px-[65px] md:py-[30px] md:px-[20px] text-center items-center'>
			<div className='w-[72px] md:w-[80px] md:h-[80px] h-[72px] mb-[24px] p-[5px] rounded-[50%] flex justify-center items-center bg-orange bg-opacity-[0.15]'>
				<img className='max-w-full' src={image} alt="" />
			</div>
			<h4 className='mb-[16px] text-[18px] leading-[1.2] text-dark'>
				{title}
			</h4>
			<div className='text-[16px] leading-[1.2] text-graystrong'>
				{text}
			</div>
		</div>
	)
}

export default Advantage

type PropsType = {
	advantage: AdvantageType
}

export type AdvantageType = {
	image: string
	title: string
	text: string
}