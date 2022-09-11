import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MarketingView from './components/views/MarketingView';
import AdmissionView from './components/views/AdmissionView';
import DischargeView from './components/views/DischargeView';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<DischargeView />} />
				<Route path='/marketing' element={<MarketingView />} />
				<Route path='/admission-counter/admit' element={<AdmissionView />} />
				<Route
					path='/admission-counter/discharge'
					element={<DischargeView />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
