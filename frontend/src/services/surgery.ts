import { baseurl } from '../utils/baseUrl';

//Get all surgeries
export const getAllSurgerys = async () => {
	const response = await fetch(baseurl + 'surgery/getAll', {
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
};

//Add New Surgery
export const addSurgery = async (surgeryName: string) => {
	{
		const response = await fetch(baseurl + 'surgery/add', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				// Authorization: token,
			},
			body: JSON.stringify({ surgeryName }),
		});
		if (response.status === 200 || response.status === 201) {
			const data = await response.json();
			return data;
		}
	}
};
