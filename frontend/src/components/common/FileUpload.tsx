import { useState } from 'react';
import ExcelJS from 'exceljs';
import { readFileAsync } from '../../services/fileRead';
import { Button, CircularProgress, Grid } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PublishIcon from '@mui/icons-material/Publish';
import _ from 'lodash';
import { getAllSurgeons, addSurgeon } from '../../services/surgeon';
import { getAllSurgerys, addSurgery } from '../../services/surgery';
import {
	addPackage,
	editPackage,
	getAllPackages,
} from '../../services/package';

function FileUpload() {
	const [File, setFile] = useState<Blob | undefined>();
	const [isBtnHovered, setisBtnHovered] = useState<boolean>(false);
	const [Sheets, setSheets] = useState<any[]>([]);
	const [Loading, setLoading] = useState<number>(0);

	const setHoverState = () => {
		setisBtnHovered(isBtnHovered ? false : true);
	};

	const onFileUpload = (e: any) => {
		setLoading(2);
		//Get sheets from workbook
		const wb = new ExcelJS.Workbook();
		const reader = new FileReader();
		let sheetName: { id: number; name: string };
		const sheetlist: { id: number; name: string }[] = [];

		setFile(e.target.files[0]);
		reader.readAsArrayBuffer(e.target.files[0]);
		reader.onload = async () => {
			const buffer: any = reader.result;
			await wb.xlsx.load(buffer).then((workbook: any) => {
				workbook.eachSheet((sheet: any, id: number) => {
					sheetName = { id: id - 1, name: sheet.name };
					sheetlist.push(sheetName);
				});
				setSheets(sheetlist);
				setLoading(3);
			});
		};
	};

	const readFile = async () => {
		//read File and get dataset
		if (Sheets[0] !== '') {
			setLoading(4);
			addDataToDB(await readFileAsync(File, 'Sheet1'));
			setLoading(5);
		}
	};

	const addDataToDB = async (dataset: any) => {
		const surgeonsInDB = await getAllSurgeons();
		const surgerysInDB = await getAllSurgerys();
		const packagesInDB = await getAllPackages();

		for (let datasetIndex = 0; datasetIndex < dataset.length; datasetIndex++) {
			const dataLine = dataset[datasetIndex];

			//Check and add surgeons if any new is present
			const surgeonInDB = surgeonsInDB.find(
				(record: any) =>
					record.surgeonName.toUpperCase() === dataLine.Surgeon.toUpperCase()
			);
			const surgeonId =
				surgeonInDB !== undefined
					? surgeonInDB.id
					: (await addSurgeon(dataLine.Surgeon.toUpperCase())).id;

			//Check and add surgerys if any new is present
			const surgeryInDB = surgerysInDB.find(
				(record: any) =>
					record.surgeryName.toUpperCase() === dataLine.Surgery.toUpperCase()
			);
			const surgeryId =
				surgeryInDB !== undefined
					? surgeryInDB.id
					: (await addSurgery(dataLine.Surgery.toUpperCase())).id;

			//Add New Quote Details
			const packageInDB = packagesInDB.find(
				(record: any) =>
					record.surgeon.id === surgeonId && record.surgery.id === surgeryId
			);
			if (packageInDB !== undefined) {
				await editPackage(
					surgeonId,
					surgeryId,
					dataLine.Surgery,
					dataLine[' Hospital Fee '],
					dataLine[' Counsultant Fee '],
					packageInDB.id
				);
			} else {
				await addPackage(
					surgeonId,
					surgeryId,
					dataLine.Surgery,
					dataLine[' Hospital Fee '],
					dataLine[' Counsultant Fee ']
				);
			}
		}
	};

	return (
		<div>
			<Grid container direction='row' justifyContent='center' spacing={3}>
				<Grid item>
					<Grid container justifyContent='center'>
						<label htmlFor='quotation'>
							<input
								style={{ display: 'none' }}
								id='quotation'
								type='file'
								onChange={(e) => onFileUpload(e)}
							/>
							<Button
								variant='contained'
								size='small'
								style={{
									width: '14vw',
									backgroundColor: '#414040',
									color: '#fff',
								}}
								component='span'
								endIcon={
									Loading === 2 ? (
										<CircularProgress size='1rem' />
									) : Loading === 3 || Loading === 4 || Loading === 5 ? (
										<CheckCircleOutlineIcon />
									) : (
										<PublishIcon fontSize='small' />
									)
								}
							>
								Upload File
							</Button>
						</label>
					</Grid>
				</Grid>
				<Grid item>
					<Button
						variant='contained'
						size='small'
						style={{
							backgroundColor: isBtnHovered ? '#494949' : '#3c3c3d',
							color: '#fff',
						}}
						onMouseEnter={() => setHoverState()}
						onMouseLeave={() => setHoverState()}
						onClick={() => readFile()}
						endIcon={
							Loading === 4 ? (
								<CircularProgress size='1rem' />
							) : Loading === 5 ? (
								<CheckCircleOutlineIcon />
							) : (
								true
							)
						}
					>
						Save Data
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}

export default FileUpload;
