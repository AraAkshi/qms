import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MarketingView from './components/marketing/MarketingView';
import AdmissionView from './components/admission/AdmissionView';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<AdmissionView />} />
				<Route path='/marketing' element={<MarketingView />} />
				<Route path='/admission-counter' element={<AdmissionView />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
