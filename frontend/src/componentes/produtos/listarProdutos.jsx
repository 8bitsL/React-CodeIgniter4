import React, { useEffect, useState } from 'react';
import { 
	DataGrid, 
	GridToolbar 
} from '@mui/x-data-grid';

import axios from "axios";

import {
	Box,
	Paper
} from '@mui/material'

const columns = [
	{ field: 'id', headerName: 'Código', width: 90 },
	{ field: 'descricao', headerName: 'Descrição', width: 550 },
	{ field: 'marca', headerName: 'Marca', width: 120 },
	{ field: 'preco', headerName: 'Preço', width: 120, }
];

const rows = [
	{ id: 1, marca: 'Snow', descricao: 'Jon', preco: 35 },
	{ id: 2, marca: 'Lannister', descricao: 'Cersei', preco: 42 },
	{ id: 3, marca: 'Lannister', descricao: 'Jaime', preco: 45 },
	{ id: 4, marca: 'Stark', descricao: 'Arya', preco: 16 },
	{ id: 5, marca: 'Targaryen', descricao: 'Daenerys', preco: null },
	{ id: 6, marca: 'Melisandre', descricao: null, preco: 150 },
	{ id: 7, marca: 'Clifford', descricao: 'Ferrara', preco: 44 },
	{ id: 8, marca: 'Frances', descricao: 'Rossini', preco: 36 },
	{ id: 9, marca: 'Roxie', descricao: 'Harvey', preco: 65 },
];


export default function ListarProdutos() {
	const [produtos, setProdutos] = useState('');

	const listarProdutos = async () => {
		let arr = [];
		const resultado = await axios.get('http://localhost:8080/produtos');

		resultado.data.map((produto) =>
			arr.push({
				id: produto.codigo,
				marca: produto.marca,
				descricao: produto.descricao,
				preco: produto.preco
			})
		)

		setProdutos(arr);
	}

	useEffect(() => {
		listarProdutos();

		return setProdutos('');
	}, [])

	return (
		<Paper elevation={5} sx={{ mt: 5 }}>
			<Box sx={{ height: 500, p: 2 }}>
				<DataGrid
					rows={produtos.length !== 0 ? produtos : rows}
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
	);
}