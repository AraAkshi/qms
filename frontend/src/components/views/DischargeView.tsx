import {
	Autocomplete,
	Grid,
	Table,
	TableCell,
	TableContainer,
	TableRow,
	TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllPatients } from '../../services/patient';
import { getQuotesForPatient, updateQuotes } from '../../services/quote';
import Header from '../layout/Header';

function DischargeView() {
	const [patients, setPatients] = useState<any[]>([]);
	const [patientObjs, setPatientObjs] = useState<any[]>([]);
	const [searchValue, setSearchValue] = useState();
	const [selectedQuote, setSelectedQuote] = useState<any>();
	const [open, setOpen] = useState<boolean>(false);
	const [formData, setFormData] = useState({
		actualHospitalFee: 0,
		actualConsultationFee: 0,
		discount: 0,
	});

	const { actualHospitalFee, actualConsultationFee, discount } = formData;

	useEffect(() => {
		async function fetchData() {
			const patientRes = await getAllPatients();
			if (patientRes !== undefined) {
				setPatientObjs(patientRes);
				const patientList = patientRes.map((item: any) => item.patientNo);
				patientList.push(patientRes.map((item: any) => item.pid));
				setPatients(patientList);
			}
		}
		fetchData();
	}, [0]);

	const onPatientSearch = (newValue: any) => {
		setSearchValue(newValue);
	};

	const onSearchBtnClick = async () => {
		const selectedPatient = patientObjs.find(
			(item) => item.patientNo === searchValue || item.pid === searchValue
		);

		if (selectedPatient !== undefined) {
			const patientQuotes = await getQuotesForPatient(selectedPatient.id);
			if (patientQuotes !== undefined)
				setSelectedQuote(patientQuotes[patientQuotes.length - 1]);
			setOpen(true);
		} else alert('Search Record Details Unavailable');
	};

	const onChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		// if()
	};

	const onAdmitBtnClick = async () => {
		const updateQuote = await updateQuotes(selectedQuote.id, true);
		if (updateQuote !== undefined) alert('Details Updated Successfully!');
		window.open(window.location.origin + `/admission-counter`, '_self');
	};

	const resetForm = () => {
		setFormData({
			actualHospitalFee: 0,
			actualConsultationFee: 0,
			discount: 0,
		});
	};

	return (
		<div>
			<Header />
			<div className='main-container'>
				<div className='card-container-outer'>
					<div className='card-container-header'>PATIENT DISCHARGE</div>
					<div className='card-container-inner'>
						<Grid container direction='column' spacing={5}>
							<Grid item>
								<Grid
									container
									direction='row'
									justifyContent='center'
									spacing={2}
								>
									<Grid item xs={7}>
										<Autocomplete
											id='patientsId'
											options={patients.map((patient) => patient)}
											onChange={(e, newValue) => onPatientSearch(newValue)}
											renderInput={(params) => (
												<TextField
													{...params}
													size='small'
													placeholder='Search by Patient Mobile No or PID'
													value={searchValue}
													style={{ width: '100%', marginTop: '0.5rem' }}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={2}>
										<button className='search-btn' onClick={onSearchBtnClick}>
											SEARCH
										</button>
									</Grid>
								</Grid>
							</Grid>
							{open ? (
								<Grid item>
									<div className='card-container-sub-header'>
										PATIENT DETAILS
									</div>
									<TableContainer
										style={{
											maxHeight: '42vh',
											width: '50vw',
											margin: 'auto',
											overflowY: 'auto',
										}}
									>
										<Table size='small' stickyHeader>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>Patient Name</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														{selectedQuote.patient.patientName}
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>Patient No</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														{selectedQuote.patient.patientNo}
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>Surgery</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														{selectedQuote.surgery.surgeryName}
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>Surgeon</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														{selectedQuote.surgeon.surgeonName}
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>Bed Category</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														{selectedQuote.bedCategory
															? selectedQuote.bedCategory
															: ''}
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>Quoted Date</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														{new Date(
															selectedQuote.quotedDate
														).toLocaleDateString()}
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>Remarks</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														{selectedQuote.remarks ? selectedQuote.remarks : ''}
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>Quoted Hospital Fee</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														{selectedQuote.hospitalFee}
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>Actual Hospital Fee</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														<TextField
															name='actualHospitalFee'
															size='small'
															value={selectedQuote.actualHospitalFee}
															onChange={(e) => onChange(e)}
														/>
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>
														Quoted Consultation Fee
													</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														{selectedQuote.consultationFee}
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>
														Actual Consultation Fee
													</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														<TextField
															name='actualConsultationFee'
															size='small'
															value={selectedQuote.actualConsultationFee}
															onChange={(e) => onChange(e)}
														/>
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>Quoted Total Fee</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														{selectedQuote.hospitalFee +
															selectedQuote.consultationFee}
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'> Discount Fee</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														<TextField
															name='dicount'
															size='small'
															value={selectedQuote.discount}
															onChange={(e) => onChange(e)}
														/>
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>Actual Total Fee</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														{selectedQuote.actualHospitalFee +
															selectedQuote.actualConsultationFee -
															selectedQuote.discount}
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>Varience</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														{selectedQuote.actualHospitalFee +
															selectedQuote.actualConsultationFee -
															selectedQuote.discount -
															selectedQuote.hospitalFee -
															selectedQuote.consultationFee}
													</div>
												</TableCell>
											</TableRow>
										</Table>
									</TableContainer>
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
											<button className='search-btn' onClick={onAdmitBtnClick}>
												SUBMIT
											</button>
										</Grid>
									</Grid>
								</Grid>
							) : null}
						</Grid>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DischargeView;
