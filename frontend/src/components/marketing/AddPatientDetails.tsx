import { Backdrop, Button, Grid, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addPatient } from '../../services/patient';
import { addQuote, updateQuotesWithPatient } from '../../services/quote';

function AddPatientDetails(props: {
	quote: any;
	selectedPackage: number;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}) {
	const { quote, selectedPackage, setOpen, open } = props;
	const [openAlert, setOpenAlert] = useState(false);
	const [formData, setFormData] = useState({
		patientName: '',
		patientNo: '',
	});

	const { patientName, patientNo } = formData;

	const onChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setFormData({
			patientName: '',
			patientNo: '',
		});
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();
		const res = await addPatient(patientName, patientNo);
		if (res !== undefined) {
			const updatedQuote = await addQuote(
				res.id,
				quote.surgeon.id,
				quote.surgery.id,
				0,
				false,
				selectedPackage
			);
			if (updatedQuote !== undefined) {
				alert('Patient Details Added Successfully!');
			}
			setOpen(false);
		}
	};

	const handleClose = () => setOpen(false);

	return (
		<Modal
			open={open}
			onClose={handleClose}
			style={{ height: '50vh', width: '40vw', margin: 'auto' }}
			// BackdropComponent={Backdrop}
		>
			{/* <div className='addModal'> */}
			<div className='card-container-outer'>
				<div className='card-container-header'>ADD PATIENT DETAILS</div>
				<div className='card-container-inner'>
					{/* <form className='form' onSubmit={(e) => onSubmit(e)}> */}
					<Grid
						container
						direction='column'
						spacing={1}
						style={{ padding: '1rem' }}
					>
						<TextField
							name='patientName'
							size='small'
							label='Patient Name'
							value={patientName.toUpperCase()}
							onChange={(e) => onChange(e)}
							style={{ marginTop: '0.5rem' }}
							required
						/>
						<TextField
							name='patientNo'
							label='Patient Mobile No'
							size='small'
							value={patientNo}
							onChange={(e) => onChange(e)}
							style={{ marginTop: '0.5rem' }}
						/>
					</Grid>
					<Grid
						container
						direction='row'
						spacing={3}
						justifyContent='center'
						style={{ padding: '1rem' }}
					>
						<Grid item>
							<button className='search-btn' onClick={resetForm}>
								RESET
							</button>
						</Grid>
						<Grid item>
							<button className='search-btn' onClick={onSubmit}>
								CONFIRM
							</button>
						</Grid>
					</Grid>
					{/* </form> */}
				</div>
			</div>
			{/* </div> */}
		</Modal>
	);
}

export default AddPatientDetails;
