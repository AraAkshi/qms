import { baseurl } from '../utils/baseUrl';

//Get all surgeeons
export const getAllSurgeons = async () => {
	const response = await fetch(baseurl + 'surgeon/getAll', {
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

//Add New Surgeon
export const addSurgeon = async (surgeonName: string) => {
	{
		const response = await fetch(baseurl + 'surgeon/add', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				// Authorization: token,
			},
			body: JSON.stringify({ surgeonName }),
		});
		if (response.status === 200 || response.status === 201) {
			const data = await response.json();
			return data;
		}
	}
};
