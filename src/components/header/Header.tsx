import React, { useRef, useState } from 'react'
import logo from '../../assets/images/logo.svg'
import bigLogo from '../../assets/images/bigLogo.svg'
import useScreens from './../../hooks/useScreens'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineHeart, AiOutlineUser, AiOutlineInstagram } from 'react-icons/ai'
import { SlBasket } from 'react-icons/sl'
import { RxHamburgerMenu } from 'react-icons/rx'
import { BsTelephone, BsSearch, BsYoutube } from 'react-icons/bs'
import { FiMail } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { ImFacebook2 } from 'react-icons/im'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Mousewheel, Navigation } from 'swiper'
import { v4 as uuid } from 'uuid'
import { CgClose } from 'react-icons/cg'
import HeaderCatalog from './HeaderCatalog'
import categories from './categories'
import { useSelector, useDispatch } from 'react-redux';
import { AppStateType } from '../../bll/store'
import { actions, nullFilters } from '../../bll/catalog-reducer'
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>

const Header = () => {
	const screen = useScreens()
	const dispatch: AppDispatch = useDispatch()

	const [swiper, setSwiper] = useState(false)

	const prevEl = useRef(null)
	const nextEL = useRef(null)

	const [isOpenPopupCatalog, setIsOpenPopupCatalog] = useState(false)

	return (
		<div className='pt-[55px] lg:pt-0'>

			<div className='hidden lg:flex min-h-[50px] bg-lightgray items-center'>
				<div className='flex justify-between items-cente container gap-[30px]'>
					<div className='flex gap-[30px]'>
						<NavLink className='hover:underline text-dark text-[16px]' to='/delivery'>
							Доставка и оплата
						</NavLink>
						<NavLink className='hover:underline text-dark text-[16px]' to='/contacts'>
							Контакты
						</NavLink>
					</div>
					<div className='hidden lg:flex items-center gap-[10px]'>
						<div>
							Построй и обустрой
						</div>
						<div className='[&>*]:w-[4px] [&>*]:h-[4px] [&>*]:bg-blue [&>*]:rounded-[50%] gap-[4px] flex'>
							<span></span><span></span><span></span>
						</div>
						<div>
							Всё для дома, дачи и стройки!
						</div>
					</div>
					<div className='flex gap-[25px]'>
						<div>
							<LikeProducts />
						</div>
						<div>
							<Basket />
						</div>
					</div>
				</div>
			</div>

			<div className='container flex items-center justify-between gap-[5px] lg:gap-x-[10px] gap-y-[10px] xl:gap-x-[30px] pb-[15px] lg:min-h-[77px] lg:py-[5px] flex-wrap'>
				<NavLink className='shrink-0' to='/'>
					<img src={!screen.lg ? logo : bigLogo} alt="" />
				</NavLink>
				<div className='hidden lg:block'>
					<ContactLink icon={<></>} text='+7 (499) 719-99-94' href='tel:+74997199994' />
				</div>
				<div className='hidden flex-auto lg:block'>
					<HeaderSearchForm />
				</div>
				<div className='hidden lg:flex lg:gap-[10px] xl:gap-[15px] items-center'>
					<a href='#insta' target='_blank' className='w-[22px] h-[22px] bg-blue rounded-[3px] hover:opacity-70 flex items-center justify-center'>
						<AiOutlineInstagram className='text-white w-[18px] h-[18px]' />
					</a>
					<a href='#fc' target='_blank' className='w-[22px] h-[22px] bg-white rounded-[3px] hover:opacity-70'>
						<ImFacebook2 className='w-[22px] h-[22px] text-blue' />
					</a>
					<a href='#youtube' target='_blank' className='w-[22px] h-[22px] bg-red rounded-[3px] hover:opacity-70 flex items-center justify-center'>
						<BsYoutube className='text-white w-[14px] h-[14px]' />
					</a>
				</div>
				<div className='flex gap-[24px] items-center lg:hidden'>
					<div className='lg:hidden'>
						<LikeProducts />
					</div>
					<div className='lg:hidden'>
						<Basket />
					</div>
					<div className='lg:hidden'>
						<CatalogButton isActive={isOpenPopupCatalog} toggleIsActive={setIsOpenPopupCatalog} />
					</div>
				</div>
			</div>

			<div className='container lg:hidden'>
				<span className='block h-[1px] bg-gray'></span>
			</div>

			<div className='flex gap-[5px] container flex-wrap items-center justify-between'>
				<div className='py-[16px] lg:py-0 lg:hidden'>
					<ContactLink icon={<BsTelephone className='text-orange' />} text='8-(495)-005-52-15' href='tel:84950055215' />
				</div>
				<div className='py-[16px] lg:py-0 lg:hidden'>
					<ContactLink icon={<FiMail className='text-orange' />} text='info@5kvt.ru' href='mailto:info@5kvt.ru' />
				</div>
				<div className='basis-[100%] lg:hidden'>
					<HeaderSearchForm />
				</div>
			</div>

			<div className='container '>
				<div className='flex lg:min-h-[55px] rounded-[3px] relative'>
					{
						isOpenPopupCatalog &&
						<HeaderCatalog close={() => setIsOpenPopupCatalog(false)} />
					}
					<div className='hidden lg:block'>
						<CatalogButton isActive={isOpenPopupCatalog} toggleIsActive={setIsOpenPopupCatalog} />
					</div>
					<div className='hidden lg:flex bg-lightgray flex-auto overflow-hidden rounded-[3px] relative'>
						<button ref={prevEl} className='disabled:hidden w-[30px] h-full top-0 left-0 absolute z-10 bg-gradient-to-l from-transparent to-white flex items-center justify-center'>
							<IconArrow />
						</button>
						<Swiper
							onSwiper={() => setSwiper(true)}
							modules={[Mousewheel, Navigation]}
							navigation={{
								prevEl: prevEl.current,
								nextEl: nextEL.current
							}}
							className='h-full'
							spaceBetween={0}
							slidesPerView='auto'
							mousewheel={true}
						>
							{
								categories.map(item => {
									return (
										<SwiperSlide key={uuid()} className='!w-auto h-full'>
											<NavLink className='text-[16px] h-full flex items-center justify-center px-[15px] py-[5px] bg-lightgray hover:bg-gray hover:bg-opacity-70 rounded-[3px] text-dark' to={`/catalog?category=${item.link}`} onClick={() => dispatch(actions.setFilters({ ...nullFilters, category: item.link }))}>
												{item.name}
											</NavLink>
										</SwiperSlide>
									)
								})
							}
						</Swiper>
						<button ref={nextEL} className='disabled:hidden w-[30px] h-full top-0 right-0 absolute z-10 bg-gradient-to-l from-transparent to-white flex items-center justify-center scale-[-1]'>
							<IconArrow />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

const ContactLink: React.FC<{ icon: React.ReactNode, text: string, href: string }> = ({ icon, text, href }) => {
	return (
		<a className='inline-flex gap-[5px] items-center px-0 hover:underline'
			href={href}>
			{icon}
			<span className='text-[16px] text-dark leading-[1.2] lg:text-[25px] lg:font-semibold'>
				{text}
			</span>
		</a>
	)
}

const CatalogButton: React.FC<{ isActive: boolean, toggleIsActive: (isActive: boolean) => void }> = ({ isActive, toggleIsActive }) => {
	return (
		<>
			<button className='w-[30px] h-[30px] bg-blue rounded-[3px] flex justify-center items-center hover:bg-opacity-70 lg:hidden relative z-50' onClick={() => toggleIsActive(!isActive)}>
				{
					isActive ? <CgClose className='w-[24px] h-[24px] text-white' /> : <RxHamburgerMenu className='w-[24px] h-[24px] text-white' />
				}
			</button>
			<button onClick={() => toggleIsActive(!isActive)} className='min-h-full hidden lg:flex items-center justify-center relative bg-blue px-[20px] py-[5px] rounded-[3px] text-white gap-[15px] hover:bg-[#1d4ed8] z-50'>
				<RxHamburgerMenu className='w-[25px] h-[25px]' />
				<span>Каталог</span>
			</button>
		</>
	)
}

const LikeProducts = () => {
	return (
		<div>
			<NavLink to='/likes'>
				<AiOutlineHeart className='w-[20px] h-[20px] text-dark' />
			</NavLink>
		</div>
	)
}

const Basket = () => {
	return (
		<NavLink to='/basket'>
			<SlBasket className='w-[20px] h-[20px] text-dark' />
		</NavLink>
	)
}

const HeaderSearchForm: React.FC = () => {
	const navigate = useNavigate()
	const dispatch: AppDispatch = useDispatch()
	const search = useSelector((state: AppStateType) => state.catalog.filters.search)
	const filters = useSelector((state: AppStateType) => state.catalog.filters)

	const { register, handleSubmit, reset, setValue } = useForm<{
		search: string | null
	}>({
		defaultValues: {
			search: ''
		}
	})

	React.useEffect(() => {
		setValue('search', search)
	}, [search])

	const onSubmit = (forlgata: { search: string | null }) => {
		navigate(`/catalog?search=${forlgata.search}`)
		dispatch(actions.setFilters({ ...filters, search: forlgata.search }))
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex bg-lightgray min-h-[40px] lg:min-h-[37px] lg:bg-transparent items-center px-[16px] py-[5px] lg:border-[1px] lg:border-solid lg:border-gray lg:rounded-[3px] lg:p-[4px] gap-[5px]'>
			<input className='bg-lightgray flex-auto lg:bg-transparent'
				{...register("search")}
				type='text'
				placeholder='Поиск' />
			<button className='w-[24px] hover:bg-opacity-70 h-[24px] lg:bg-blue lg:w-auto lg:py-[3px] lg:px-[10px] lg:rounded-[3px] lg:h-[27px] flex items-center justify-center'>
				<BsSearch className='lg:hidden' />
				<span className='hidden lg:inline text-white text-[16px]'>Поиск</span>
			</button>
		</form>
	)
}

const IconArrow = () => {
	return (
		<span style={{
			'width': 0,
			'height': 0,
			'borderTop': '6.25px solid transparent',
			'borderRight': '6.25px solid #9C9C9C',
			'borderBottom': '6.25px solid transparent',
		}}></span>
	)
}

export default Header