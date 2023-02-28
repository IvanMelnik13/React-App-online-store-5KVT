import React, { useState, useEffect } from 'react'
import ScrollLock from 'react-scrolllock'
import useScreens from './../../../hooks/useScreens'
import { MdClose } from 'react-icons/md'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux';
import { AppStateType } from '../../../bll/store'
import { actions, FiltersType } from '../../../bll/catalog-reducer'
import categories from '../../header/categories'
import cn from 'classnames'
import './catalogSelect.scss'
import { IoMdArrowDropdown } from 'react-icons/io'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import StarRating from '../productCard/StarRating'
import { BsCheckLg } from 'react-icons/bs'

const CatalogFilters: React.FC<{
	close: () => void
}> = ({ close }) => {
	const screen = useScreens()

	return (
		<>
			{!screen.lg && <ScrollLock />}
			<div className='fixed top-0 left-0 w-full h-full z-50 bg-[#fcfcfc] lg:bg-transparent lg:py-0 lg:overflow-hidden lg:relative lg:z-0 py-[56px] overflow-auto'>
				<div className='container bg-lightgray p-[15px] px-[20px]'>
					<div className='w-full flex justify-end lg:hidden'>
						<button onClick={close} className='text-[28px] text-blue'>
							<MdClose />
						</button>
					</div>
					<CatalogFiltersForm />
				</div>
			</div>
		</>
	)
}

type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>

