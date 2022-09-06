import React from 'react';
import Header from '../layout/Header';

function AdmissionView() {
	return (
		<div>
			<Header />
			<div className='main-container'>
				<div className='card-container-outer'>
					<div className='card-container-header'>PATIENT ADMISSION</div>
					<div className='card-container-inner'></div>
				</div>
			</div>
		</div>
	);
}

export default AdmissionView;
