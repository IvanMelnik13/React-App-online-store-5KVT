import advantage01 from '../../../../assets/images/advantages/icon01.svg'
import advantage02 from '../../../../assets/images/advantages/icon02.svg'
import advantage03 from '../../../../assets/images/advantages/icon03.svg'
import advantage04 from '../../../../assets/images/advantages/icon04.svg'
import { AdvantageType } from './Advantage'

const items: AdvantageType[] = [
	{
		image: advantage01,
		title: 'Удобная доставка 24/7',
		text: 'Мы работаем с проверенными транспортными компаниями',
	},
	{
		image: advantage02,
		title: 'Оплата любым способом',
		text: '7 способов оплаты для вашего удобства',
	},
	{
		image: advantage03,
		title: 'Гарантия качества',
		text: 'Перед покупкой мы надежно проверяем товар',
	},
	{
		image: advantage04,
		title: 'Онлайн поддержка',
		text: 'Менеджеры оперативно ответят на звонок или заявку',
	},
]

export default items