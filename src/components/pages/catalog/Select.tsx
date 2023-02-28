import React, { useRef, useState } from 'react'
import cn from 'classnames'

const Select: React.FC<{
	name: string
	options: Array<{
		lable: string
		value: string | number | boolean
	}>
	activeValue: string | number | boolean
	handler: (value: string | number | boolean) => void
}> = ({ name, options, activeValue, handler }) => {
	const [active, setActive] = useState(activeValue)
	const [isOpen, setIsOpen] = useState(false)

	const onClick = (value: string | number | boolean) => {
		setActive(value)
		handler(value)
		setIsOpen(false)
	}

	return (
		<div className='relative catalogHeaderSelect'>
			<button onClick={() => setIsOpen(o => !o)}>
				<span className='text-graystrong'>{name}: </span>
				<span className='text-blue'>{options.find(item => item.value == active)?.lable}</span>
			</button>
			{
				isOpen &&
				<SelectList active={active} options={options} handler={onClick} setIsOpen={setIsOpen} />
			}
		</div>
	)
}

const SelectList: React.FC<{
	options: Array<{
		lable: string
		value: string | number | boolean
	}>
	handler: (value: string | number | boolean) => void
	setIsOpen: (isOpen: boolean) => void
	active: string | number | boolean
}> = ({ options, handler, setIsOpen, active }) => {
	const listRef = useRef(null)

	React.useEffect(() => {
		const handler = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			if (!target.closest('.catalogHeaderSelect') && !target.closest('.catalogHeaderSelectList')) {
				setIsOpen(false)
			}
		}
		document.addEventListener('click', handler)
		return () => {
			document.removeEventListener('click', handler)
		}
	}, [])

	React.useEffect(() => {
		const keyCloseHandler = (e: KeyboardEvent) => {
			if (e.key == 'Escape') {
				setIsOpen(false)
			}
		}
		window.addEventListener('keydown', keyCloseHandler)
		return () => {
			window.removeEventListener('keydown', keyCloseHandler)
		}
	})

	return (
		<div ref={listRef} className='catalogHeaderSelectList z-10 absolute flex flex-col items-end bg-lightgray border-dark border-solid border-[1px] w-full px-[10px] py-[5px] rounded-[3px] translate-y-1'>
			{
				options.map((item, index) => {
					return (
						<button className={cn('text-dark hover:bg-dark py-[2px] px-[4px] rounded-[3px] hover:bg-opacity-10 w-full text-end', {
							'!bg-slate-300 !bg-opacity-100': item.value == active
						})} key={index} onClick={() => handler(item.value)}>
							{item.lable}
						</button>
					)
				})
			}
		</div>
	)
}

export default Select