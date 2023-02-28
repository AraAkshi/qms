import React, { useState } from 'react';
import FileUpload from '../common/FileUpload';
import Header from '../layout/Header';

function AdminView() {
	return (
		<div>
			<Header />
			<div className='main-container'>
				<div className='card-container-outer'>
					<div className='card-container-header'>UPLOAD QUOTATION DETAILS</div>
					<div className='card-container-inner'>
						<FileUpload />
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminView;
