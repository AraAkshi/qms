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
import { AnyARecord } from 'dns';
import React, { useEffect, useState } from 'react';
import { isTemplateExpression } from 'typescript';
import { getQuotes } from '../../services/quote';
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
	const [quoteTblVisible, setQuoteTblVisible] = useState(false);
	const [quote, setQuote] = useState<any>();

	useEffect(() => {
		async function fetchData() {
			const resSurgeons: { id: number; surgeonName: string }[] =
				await getAllSurgeons();
			const resSurgerys: { id: number; surgeryName: string }[] =
				await getAllSurgerys();

			if (resSurgeons !== undefined)
				setSurgeons(resSurgeons.map((item) => item.surgeonName));
			if (resSurgerys !== undefined)
				setSurgerys(resSurgerys.map((item) => item.surgeryName));
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
		const quotes = await getQuotes(selectedSurgeon, selectedSurgery);
		console.log(quotes);
	};

	const quotePackage = (quote: any) => {
		console.log(quote);
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
								<TableContainer style={{ maxHeight: '60vh' }}>
									<Table size='small' stickyHeader>
										<TableHead>
											<TableRow>
												<StyledTableCell>Package</StyledTableCell>
												<StyledTableCell>Price</StyledTableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{quote !== undefined && quote !== '' ? (
												<TableRow hover={true}>
													<StyledTableCell>Executive 1</StyledTableCell>
													<StyledTableCell>{quote.package1}</StyledTableCell>
													<StyledTableCell>
														<button
															className='search-btn'
															onClick={() => quotePackage(quote.id)}
														>
															QUOTE
														</button>
													</StyledTableCell>
												</TableRow>
											) : (
												<TableRow>
													<TableCell>No details available</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</TableContainer>
							</Grid>
						</Grid>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MarketingView;
