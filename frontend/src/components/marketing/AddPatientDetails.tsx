import { Backdrop, Button, Grid, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addPatient } from '../../services/patient';
import { updateQuotesWithPatient } from '../../services/quote';
import Alert from '../layout/Alert';
import MarketingView from './MarketingView';

function AddPatientDetails() {
	const { quoteId } = useParams<any>();
	const [open, setOpen] = useState(true);
	const [openAlert, setOpenAlert] = useState(false);
	const [alert, setAlert] = useState<any[]>([]);
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
			const updatedQuote = await updateQuotesWithPatient(quoteId, res.id);
			if (updatedQuote !== undefined) {
				setOpenAlert(true);
				window.open(window.location.origin + `/marketing`, '_self');
			}
			setOpen(false);
		}
	};

	const handleClose = () => setOpen(false);

	return (
		<div>
			{openAlert ? (
				<Alert severity='success'>Patient Details Added Successfully</Alert>
			) : (
				''
			)}
			<MarketingView />
			<Modal
				open={open}
				onClose={handleClose}
				style={{ height: '50vh', width: '40vw', margin: 'auto' }}
				// BackdropComponent={Backdrop}
			>
				<div className='addModal'>
					<div className='card-container-outer'>
						<div className='card-container-header'>SURGERY PACKAGES</div>
						<div className='card-container-inner'>
							<form className='form' onSubmit={(e) => onSubmit(e)}>
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
							</form>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default AddPatientDetails;
