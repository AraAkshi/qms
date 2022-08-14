import { Autocomplete, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import Header from './layout/Header';

function MarketingView() {
	const [selectedSurgery, setSelectedSurgery] = useState<string>('');
	const [selectedSurgeon, setSelectedSurgeon] = useState<string>('');
	const [surgerys, setSurgerys] = useState<any[]>([
		'Surgery 1',
		'Surgery 2',
		'Surgery 3',
	]);
	const [surgeons, setSurgeons] = useState<any[]>([
		'Dr.ABC',
		'Dr.EFG',
		'Dr.DBC',
	]);

	const handleSurgeryChange = (newValue: string) => {
		setSelectedSurgery(newValue);
	};

	const handleSurgeonChange = (newValue: string) => {
		setSelectedSurgeon(newValue);
	};

	return (
		<div>
			<Header />
			<div className='main-container'>
				<div className='card-container-outer'>
					<div className='card-container-header'>SURGERY PACKAGES</div>
					<div className='card-container-inner'>
						<Grid container direction='row' spacing={4} justifyContent='center'>
							<Grid item xs={4}>
								<Autocomplete
									id='surgeonId'
									options={surgeons.map((surgeon) => surgeon)}
									onChange={(e: any, newValue: string) => {
										handleSurgeonChange(newValue);
									}}
									renderInput={(params: any) => (
										<TextField
											{...params}
											label='Surgeon'
											className='select-component'
											variant='standard'
										/>
									)}
								/>
							</Grid>
							<Grid item xs={4}>
								<Autocomplete
									id='surgeryId'
									options={surgerys.map((surgery) => surgery)}
									onChange={(e: any, newValue: string) => {
										handleSurgeryChange(newValue);
									}}
									renderInput={(params: any) => (
										<TextField
											{...params}
											label='Surgery'
											variant='standard'
											className='select-component'
										/>
									)}
								/>
							</Grid>
							<Grid item xs={4}>
								<button className='search-btn'>SEARCH</button>
							</Grid>
						</Grid>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MarketingView;
