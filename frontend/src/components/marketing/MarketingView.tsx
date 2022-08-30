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
import { getQuotes, updateQuotes } from '../../services/quote';
import { getAllSurgeons } from '../../services/surgeon';
import { getAllSurgerys } from '../../services/surgery';
import Header from '../layout/Header';

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
	const [quoteTblVisible, setQuoteTblVisible] = useState(false);
	const [quote, setQuote] = useState<any>();

	useEffect(() => {
		async function fetchData() {
			const resSurgeons: { id: number; surgeonName: string }[] =
				await getAllSurgeons();
			const resSurgerys: { id: number; surgeryName: string }[] =
				await getAllSurgerys();

			if (resSurgeons !== undefined) {
				setSurgeonObjs(resSurgeons);
				setSurgeons(resSurgeons.map((item) => item.surgeonName));
			}
			if (resSurgerys !== undefined) {
				setSurgeryObjs(resSurgerys);
				setSurgerys(resSurgerys.map((item) => item.surgeryName));
			}
		}
		fetchData();
	}, [0]);

	const handleSurgeryChange = (newValue: any) => {
		setSelectedSurgery(newValue);
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
		const quotes = await getQuotes(
			selectedSurgeonObj.id,
			selectedSurgeryObj.id
		);
		if (quotes !== undefined) setQuote(quotes[quotes.length - 1]);

		setQuoteTblVisible(true);
	};

	const quotePackage = async (quote: any, selectedPackage: string) => {
		const updatedQuote = await updateQuotes(quote.id, selectedPackage);
		window.open(
			window.location.origin + `/marketing/add-patient/${updatedQuote.id}`,
			'_self'
		);
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
													<StyledTableCell>Price</StyledTableCell>
													<StyledTableCell></StyledTableCell>
												</TableRow>
											</TableHead>
											{quote !== undefined && quote !== '' ? (
												<TableBody>
													<TableRow hover={true}>
														<StyledTableCell>Executive 1</StyledTableCell>
														<StyledTableCell>{quote.package1}</StyledTableCell>
														<StyledTableCell>
															<button
																className='search-quote-btn'
																onClick={() => quotePackage(quote, 'package1')}
															>
																QUOTE
															</button>
														</StyledTableCell>
														,
													</TableRow>
													<TableRow hover={true}>
														<StyledTableCell>Executive 2</StyledTableCell>
														<StyledTableCell>{quote.package2}</StyledTableCell>
														<StyledTableCell>
															<button
																className='search-quote-btn'
																onClick={() => quotePackage(quote, 'package2')}
															>
																QUOTE
															</button>
														</StyledTableCell>
													</TableRow>
													<TableRow hover={true}>
														<StyledTableCell>Executive 3</StyledTableCell>
														<StyledTableCell>{quote.package3}</StyledTableCell>
														<StyledTableCell>
															<button
																className='search-quote-btn'
																onClick={() => quotePackage(quote, 'package3')}
															>
																QUOTE
															</button>
														</StyledTableCell>
													</TableRow>
												</TableBody>
											) : (
												<TableRow>
													<TableCell>No details available</TableCell>
												</TableRow>
											)}
										</Table>
									</TableContainer>
								) : null}
							</Grid>
						</Grid>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MarketingView;
