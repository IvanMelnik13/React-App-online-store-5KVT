import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import cn from 'classnames'

const StarRating: React.FC<{
	value: number,
	allowedEdit: boolean,
	handler?: (value: number) => void
}> = ({ value, allowedEdit, handler }) => {
	const [hoverRating, setHoverRating] = useState(0)

	const getActiveWight = () => {
		let rez = 0

		const getRez = (num: number) => {
			return num < 10 ? (125 * num / 10) + Math.floor(num / 2) * 25 : 250
		}

		if (hoverRating) {
			rez = getRez(hoverRating)
		} else {
			rez = getRez(value)
		}

		return rez
	}

	return (
		<div className='flex items-center'>
			<div onMouseOut={() => setHoverRating(0)} className='relative inline-block'>
				<div className='flex gap-[25px]'>
					{
						[1, 2, 3, 4, 5].map((_, index) => {
							return (
								<AiFillStar key={index} className='w-[25px] h-[25px] text-[25px] text-gray' />
							)
						})
					}
				</div>
				<div style={{
					'width': `${getActiveWight()}px`
				}}
					className={`absolute flex gap-[25px] top-0 left-0 overflow-hidden z-[2] h-full`}>
					{
						[1, 2, 3, 4, 5].map((_, index) => {
							return (
								<AiFillStar key={index} className='w-[25px] h-[25px] text-[25px] text-[#FFC700] basis-[25px] shrink-0' />
							)
						})
					}
				</div>
				{
					allowedEdit && handler &&
					<div className='absolute top-0 left-0 w-full z-[3] h-full'>
						{
							Array.from({ length: 18 }, () => 0).map((item, index) => {
								const getV = (n: number): number => {
									if (n == 0) return 1
									if (n % 4 > 1) return getV(n - 1)
									else return getV(n - 1) + 1
								}

								const currentValue = getV(index) || 0

								return (
									<button
										type='button'
										onMouseOver={() => setHoverRating(currentValue)}
										onClick={() => handler(currentValue)}
										className={cn('w-[12.5px] h-full')} key={index}></button>
								)
							})
						}
					</div>
				}
			</div>
		</div >
	)
}

export default StarRating