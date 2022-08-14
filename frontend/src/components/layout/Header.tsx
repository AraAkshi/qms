import { Grid, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import logo from '../../images/company-logo.png';

function Header() {
	return (
		<Grid container direction='row' justifyContent='space-between'>
			<Grid item>
				<Grid container direction='row'>
					<Grid item>
						<img src={logo} className='logo-img' />
					</Grid>
					<Grid item>
						<div className='main-header'>QUOTATION MANAGEMENT SYSTEM</div>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Grid container direction='row'>
					<Grid item>
						<div className='header-date'>
							Today: {new Date().toDateString()}
						</div>
					</Grid>
					<Grid item>
						{/* <Tooltip title='Settings'> */}
						{/* <IconButton onClick={handleAdmin}>
								<SettingsIcon fontSize='small' />
							</IconButton> */}
						{/* </Tooltip> */}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Header;
