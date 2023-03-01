import {
	Autocomplete,
	Grid,
	styled,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import React, { useEffect, useState } from 'react';
import { getQuotes, getSurgeonsForSurgery } from '../../services/package';
import { getPastRecords } from '../../services/past-records';
import { addPatient } from '../../services/patient';
import { addQuote, updateQuotes } from '../../services/quote';
import { getAllSurgeons } from '../../services/surgeon';
import { getAllSurgerys } from '../../services/surgery';
import { bedCategorys } from '../../utils/data';
import Header from '../layout/Header';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontSize: 11,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 11,
	},
}));

function MarketingView() {
	const [selectedSurgery, setSelectedSurgery] = useState();
	const [selectedSurgeon, setSelectedSurgeon] = useState();
	const [selectedSurgeonForQuote, setSelectedSurgeonForQuote] =
		useState(selectedSurgeon);
	const [selectedBedCatForQuote, setSelectedBedCatForQuote] = useState('');
	const [surgerys, setSurgerys] = useState<string[]>([]);
	const [surgeons, setSurgeons] = useState<string[]>([]);
	const [surgeryObjs, setSurgeryObjs] = useState<any[]>([]);
	const [surgeonObjs, setSurgeonObjs] = useState<any[]>([]);
	const [quoteTblVisible, setQuoteTblVisible] = useState<boolean>(false);
	const [quotes, setQuotes] = useState<any[]>([]);
	const [pastRecords, setPastRecords] = useState<any[]>([]);
	const [open, setOpen] = useState<boolean>(false);
	const [formData, setFormData] = useState({
		patientName: '',
		patientNo: '',
		consultationFee: 0,
		hospitalFee: 0,
		remarks: '',
	});

	const { patientName, patientNo, consultationFee, hospitalFee, remarks } =
		formData;

	useEffect(() => {
		async function fetchData() {
			const resSurgerys: { id: number; surgeryName: string }[] =
				await getAllSurgerys();

			if (resSurgerys !== undefined) {
				setSurgeryObjs(resSurgerys);
				setSurgerys(resSurgerys.map((item) => item.surgeryName));
			}
		}
		fetchData();
	}, [0]);

	const handleSurgeryChange = async (newValue: any) => {
		setSelectedSurgery(newValue);
		const selectedSurgeryObj = surgeryObjs.find(
			(item) => item.surgeryName === newValue
		);
		const surgeonRes = await getSurgeonsForSurgery(selectedSurgeryObj.id);

		if (surgeonRes !== undefined) {
			setSurgeonObjs(surgeonRes);
			setSurgeons(surgeonRes.map((item: any) => item.surgeonName));
		}
	};

	const handleSurgeonChange = (newValue: any) => {
		setSelectedSurgeon(newValue);
	};

	const searchQuotes = async () => {
		const selectedSurgeonObj = surgeonObjs.find(
			(item) => item.surgeonName === selectedSurgeon
		);

		const selectedSurgeryObj = surgeryObjs.find(
			(item) => item.surgeryName === selectedSurgery
		);

		const quotesRes = await getQuotes(
			selectedSurgeonObj.id,
			selectedSurgeryObj.id
		);
		if (quotesRes !== undefined) setQuotes(quotesRes);

		const recordRes = await getPastRecords(
			selectedSurgeonObj.id,
			selectedSurgeryObj.id
		);
		if (recordRes !== undefined) {
			const latestThreeRecords = [];
			for (let index = 0; index < recordRes.length && index <= 3; index++) {
				latestThreeRecords.push(recordRes[index]);
			}

			setPastRecords(latestThreeRecords);
		}

		setQuoteTblVisible(true);
	};

	const quotePackage = async () => {
		// setSelectedPackage(packageSelection);
		setOpen(true);
	};

	const onChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSurgeonForQuoteChange = (newValue: any) => {
		setSelectedSurgeonForQuote(newValue);
	};

	const handleBedCategoryForQuoteChange = (newValue: any) => {
		setSelectedBedCatForQuote(newValue);
	};

	const resetForm = () => {
		setFormData({
			patientName: '',
			patientNo: '',
			consultationFee: 0,
			hospitalFee: 0,
			remarks: '',
		});
		setSelectedSurgeonForQuote(selectedSurgeon);
		setSelectedBedCatForQuote('');
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();
		const res = await addPatient(patientName, patientNo);
		const surgeonId = surgeonObjs.find(
			(item) => item.surgeonName === selectedSurgeonForQuote
		);
		const surgeryId = surgeryObjs.find(
			(item) => item.surgeryName === selectedSurgery
		);

		if (res !== undefined) {
			const updatedQuote = await addQuote(
				res.id,
				surgeonId.id,
				surgeryId.id,
				selectedBedCatForQuote,
				hospitalFee,
				consultationFee,
				0,
				remarks
			);
			console.log(updatedQuote);
			setOpen(false);
		}
	};

	return (
		<div>
			<Header />
			<Grid container direction='row' justifyContent='space-evenly'>
				<Grid item xs={12}>
					<div className='main-container'>
						<div className='card-container-outer'>
							<div className='card-container-header'>SURGERY PACKAGES</div>
							<div className='card-container-inner'>
								<Grid container direction='column' spacing={4}>
									<Grid item>
										<Grid
											container
											direction='row'
											spacing={4}
											justifyContent='center'
										>
											<Grid item xs={4}>
												<Autocomplete
													id='surgeryId'
													options={surgerys.map((surgery) => surgery)}
													onChange={(e, newValue) => {
														handleSurgeryChange(newValue);
													}}
													renderInput={(params) => (
														<TextField
															{...params}
															label='Surgery'
															variant='standard'
															className='select-component'
															size='small'
														/>
													)}
												/>
											</Grid>
											<Grid item xs={4}>
												<Autocomplete
													id='surgeonId'
													options={surgeons.map((surgeon) => surgeon)}
													onChange={(e, newValue) => {
														handleSurgeonChange(newValue);
													}}
													renderInput={(params) => (
														<TextField
															{...params}
															label='Surgeon'
															size='small'
															className='select-component'
															variant='standard'
														/>
													)}
												/>
											</Grid>
											<Grid item xs={4}>
												<button className='search-btn' onClick={searchQuotes}>
													SEARCH
												</button>
											</Grid>
										</Grid>
									</Grid>
									<Grid item>
										{quoteTblVisible ? (
											<TableContainer
												style={{
													maxHeight: '60vh',
													width: '30vw',
													margin: 'auto',
													boxShadow:
														'rgba(46, 46, 46, 0.16) 0px 3px 6px,rgba(59, 58, 58, 0.23) 0px 3px 6px',
												}}
											>
												<Table size='small' stickyHeader>
													<TableHead>
														<TableRow>
															<StyledTableCell>Package</StyledTableCell>
															<StyledTableCell>Bed Category</StyledTableCell>
															<StyledTableCell>Hospital Fee</StyledTableCell>
														</TableRow>
													</TableHead>
													{quotes !== undefined ? (
														quotes.map(
															(quote: {
																packageName: string;
																bedCategory: string;
																hospitalFee: number;
															}) => {
																return (
																	<TableBody>
																		<TableRow>
																			<StyledTableCell>
																				{quote.packageName}
																			</StyledTableCell>
																			<StyledTableCell>
																				{quote.bedCategory}
																			</StyledTableCell>
																			<StyledTableCell>
																				{quote.hospitalFee}
																			</StyledTableCell>
																		</TableRow>
																	</TableBody>
																);
															}
														)
													) : (
														<TableRow>
															<TableCell>No details available</TableCell>
														</TableRow>
													)}
												</Table>
											</TableContainer>
										) : null}
									</Grid>
									{quoteTblVisible &&
									pastRecords !== undefined &&
									pastRecords.length > 0 ? (
										<Grid item>
											<TableContainer
												style={{
													maxHeight: '60vh',
													width: '55vw',
													margin: 'auto',
													boxShadow:
														'rgba(46, 46, 46, 0.16) 0px 3px 6px,rgba(59, 58, 58, 0.23) 0px 3px 6px',
												}}
											>
												<Table size='small' stickyHeader>
													<TableHead>
														<TableRow>
															<StyledTableCell>Surgeon</StyledTableCell>
															<StyledTableCell>Surgery</StyledTableCell>
															<StyledTableCell>Bed Capacity</StyledTableCell>
															<StyledTableCell>Length Of Stay</StyledTableCell>
															<StyledTableCell>Discharged Date</StyledTableCell>
															<StyledTableCell>
																Consultation Fee
															</StyledTableCell>
															<StyledTableCell>Hospital Fee</StyledTableCell>
															<StyledTableCell>Total Fee</StyledTableCell>
														</TableRow>
													</TableHead>
													{pastRecords.map((record: any) => {
														return (
															<TableBody>
																<TableRow>
																	<StyledTableCell>
																		{record.surgeon.surgeonName}
																	</StyledTableCell>
																	<StyledTableCell>
																		{record.surgery.surgeryName}
																	</StyledTableCell>
																	<StyledTableCell>
																		{record.bedCategory}
																	</StyledTableCell>
																	<StyledTableCell>
																		{record.LOS}
																	</StyledTableCell>
																	<StyledTableCell>
																		{new Date(
																			record.dischargeDate
																		).toLocaleDateString()}
																	</StyledTableCell>
																	<StyledTableCell>
																		{record.consultationFee}
																	</StyledTableCell>
																	<StyledTableCell>
																		{record.hospitalFee}
																	</StyledTableCell>
																	<StyledTableCell>
																		{record.consultationFee +
																			record.hospitalFee}
																	</StyledTableCell>
																</TableRow>
															</TableBody>
														);
													})}
												</Table>
											</TableContainer>
										</Grid>
									) : null}
									{quoteTblVisible ? (
										<Grid item>
											<Grid container justifyContent='center'>
												<button
													className='search-btn'
													onClick={() => quotePackage()}
												>
													QUOTE
												</button>
											</Grid>
										</Grid>
									) : null}
								</Grid>
							</div>
						</div>
					</div>
				</Grid>
				{open ? (
					<Grid item xs={4}>
						<div className='main-container'>
							<div className='card-container-outer'>
								<div className='card-container-header'>ADD QUOTE DETAILS</div>
								<div className='card-container-inner'>
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
											style={{ marginTop: '0.7rem', fontSize: '0.5rem' }}
											required
										/>
										<TextField
											name='patientNo'
											label='Patient Mobile No'
											size='small'
											value={patientNo}
											onChange={(e) => onChange(e)}
											style={{ marginTop: '0.7rem', fontSize: '0.5rem' }}
											required
										/>
										<TextField
											name='surgery'
											size='small'
											label='Surgery'
											value={selectedSurgery}
											style={{ marginTop: '0.7rem', fontSize: '0.5rem' }}
											required
											disabled
										/>
										<Autocomplete
											id='surgeonId'
											options={surgeons.map((surgeon) => surgeon)}
											onChange={(e, newValue) =>
												handleSurgeonForQuoteChange(newValue)
											}
											renderInput={(params) => (
												<TextField
													{...params}
													label='Surgeon'
													name='surgeon'
													size='small'
													variant='outlined'
													style={{ marginTop: '0.7rem', fontSize: '0.5rem' }}
													value={selectedSurgeonForQuote}
												/>
											)}
										/>
										<Autocomplete
											id='categoryId'
											options={bedCategorys.map((category) => category)}
											onChange={(e, newValue) =>
												handleBedCategoryForQuoteChange(newValue)
											}
											renderInput={(params) => (
												<TextField
													{...params}
													label='Bed Category'
													name='bedCategory'
													size='small'
													variant='outlined'
													style={{ marginTop: '0.7rem', fontSize: '0.5rem' }}
													value={selectedBedCatForQuote}
												/>
											)}
										/>
										<TextField
											name='consultationFee'
											label='Consultation Fee'
											size='small'
											value={consultationFee}
											onChange={(e) => onChange(e)}
											style={{ marginTop: '0.7rem', fontSize: '0.5rem' }}
											required
										/>
										<TextField
											name='hospitalFee'
											label='Hospital Fee'
											size='small'
											value={hospitalFee}
											onChange={(e) => onChange(e)}
											style={{ marginTop: '0.7rem', fontSize: '0.5rem' }}
											required
										/>
										<TextField
											name='remarks'
											label='Remarks'
											size='small'
											value={remarks.toUpperCase()}
											onChange={(e) => onChange(e)}
											style={{ marginTop: '0.7rem', fontSize: '0.5rem' }}
											required
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
								</div>
							</div>
						</div>
					</Grid>
				) : null}
			</Grid>
		</div>
	);
}

export default MarketingView;
