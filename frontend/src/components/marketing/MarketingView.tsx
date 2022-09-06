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
import { updateQuotes } from '../../services/quote';
import { getAllSurgeons } from '../../services/surgeon';
import { getAllSurgerys } from '../../services/surgery';
import Header from '../layout/Header';
import AddPatientDetails from './AddPatientDetails';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 12,
	},
}));

function MarketingView() {
	const [selectedSurgery, setSelectedSurgery] = useState();
	const [selectedSurgeon, setSelectedSurgeon] = useState();
	const [surgerys, setSurgerys] = useState<string[]>([]);
	const [surgeons, setSurgeons] = useState<string[]>([]);
	const [surgeryObjs, setSurgeryObjs] = useState<any[]>([]);
	const [surgeonObjs, setSurgeonObjs] = useState<any[]>([]);
	const [quoteTblVisible, setQuoteTblVisible] = useState<boolean>(false);
	const [selectedPackage, setSelectedPackage] = useState<number>(0);
	const [quotes, setQuotes] = useState<any[]>([]);
	const [open, setOpen] = useState<boolean>(false);

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

		setQuoteTblVisible(true);
	};

	const quotePackage = async (packageSelection: number) => {
		setSelectedPackage(packageSelection);
		setOpen(true);
	};

	return (
		<div>
			<Header />
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
											width: '40vw',
											margin: 'auto',
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
							{quoteTblVisible ? <Grid item></Grid> : null}
						</Grid>
					</div>
				</div>
			</div>
			<AddPatientDetails
				quote={quotes}
				selectedPackage={selectedPackage}
				setOpen={setOpen}
				open={open}
			/>
		</div>
	);
}

export default MarketingView;
