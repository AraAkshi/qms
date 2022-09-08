import { baseurl } from '../utils/baseUrl';

//Update quote with quote details
export const updateQuotes = async (id: number, isAdmitted: boolean) => {
	const response = await fetch(baseurl + 'quote/edit', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// Authorization: token,
		},
		body: JSON.stringify({
			id,
			isAdmitted,
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

//Add new quote
export const addQuote = async (
	patient: any,
	surgeon: any,
	surgery: any,
	bedCategory: string,
	hospitalFee: number,
	consultationFee: number,
	actualPrice: number,
	remark: string
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
			bedCategory,
			hospitalFee,
			consultationFee,
			remark,
		}),
	});

	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Get Quote details for patient @params -> patientId
export const getQuotesForPatient = async (patient: any) => {
	const response = await fetch(baseurl + 'quote/getQuoteForPatient', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// Authorization: token,
		},
		body: JSON.stringify({
			patient,
		}),
	});

	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};
