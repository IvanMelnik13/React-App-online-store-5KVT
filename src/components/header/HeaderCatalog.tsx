import React, { useEffect, useState } from 'react'
import ScrollLock from 'react-scrolllock'
import logo from '../../assets/images/lightLogo.svg'
import categories from './categories'
import { v4 as uuid } from 'uuid'
import { IconArrow } from '../common/ProductsSlider/ProductsSlider'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import useScreens from './../../hooks/useScreens'
import { useDispatch } from 'react-redux'
import { AppStateType } from '../../bll/store'
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { actions, nullFilters } from '../../bll/catalog-reducer'

type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>

const HeaderCatalog: React.FC<{ close: () => void }> = ({ close }) => {
	const [activeCategory, setActiveCategory] = useState('')
	const dispatch: AppDispatch = useDispatch()

	const screen = useScreens()

	useEffect(() => {
		const keyCloseHandler = (e: KeyboardEvent) => {
			if (e.key == 'Escape') {
				if (activeCategory.length > 0) {
					setActiveCategory('')
				} else {
					close()
				}
			}
		}
		window.addEventListener('keydown', keyCloseHandler)
		return () => {
			window.removeEventListener('keydown', keyCloseHandler)
		}
	}, [close, activeCategory])

	return (
		<ScrollLock>
			{
				screen.lg ?
					<div>
						<div onClick={() => close()} className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-30'></div>
						<div className='absolute top-0 left-0 bg-blue z-[45] max-w-full rounded-[3px] flex overflow-hidden items-stretch'>
							<div className='pt-[55px] pb-[16px] block pr-[15px]'>
								<div className='overflow-auto max-h-[calc(100vh-250px)] pr-[15px] [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar]:bg-dark [&::-webkit-scrollbar]:bg-opacity-30 [&::-webkit-scrollbar]:rounded-[5px] [&::-webkit-scrollbar-thumb]:bg-dark [&::-webkit-scrollbar-thumb]:rounded-[5px]'>
									{
										categories.map(item => {
											return (
												<button className={cn('[&:first-child]:border-t-white [&:first-child]:border-t-[1px] w-full text-left min-h-[49px] flex items-center text-white [&:first-child]:border-opacity-30 border-opacity-30 border-b-white border-b-[1px] px-[15px] hover:bg-white hover:bg-opacity-30 gap-[20px]', { 'bg-white bg-opacity-30': item.link == activeCategory })} key={uuid()} onClick={() => setActiveCategory(item.link)}>
													<span>
														{item.name}
													</span>
													<div className='flex items-center justify-center ml-auto scale-[-1] w-[19px] h-[19px]'>
														<IconArrow />
													</div>
												</button>
											)
										})
									}
								</div>
							</div>
							{
								activeCategory &&
								<>
									<div className='min-h-full pt-[55px] pb-[15px]'>
										<div className='min-h-full bg-opacity-30 bg-white w-[1px]'></div>
									</div>
									<div className='mx-[15px] pr-[15px] max-h-[calc(100vh-250px)] mt-[55px] mb-[15px] overflow-y-auto h-full [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar]:bg-dark [&::-webkit-scrollbar]:bg-opacity-30 [&::-webkit-scrollbar]:rounded-[5px] [&::-webkit-scrollbar-thumb]:bg-dark min-w-[300px] [&::-webkit-scrollbar-thumb]:rounded-[5px]'>
										{
											categories.filter(item => item.link == activeCategory).filter((_, index) => index < 1).map(item => {
												return (
													<div key={uuid()} className='inline-flex flex-col gap-[10px]'>
														{
															item.subitems.map(subitem => {
																return (
																	<NavLink
																		className='text-white hover:underline'
																		key={uuid()}
																		onClick={() => {
																			dispatch(actions.setFilters({ ...nullFilters, category: item.link, type: subitem.link }))
																			close()
																		}}
																		to={`/catalog?category=${item.link}&type=${subitem.link}`}>
																		{subitem.name}
																	</NavLink>
																)
															})
														}
													</div>
												)
											})
										}
									</div>
								</>
							}
						</div>
					</div>
					:
					<div className={cn('fixed top-0 left-0 z-30 bg-blue w-full h-full pt-[102px] pb-[56px] overflow-auto', { 'overflow-hidden': activeCategory.length > 0 })}>
						<div className='container'>
							<div className='mb-[16px] z-[46] fixed top-[56px]'>
								<img src={logo} alt="" />
							</div>
							<div className=''>
								{
									categories.map(item => {
										return (
											<button key={uuid()} className='[&:first-child]:border-t-white [&:first-child]:border-t-[1px] w-full text-left min-h-[49px] flex items-center text-white [&:first-child]:border-opacity-30 border-opacity-30 border-b-white border-b-[1px]'
												onClick={() => setActiveCategory(item.link)}>
												<span>
													{item.name}
												</span>
												<div className='flex items-center justify-center ml-auto scale-[-1] w-[20px] h-[20px]'>
													<IconArrow />
												</div>
											</button>
										)
									})
								}
							</div>
							{
								activeCategory &&
								<div className='fixed top-0 left-0 w-full h-full overflow-auto bg-blue z-[45] pt-[102px] px-[16px] pb-[56px]'>
									<button className='flex relative justify-center py-[5px] px-[16px] items-center w-full min-h-[50px] bg-white bg-opacity-30 text-white' onClick={() => setActiveCategory('')}>
										<div className='flex w-[20px] h-[20px] items-center justify-center absolute top-[calc(50%-10px)] left-[16px] rounded-[3px]'>
											<IconArrow />
										</div>
										<span>
											Назад
										</span>
									</button>
									{
										categories.filter(item => item.link == activeCategory).filter((_, index) => index < 1).map(item => {
											return (
												<div key={uuid()} className=''>
													{
														item.subitems.map(subitem => {
															return (
																<NavLink
																	key={uuid()}
																	onClick={() => {
																		dispatch(actions.setFilters({ ...nullFilters, category: item.link, type: subitem.link }))
																		close()
																	}}
																	className='[&:first-child]:border-t-white [&:first-child]:border-t-[1px] w-full text-left min-h-[49px] flex items-center text-white [&:first-child]:border-opacity-30 border-opacity-30 border-b-white border-b-[1px]'
																	to={`/catalog?category=${item.link}&type=${subitem.link}`}>
																	{subitem.name}
																</NavLink>
															)
														})
													}
												</div>
											)
										})
									}
								</div>
							}
						</div>
					</div>
			}

		</ScrollLock>
	)
}

export default HeaderCatalog