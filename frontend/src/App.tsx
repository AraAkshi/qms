import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MarketingView from './components/MarketingView';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/marketing' element={<MarketingView />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
