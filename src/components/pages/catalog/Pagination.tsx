import React from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'
import { IconArrow } from '../../common/ProductsSlider/ProductsSlider'

const Pagination: React.FC<{
	totalCount: number
	numberCount: number
	count: number
	setNumberCount: (numberCount: number) => void
}> = ({ totalCount, numberCount, count, setNumberCount }) => {
	const maxNumberCount = Math.ceil(totalCount / count)

	const array1: number[] = []
	for (let i = 1; i <= maxNumberCount; i++) {
		array1.push(i)
	}
	const array2: number[] = []
	array1.forEach((item, index) => {
		if (item <= 2 || (item <= numberCount + 1 && item >= numberCount - 1) || item >= maxNumberCount - 1) {
			array2.push(item)
		}
	})
	const array: number[] = []
	array2.forEach((item, index) => {
		if (index > 0) {
			if (item - array2[index - 1] == 2) {
				array.push(item - 1)
				array.push(item)
			}
			if (item - array2[index - 1] > 2) {
				array.push(-1)
				array.push(item)
			}
			if (item - array2[index - 1] == 1) {
				array.push(item)
			}
		} else {
			return (
				array.push(item)
			)
		}
	})

	return (
		<div className='flex w-full justify-between lg:w-auto lg:gap-[32px]'>
			<button
				onClick={() => setNumberCount(numberCount - 1)}
				disabled={numberCount == 1}
				type='button'
				className='sliderBtn'>
				<IconArrow />
			</button>
			<div className='flex gap-[20px] text-graystrong items-end'>
				{
					array.map(item => {
						if (item == -1) {
							return (
								<div className='' key={uuid()}>...</div>
							)
						} else {
							return (
								<Button
									key={uuid()}
									number={item}
									active={item == numberCount}
									setNumberCount={(number) => setNumberCount(number)} />
							)
						}
					})
				}
			</div>
			<button
				onClick={() => setNumberCount(numberCount + 1)}
				disabled={numberCount == maxNumberCount}
				type='button'
				className='sliderBtn scale-[-1]'>
				<IconArrow />
			</button>
		</div>
	)
}

const Button: React.FC<{
	active: boolean
	number: number
	setNumberCount: (number: number) => void
}> = ({ number, active, setNumberCount }) => {
	return (
		<button
			onClick={() => setNumberCount(number)}
			className={cn({
				'text-blue': active
			})}>
			{number}
		</button>
	)
}

export default Pagination