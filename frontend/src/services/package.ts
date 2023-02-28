import { baseurl } from '../utils/baseUrl';

//Get all packages
export const getAllPackages = async () => {
	const response = await fetch(baseurl + 'package/getAll', {
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

//Get Package for surgeon and surgery @params - surgeon , surgery
export const getQuotes = async (surgeon: number, surgery: number) => {
	const response = await fetch(
		baseurl + 'package/getPackagesForSurgeonSurgery',
		{
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
		}
	);
	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Get surgeons for surgery @params - surgery
export const getSurgeonsForSurgery = async (surgery: number) => {
	const response = await fetch(baseurl + 'package/getSurgeonsForSurgery', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// Authorization: token,
		},
		body: JSON.stringify({
			surgery,
		}),
	});

	if (response.status === 200 || response.status === 201) {
		const data = await response.json();
		return data;
	}
};

//Add New Package
export const addPackage = async (
	surgeon: any,
	surgery: any,
	packageName: string,
	hospitalFee: number,
	consultantFee: number
) => {
	{
		const response = await fetch(baseurl + 'package/add', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				// Authorization: token,
			},
			body: JSON.stringify({
				surgeon,
				surgery,
				packageName,
				hospitalFee,
				consultantFee,
			}),
		});
		if (response.status === 200 || response.status === 201) {
			const data = await response.json();
			return data;
		}
	}
};

//Edit Package
export const editPackage = async (
	surgeon: any,
	surgery: any,
	packageName: string,
	hospitalFee: number,
	consultantFee: number,
	id: number
) => {
	{
		const response = await fetch(baseurl + 'package/add', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				// Authorization: token,
			},
			body: JSON.stringify({
				surgeon,
				surgery,
				packageName,
				hospitalFee,
				consultantFee,
				id,
			}),
		});
		if (response.status === 200 || response.status === 201) {
			const data = await response.json();
			return data;
		}
	}
};
