import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MarketingView from './components/marketing/MarketingView';
import AddPatientDetails from './components/marketing/AddPatientDetails';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MarketingView />} />
				<Route path='/marketing' element={<MarketingView />} />
				<Route
					path='/marketing/add-patient/:id'
					element={<AddPatientDetails />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
