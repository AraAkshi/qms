import { baseurl } from '../utils/baseUrl';

//Add New Patient
export const addPatient = async (patientName: string, patientNo: any) => {
	{
		const response = await fetch(baseurl + 'patient/add', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				// Authorization: token,
			},
			body: JSON.stringify({ patientName, patientNo }),
		});
		if (response.status === 200 || response.status === 201) {
			const data = await response.json();
			return data;
		}
	}
};

//Get all patients
export const getAllPatients = async () => {
	{
		const response = await fetch(baseurl + 'patient/getAll', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				// Authorization: token,
			},
		});
		if (response.status === 200 || response.status === 201) {
			const data = await response.json();
			return data;
		}
	}
};
