import React from 'react';

import {
	Box,
	Paper,
	Typography 
}from '@mui/material';
export default function Home(){
	return(

			<Paper elevation={10} sx={{display: 'flex', flexDirection: 'column', mt: 5}}>
				<Box sx={{display:'flex',justifyContent:'center', p: 2, bgcolor: '#ebebeb'}}>
					<Typography component="div" variant='h6'>React + CodeIgniter 4</Typography>
				</Box>
				<Box sx={{display: 'flex', alignItems:'center', flexDirection: 'column', mt: 2, mb: 2}}>
					<Typography component="div" variant='body1'>Código feito por Leonardo Fernandes</Typography>
					<Typography component="div" variant='body1'>Tecnologias utilizadas:</Typography>
					<Typography component="div" variant='body2'>Backend: CodeIgniter 4</Typography>
					<Typography component="div" variant='body2'>Frontend: React</Typography>
					<Typography component="div" variant='body2'>Interface: MaterialUI</Typography>
				</Box>
				<Box sx={{display:'flex',justifyContent:'center', p: 2, bgcolor: '#ebebeb'}}>
					<Typography component="div" variant='h6'>Desenvolvido por Leonardo Fernandes®</Typography>
				</Box>
			</Paper>
		
	)
}