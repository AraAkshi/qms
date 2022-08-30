import { baseurl } from '../utils/baseUrl';

//Update quote with quote details
export const updateQuotes = async (id: number, selectedPackage: string) => {
	const response = await fetch(baseurl + 'quote/edit', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// Authorization: token,
		},
		body: JSON.stringify({
			id,
			selectedPackage,
		}),
	});

	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Update quote with patient details
export const updateQuotesWithPatient = async (id: any, patient: any) => {
	const response = await fetch(baseurl + 'quote/edit', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// Authorization: token,
		},
		body: JSON.stringify({
			id,
			patient,
		}),
	});

	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

export const addQuote = async (
	patient: any,
	surgeon: any,
	surgery: any,
	actualPrice: number,
	isAdmitted: boolean,
	selectedPackage: number
) => {
	const response = await fetch(baseurl + 'quote/add', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// Authorization: token,
		},
		body: JSON.stringify({
			patient,
			surgeon,
			surgery,
			actualPrice,
			isAdmitted,
			selectedPackage,
		}),
	});

	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};
