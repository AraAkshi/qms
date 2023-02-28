//Add comma seperators for numbers
export const thousandSeparator = (num: number) => {
	const newNum = num.toString().split(',').join('');
	return newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
