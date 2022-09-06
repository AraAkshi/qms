import { baseurl } from '../utils/baseUrl';

//Get Records for surgeon and surgery @params - surgeon , surgery
export const getPastRecords = async (surgeon: number, surgery: number) => {
	const response = await fetch(
		baseurl + 'past-records/getRecordsForSurgeonSurgery',
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
