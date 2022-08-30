import { baseurl } from '../utils/baseUrl';

//Get Quote for surgeon and surgery @params - surgeon , surgery
export const getQuotes = async (surgeon: any, surgery: any) => {
	const response = await fetch(baseurl + 'appointment/getCustomerApp', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// Authorization: token,
		},
		body: JSON.stringify({
			surgeon,
			surgery,
		}),
	});
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};
