import React, { useEffect, useState } from 'react';
import axios from "axios";

import {
	Paper,
	Box
} from '@mui/material';

import { 
	DataGrid, 
	GridToolbar 
} from '@mui/x-data-grid';

const columns = [
	{ field: 'id', headerName: 'CNPJ', width: 150 },
	{ field: 'razaoSocial', headerName: 'Razão Social', width: 450 },
	{ field: 'uf', headerName: 'UF', width: 80 },
	{ field: 'estado', headerName: 'Estado', width: 120, },
	{ field: 'situacao', headerName: 'Situação', width: 90 }
];

const rows = [
	{ id: 1, uf: 'Snow', razaoSocial: 'Jon', estado: 35 },
	{ id: 2, uf: 'Lannister', razaoSocial: 'Cersei', estado: 42 },
	{ id: 3, uf: 'Lannister', razaoSocial: 'Jaime', estado: 45 },
	{ id: 4, uf: 'Stark', razaoSocial: 'Arya', estado: 16 },
	{ id: 5, uf: 'Targaryen', razaoSocial: 'Daenerys', estado: null },
	{ id: 6, uf: 'Melisandre', razaoSocial: null, estado: 150 },
	{ id: 7, uf: 'Clifford', razaoSocial: 'Ferrara', estado: 44 },
	{ id: 8, uf: 'Frances', razaoSocial: 'Rossini', estado: 36 },
	{ id: 9, uf: 'Roxie', razaoSocial: 'Harvey', estado: 65 },
];

export default function ListarClientes() {
	const [clientes, setClientes] = useState('');

	
	const listarDadosClientes = async () => {
		let arr = [];
		const clientes = await axios.get('http://localhost:8080/clientes');
		clientes.data.map((cliente) =>
			arr.push({
				id: cliente.cnpj,
				estado: cliente.estado,
				razaoSocial: cliente.razao_social,
				situacao: cliente.situacao,
				uf: cliente.uf
			})
		)
		setClientes(arr);
	}

	useEffect(() => {
		listarDadosClientes();

		return setClientes('');
	}, [])

	return (
		<Paper elevation={5} sx={{ mt: 5 }}>
		<Box sx={{ height: 500, p: 2 }}>
			<DataGrid
				rows={clientes.length !== 0 ? clientes : rows}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[10]}
				disableColumnSelector
				components={{ Toolbar: GridToolbar }}
				sx={{
					'& .MuiDataGrid-cell:hover': {
					color: 'primary.main',
				  }
				}}
			/>
		</Box>
	</Paper>
	)
}