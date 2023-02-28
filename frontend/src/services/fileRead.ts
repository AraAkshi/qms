import * as XLSX from 'xlsx';

//Promise to read async
export const readFileAsync = async (f: Blob | undefined, sheetid: string) => {
	return new Promise((resolve, reject) => {
		let reader = new FileReader();

		reader.onload = async (e: any) => {
			const data = e.target.result;
			const resData = XLSX.read(data, { type: 'binary' });
			//  const wsname = readedData.SheetNames[sheetid];
			const ws = resData.Sheets[sheetid];
			const dataParse = XLSX.utils.sheet_to_json(ws, {
				raw: true,
				range: 0,
				header: 0,
				defval: '',
			});
			resolve(dataParse);
		};
		if (f !== undefined) {
			reader.readAsBinaryString(f);
		}
	});
};
