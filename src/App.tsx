import axios from 'axios';
import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/header/Header'
import productsAPI from './dall/products-api'
import Home from './components/pages/home/Home'
import ProductCard from './components/pages/productCard/ProductCard'
import Catalog from './components/pages/catalog/Catalog'

const App = () => {

	return (
		<>
			<Header />
			<div className="font-lato bg-white container">
				<Routes>
					<Route path='/product/:id' element={<ProductCard />} />
					<Route path='/home' element={<Home />} />
					<Route path='/catalog' element={<Catalog />} />
					<Route path='/' element={<Navigate to='/home' />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