const CatalogFiltersForm: React.FC<{}> = () => {
	const filters = useSelector((state: AppStateType) => state.catalog.filters)
	const dispatch: AppDispatch = useDispatch()

	const { register, handleSubmit, formState: { errors }, control, setValue, setError } = useForm<FiltersType>({
		defaultValues: {
			category: filters.category,
			type: filters.type,
			price: filters.price,
			brand: filters.brand,
			rating: filters.rating,
			isNew: filters.isNew,
			isPromo: filters.isPromo,
			isDelivery: filters.isDelivery,
			isPickup: filters.isOrder,
			isOrder: filters.isOrder,
			isAvailable: filters.isAvailable,
			search: filters.search
		}
	})

	useEffect(() => {
		if (filters)
			Object.keys(filters).forEach(key => {
				setValue(key as keyof FiltersType, filters[key as keyof FiltersType])
			})
		if (filters?.category)
			setCategory(filters.category)
	}, [filters])

	const onSubmit = (data: FiltersType) => {
		const clearArrayToNull = (ob: { [key: string]: any }) => {
			const rez = { ...ob }
			const keys = Object.keys(ob)
			keys.forEach(key => {
				if (typeof rez[key] == 'object') {
					if (Array.isArray(rez[key])) {
						if (rez[key].length == 0 || JSON.stringify(rez[key]) == JSON.stringify([''])) {
							rez[key] = null
						}
					} else {
						if (rez[key] != null)
							rez[key] = clearArrayToNull(rez[key])
					}
				}
			})
			return rez
		}
		const filters = clearArrayToNull(data) as FiltersType
		if (filters.price.max && filters.price.min) {
			if (filters.price.max < filters.price.min) {
				setError('price.max', { type: 'price', message: 'Максимальная цена не может быть меньше минимальной' })
				return false
			}
		}
		dispatch(actions.setFilters(filters))
		dispatch(actions.setNumberCount(1))
	}

	const [category, setCategory] = useState<string | null>(filters?.category || null)
	const [subcategoryOptions, setSubcategoryOptions] = useState(categories.find(item => item.link == category)?.subitems.map((item, index) => ({
		label: item.name,
		value: item.link + index.toString()
	})))
	const categoriesOptions = categories.map(item => ({
		value: item.link,
		label: item.name
	}))
	useEffect(() => {
		setSubcategoryOptions(categories.find(item => item.link == category)?.subitems.map((item, index) => ({
			label: item.name,
			value: item.link
		})))
		setValue('type', null)
	}, [category])

	const brands = [{ label: 'Bosh', value: 'Bosh' }, { label: 'Huter', value: 'Huter' }, { label: 'Echo', value: 'Echo' }, { label: 'Diam', value: 'Diam' }, { label: 'Pecahta', value: 'Pecahta' }]

	const otherArray: Array<{
		label: string
		value: 'isNew' | 'isPromo'
	}> = [{ label: 'Новинки', value: 'isNew' }, { label: 'Скидки', value: 'isPromo' }]

	const deliveryArray: Array<{
		label: string
		value: 'isDelivery' | 'isPickup' | 'isOrder' | 'isAvailable'
	}> = [{ value: 'isDelivery', label: 'Доставка' }, { value: 'isPickup', label: 'Самовывоз' }, { value: 'isOrder', label: 'Под заказ' }, { value: 'isAvailable', label: 'В наличии' }]

	return (
		<form className='' onSubmit={handleSubmit(onSubmit)}>
			<div className='[&>*:not(:last-child)]:pb-[10px] [&>*:not(:first-child)]:pt-[10px] [&>*:not(:last-child)]:border-b-[1px] [&>*:not(:last-child)]:border-solid [&>*:not(:last-child)]:border-gray mb-[20px]'>
				<div className='[&>*:not(:last-child)]:pb-[10px] [&>*:not(:first-child)]:pt-[10px]'>
					<div>
						<div className='text-dark text-[18px] mb-[10px]'>Категория</div>
						<CatalogSelect changeHandler={(value) => setCategory(value as string || null)} options={categoriesOptions} control={control} name='category' placeholder='Категория' />
					</div>
					<div className=''>
						<div className='text-dark text-[18px] mb-[10px]'>Подкатегория</div>
						<CatalogSelect options={subcategoryOptions || []} control={control} name='type' placeholder='Подкатегория' />
					</div>
				</div>
				<div>
					<div className='text-dark text-[18px] mb-[10px]'>Цена</div>
					<div className='flex gap-[5px] items-center'>
						<input className='flex-auto w-full p-[13px]' type='number' {...register('price.min')} placeholder='от' />
						<span className='text-blue'>:</span>
						<input className={cn('flex-auto w-full p-[13px]', {
							'text-red': errors.price?.max
						})} type='number' {...register('price.max')} placeholder='до' />
					</div>
				</div>

				<div>
					<div className='text-dark text-[18px] mb-[10px]'>Брэнд</div>
					<div className='flex flex-col gap-[10px]'>
						{
							brands.map((item, index) => {
								return (
									<div key={index} className='h-[19px]'>
										<label className='inline-flex items-center gap-[5px] cursor-pointer'>
											<div className='flex items-center'>
												<input
													type='checkbox'
													value={item.value}
													{...register('brand')}
													className='customcheckbox' />
												<div>
													<BsCheckLg />
												</div>
											</div>
											<div className='text-dark'>
												{item.label}
											</div>
										</label>
									</div>
								)
							})
						}
					</div>
				</div>

				<div>
					<div className='text-dark text-[18px] mb-[10px]'>Рейтинг</div>
					<Controller
						control={control}
						name='rating'
						render={
							({
								field: { onChange, value },
							}) =>
								(<StarRating allowedEdit={true} value={value || 0} handler={(value) => onChange(value)} />)} />
				</div>

				<div>
					<div className='text-dark text-[18px] mb-[10px]'>Другое</div>
					<div className='flex flex-col gap-[10px]'>
						{
							otherArray.map((item, index) => {
								return (
									<Controller
										key={index}
										control={control}
										name={item.value}
										render={
											({
												field: { onChange, value },
											}) =>
											(<Checkbox
												onChange={onChange}
												label={item.label}
												value={value?.toString() || 'false'}
											/>)} />
								)
							})
						}
					</div>
				</div>

				<div>
					<div className='text-dark text-[18px] mb-[10px]'>Доставка и наличие</div>
					<div className='flex flex-col gap-[10px]'>
						{
							deliveryArray.map((item, index) => {
								return (
									<Controller
										key={index}
										control={control}
										name={item.value}
										render={
											({
												field: { onChange, value },
											}) =>
											(<Checkbox
												onChange={onChange}
												label={item.label}
												value={value?.toString() || 'false'}
											/>)} />
								)
							})
						}
					</div>
				</div>
			</div>

			<div>
				<button className='flex min-h-[55px] py-[5px] px-[15px] bg-blue items-center justify-center w-full text-white rounded-[3px]'>Найти</button>
			</div>
		</form >
	)
}

const Checkbox: React.FC<{
	value: string
	label: string
	onChange: (value: string) => void
}> = ({ label, value, onChange }) => {
	return (
		<div className='h-[19px]'>
			<label className='inline-flex items-center gap-[5px] cursor-pointer'>
				<div className='flex items-center'>
					<input
						onChange={(e) => onChange(e.currentTarget.checked ? 'true' : 'false')}
						type='checkbox'
						checked={value == 'true'}
						value='true'
						className='customcheckbox' />
					<div>
						<BsCheckLg />
					</div>
				</div>
				<div className='text-dark'>
					{label}
				</div>
			</label>
		</div>
	)
}

const CatalogSelect: React.FC<{
	options: Array<{
		label: string
		value: string | number | boolean
	}>
	control: any
	name: string
	placeholder: string
	changeHandler?: (value: string | number | boolean | null) => void
}> = ({ control, options, name, placeholder, changeHandler }) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, value },
			}) =>
			(<Select
				components={{ DropdownIndicator: () => <IoMdArrowDropdown className='text-[20px] text-blue' /> }}
				classNamePrefix="catalog-select"
				value={options.find((c) => c.value === value)}
				onChange={(val) => {
					onChange(val?.value)
					if (changeHandler)
						changeHandler(val?.value || null)
				}}
				options={options}
				placeholder={placeholder}
			/>)} />
	)
}

export default CatalogFilters