import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdArrowRight } from 'react-icons/md'
import { v4 as uuid } from 'uuid'

const BreadCrumbs: React.FC<{
	path: Array<{
		name: string
		path: string
	}>
	end: string
}> = ({ path, end }) => {
	return (
		<div className='flex items-center'>
			{
				path.map((item, index) => {
					return (
						<div key={uuid()} className='flex items-center text-graystrong'>
							<NavLink to={item.path}>
								{item.name}
							</NavLink>
							<MdArrowRight />
						</div>
					)
				})
			}
			<span className='text-dark'>
				{end}
			</span>
		</div>
	)
}

export default BreadCrumbs