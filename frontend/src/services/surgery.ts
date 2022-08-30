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
