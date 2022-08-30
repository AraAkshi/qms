import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Snackbar } from '@mui/material';

function AlertBar(props) {
	return <Alert elevation={6} variant='filled' {...props} />;
}

const Alerts = (props) => {
	const { alerts } = props;
	console.log(alerts);
	const alert = alerts !== undefined ? true : false;
	const [open, setOpen] = React.useState(alert);
	const handleClose = () => {
		setOpen(false);
	};

	return (
		alerts !== null &&
		alerts !== undefined &&
		alerts.length > 0 &&
		alerts.map((alerts) => (
			<Snackbar
				open={open}
				autoHideDuration={100000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<AlertBar
					onClose={handleClose}
					severity={alerts.alertType === 'danger' ? 'error' : alerts.alertType}
				>
					{alerts.msg}
				</AlertBar>
			</Snackbar>
		))
	);
};

export default Alerts;
