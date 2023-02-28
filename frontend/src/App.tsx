import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MarketingView from './components/views/MarketingView';
import AdmissionView from './components/views/AdmissionView';
import DischargeView from './components/views/DischargeView';
import HomeView from './components/views/HomeView';
import AdminView from './components/views/AdminView';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomeView />} />
				<Route path='/marketing' element={<MarketingView />} />
				<Route path='/admission-counter/admit' element={<AdmissionView />} />
				<Route
					path='/admission-counter/discharge'
					element={<DischargeView />}
				/>
				<Route path='/admin' element={<AdminView />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
