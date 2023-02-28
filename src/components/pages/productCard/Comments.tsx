import React, { useRef, useState } from 'react'
import useScreens from './../../../hooks/useScreens'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../bll/store'
import { VscLoading } from 'react-icons/vsc'
import { IconArrow } from '../../common/ProductsSlider/ProductsSlider'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { getComments } from '../../../bll/card-reducer'
import avatar from '../../../assets/images/user/avatar.png'
import { AiFillStar } from 'react-icons/ai'
import StarRating from './StarRating'

type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>

const Comments: React.FC<{ id: number }> = ({ id }) => {
	const screen = useScreens()
	const dispatch: AppDispatch = useDispatch()

	const comments = useSelector((state: AppStateType) => state.card.comments.items)
	const totalCount = useSelector((state: AppStateType) => state.card.comments.totalCount)
	const count = useSelector((state: AppStateType) => state.card.comments.count)
	const numberCount = useSelector((state: AppStateType) => state.card.comments.numberCount)

	const [swiper, setSwiper] = useState<any>()
	const prevRef = useRef<any>(null)
	const nextRef = useRef<any>(null)
	const [realIndex, setRealIndex] = useState<number>(0)

	React.useEffect(() => {
		if (numberCount && comments.length > 0 && totalCount) {
			if (realIndex == comments.length && ((numberCount + 1) * count <= totalCount)) {
				dispatch(getComments(id, count, numberCount + 1))
			}
		}
	}, [realIndex, numberCount, id, count, totalCount])

	return (
		<div className='bg-lightgray py-[24px] px-[16px] lg:p-[30px]'>
			<div className='border-b-gray pb-[24px] border-b-[1px] flex justify-between items-center'>
				<h4 className='text-dark text-[24px]'>Комментарии</h4>
				<div className='flex gap-[10px]'>
					<button
						id='commentsPrev'
						className='sliderBtn w-[30px] h-[30px] disabled:bg-opacity-50 !opacity-100 [&>*]:scale-75'
						ref={prevRef}>
						<IconArrow />
					</button>
					<button
						id='commentsNext'
						className='sliderBtn w-[30px] h-[30px] scale-[-1] [&>*]:scale-75 disabled:bg-opacity-50 !opacity-100'
						ref={nextRef}>
						<IconArrow />
					</button>
				</div>
			</div>
			<div className='pt-[24px]'>
				<Swiper
					onRealIndexChange={(swiper) => setRealIndex(swiper.realIndex)}
					onSwiper={setSwiper}
					observer
					observeParents
					watchOverflow
					modules={[Navigation]}
					navigation={{
						prevEl: prevRef.current,
						nextEl: nextRef.current
					}}
					spaceBetween={screen.lg ? 30 : 15}
					slidesPerView={1}
				>
					{
						comments.map((item) => {
							return (
								<SwiperSlide className='!h-auto' key={uuid()}>
									<div>
										<div className='flex justify-between items-center mb-[24px]'>
											<div className='flex items-center gap-[10px]'>
												<div className='w-[70px] overflow-hidden rounded-[50%]'>
													<div className='pb-[100%] relative'>
														{
															<img
																className='absolute top-0 left-0 w-full h-full object-cover'
																src={item.author.avatar || avatar} alt="" />
														}
													</div>
												</div>
												<div className='text-dark text-[18px]'>
													{
														item.author.name
													}
												</div>
											</div>
											<div className='flex gap-[8px]'>
												{
													!screen.lg &&
													<>
														<div className='text-dark text-[18px]'>
															{item.raiting}
														</div>
														<AiFillStar className='w-[25px] h-[25px] text-[#FFC700]' />
													</>
												}
												{
													screen.lg &&
													<StarRating value={item.raiting} allowedEdit={false} />
												}
											</div>
										</div>
										<div className='text-[16px] text-graystrong lg:text-[18px]'>
											{
												item.text
											}
										</div>
									</div>
								</SwiperSlide>
							)
						})
					}
					{
						comments.length != totalCount && (totalCount ? totalCount > 0 : true) &&
						<SwiperSlide className='!h-auto'>
							<div className='flex justify-center items-center text-graystrong'>
								Loading...
							</div>
						</SwiperSlide>
					}
				</Swiper>
			</div>
		</div>
	)
}

export default Comments