import {
	Autocomplete,
	Grid,
	styled,
	Table,
	TableCell,
	tableCellClasses,
	TableContainer,
	TableRow,
	TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllPatients } from '../../services/patient';
import Header from '../layout/Header';
import _ from 'lodash';
import { getQuotesForPatient, updateQuotes } from '../../services/quote';

function AdmissionView() {
	const [patients, setPatients] = useState<any[]>([]);
	const [patientObjs, setPatientObjs] = useState<any[]>([]);
	const [searchValue, setSearchValue] = useState();
	const [selectedQuote, setSelectedQuote] = useState<any>();
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		async function fetchData() {
			const patientRes = await getAllPatients();
			if (patientRes !== undefined) {
				setPatientObjs(patientRes);
				setPatients(patientRes.map((item: any) => item.patientNo));
			}
		}
		fetchData();
	}, [0]);

	const onPatientSearch = (newValue: any) => {
		setSearchValue(newValue);
	};

	const onSearchBtnClick = async () => {
		const selectedPatient = patientObjs.find(
			(item) => item.patientNo === searchValue
		);

		if (selectedPatient !== undefined) {
			const patientQuotes = await getQuotesForPatient(selectedPatient.id);
			if (patientQuotes !== undefined)
				setSelectedQuote(patientQuotes[patientQuotes.length - 1]);
			setOpen(true);
		} else alert('Search Record Details Unavailable');
	};

	const onAdmitBtnClick = async () => {
		const updateQuote = await updateQuotes(selectedQuote.id, true);
		if (updateQuote !== undefined) alert('Details Updated Successfully!');
		window.open(window.location.origin + `/admission-counter/admit`, '_self');
	};

	const onChange = (e: any) => {};

	return (
		<div>
			<Header />
			<div className='main-container'>
				<div className='card-container-outer'>
					<div className='card-container-header'>PATIENT ADMISSION</div>
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
													placeholder='Search by Patient Mobile No'
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
									<TableContainer
										style={{
											maxHeight: '60vh',
											width: '50vw',
											margin: 'auto',
											overflowY: 'auto',
										}}
									>
										<div className='card-container-sub-header'>
											PATIENT DETAILS
										</div>
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
													<div className='tbl-header'>Hospital Fee</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														{selectedQuote.hospitalFee}
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>Consultation Fee</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														{selectedQuote.consultationFee}
													</div>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<div className='tbl-header'>Total Fee</div>
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
													<div className='tbl-header'>Remarks</div>
												</TableCell>
												<TableCell>
													<div className='tbl-body'>
														{selectedQuote.remarks ? selectedQuote.remarks : ''}
													</div>
												</TableCell>
											</TableRow>
										</Table>
									</TableContainer>
									<Grid
										container
										justifyContent='center'
										style={{ marginBottom: '2rem', marginTop: '1.3rem' }}
									>
										<button className='search-btn' onClick={onAdmitBtnClick}>
											ADMIT
										</button>
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

export default AdmissionView;
