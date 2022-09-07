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
import { getQuotesForPatient } from '../../services/quote';

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.body}`]: {
		fontSize: 11,
		fontWeight: 'bold',
	},
}));

const StyledTableValueCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.body}`]: {
		fontSize: 11,
	},
}));

function AdmissionView() {
	const [patients, setPatients] = useState<any[]>([]);
	const [patientObjs, setPatientObjs] = useState<any[]>([]);
	const [quotes, setQuotes] = useState<any[]>([]);
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
			if (patientQuotes !== undefined) setSelectedQuote(patientQuotes[0]);
			setOpen(true);
		} else alert('Search record details unavailable1');
	};

	return (
		<div>
			<Header />
			<div className='main-container'>
				<div className='card-container-outer'>
					<div className='card-container-header'>PATIENT ADMISSION</div>
					<div className='card-container-inner'>
						<Grid container direction='column'>
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
											width: '55vw',
											margin: 'auto',
										}}
									>
										<Table size='small' stickyHeader>
											<TableRow>
												<StyledTableHeaderCell>
													Patient Name
												</StyledTableHeaderCell>
												<StyledTableValueCell>
													{selectedQuote.patient.patientName}
												</StyledTableValueCell>
											</TableRow>
										</Table>
									</TableContainer>
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
