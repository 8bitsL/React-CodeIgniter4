import React, { useState } from 'react';
import {
	Box,
	TextField,
	InputAdornment,
	FormControl,
	InputLabel,
	IconButton,
	OutlinedInput,
	Tooltip,
	Paper,
	MenuItem,
	Button,
	Snackbar,
	Alert
} from '@mui/material';

import fetchJsonp from "fetch-jsonp";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from "axios"

export default function CadastrarCliente() {
	const [cnpj, setCnpj] = useState('')
	const [uf, setUf] = useState('');
	const [situacao, setSituacao] = useState(1);
	const [razaoSocial, setRazaoSocial] = useState('');
	const [estado, setEstado] = useState('');
	const [chamaAlerta, setChamaAlerta]= useState({})

	const alteraCNPJ = (e) => {
		setCnpj(e.target.value);
	}

	const alteraUf = (e) => {
		setUf(e.target.value);
		const pesquisarEstado = estados.find(element => element.label === e.target.value)
		setEstado(pesquisarEstado.value)

		setSituacao(e.target.value === 'SP' ? '0' : situacao);

	}

	const alteraSituacao = (e) => {
		setSituacao(e.target.value);
	}

	const alteraRazaoSocial = (e) => {
		setRazaoSocial(e.target.value);
	}

	const pegaDadosCNPJ = () => {
		fetchJsonp(`https://receitaws.com.br/v1/cnpj/${cnpj}`, {
			jsonpCallback: "callback"
		})
			.then((res) => res.json())
			.then((data) => {
				setUf(data.uf);
				setRazaoSocial(data.nome);
				if (data.uf === 'SP') {
					setSituacao(0)
				} else {
					setSituacao(data.situacao === 'ATIVA' ? 1 : 0)
				}
				const pesquisarEstado = estados.find(element => element.label === data.uf)
				setEstado(pesquisarEstado.value)

			});
	}

	const adicionarCliente = async () => {
		const response = await axios.post('http://localhost:8080/clientes/create', {
			cnpj: cnpj,
			razao_social: razaoSocial,
			uf: uf,
			estado: estado,
			situacao: situacao
		})
		console.log(response)
		if(response.status === 201){
			setChamaAlerta({
				open: true,
				severity: 'success',
				message: response.data.messages.success
			});
		}else{
			setChamaAlerta({
				open: true,
				severity: 'error',
				message: 'Erro ao cadastrar usuario'
			});
		}
	}

	const cancelar = () => {
		setCnpj('');
		setUf('');
		setSituacao('');
		setRazaoSocial('');
		setEstado('');
	}
	

	return (
		<>
		<Paper sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 5, p: 2 }} elevation={5}>
			<Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2, width: '30%' }}>
					<FormControl variant="outlined">
						<InputLabel >CNPJ</InputLabel>
						<OutlinedInput
							value={cnpj}
							onChange={alteraCNPJ}
							endAdornment={
								<InputAdornment position="end">
									<Tooltip title="Clique aqui para preencher os dados automaticamente" arrow>
										<IconButton
											onClick={pegaDadosCNPJ}
											edge="end"
										>
											<CheckCircleOutlineIcon color="primary" />
										</IconButton>
									</Tooltip>
								</InputAdornment>
							}
							label="CNPJ "
						/>
							
					</FormControl>

					<TextField
						label="Situação"
						select
						value={situacao}
						onChange={alteraSituacao}
					>
						{situacaoCliente.map((situacao) =>
							<MenuItem key={situacao.value} value={situacao.value}>
								{situacao.label}
							</MenuItem>
						)}
					</TextField>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2, width: '30%' }}>

					<TextField
						label="UF"
						select
						value={uf}
						onChange={alteraUf}
					>
						{estados.map((estado) =>
							<MenuItem key={estado.label} value={estado.label}>
								{estado.label}
							</MenuItem>
						)}
					</TextField>

					<TextField
						label="Estado"
						value={estado}
						InputProps={{
							readOnly: true,
						}}
					/>
				</Box>
			</Box>

			<TextField
				fullWidth
				label="Razão Social"
				value={razaoSocial}
				onChange={alteraRazaoSocial}
			/>

			<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, width: '100%' }}>
				<Button color="primary" variant="outlined" onClick={adicionarCliente} disabled={cnpj.length < 14 || cnpj.length > 14}>Cadastrar</Button>
				<Button color="error" variant="outlined" onClick={cancelar}>Cancelar</Button>
			</Box>

		</Paper>
		{chamaAlerta.open &&
			<Alerta open={chamaAlerta.open} severity={chamaAlerta.severity} menssagem={chamaAlerta.message} />
		}
		</>

	)
}

const Alerta = (props) => {
	const [open, setOpen] = useState(props.open)
	return (
		<Snackbar open={open} autoHideDuration={5000} onClose={()=>setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right'}}> 
			<Alert onClose={()=>setOpen(false)} severity={props.severity} sx={{ width: '100%' }}>
				{props.menssagem}
			</Alert>
		</Snackbar>

	)
}

const situacaoCliente = [
	{
		value: '1',
		label: 'ATIVA'
	},
	{
		value: '0',
		label: 'INATIVA'
	}
]

const estados = [
	{
		value: 'Acre',
		label: 'AC'
	},
	{
		value: 'Alagoas',
		label: 'AL'
	},
	{
		value: 'Amazonas',
		label: 'AM'
	},
	{
		value: 'Amapá',
		label: 'AP'
	},
	{
		value: 'Bahia',
		label: 'BA'
	},
	{
		value: 'Ceará',
		label: 'CE'
	},
	{
		value: 'Distrito Federal',
		label: 'DF'
	},
	{
		value: 'Espírito Santo',
		label: 'ES'
	},
	{
		value: 'Goiás',
		label: 'GO'
	},
	{
		value: 'Maranhão',
		label: 'MA'
	},
	{
		value: 'Mato Grosso',
		label: 'MT'
	},
	{
		value: 'Mato Grosso do Sul',
		label: 'MS'
	},
	{
		value: 'Minas Gerais',
		label: 'MG'
	},
	{
		value: 'Pará',
		label: 'PA'
	},
	{
		value: 'Paraíba',
		label: 'PB'
	},
	{
		value: 'Pernambuco',
		label: 'PE'
	},
	{
		value: 'Piauí',
		label: 'PI'
	},
	{
		value: 'Rio de Janeiro',
		label: 'RJ'
	},
	{
		value: 'Rio Grande do Norte',
		label: 'RN'
	},
	{
		value: 'Rondônia',
		label: 'RO'
	},
	{
		value: 'Rio Grande do Sul',
		label: 'RS'
	},
	{
		value: 'Roraima',
		label: 'RR'
	},
	{
		value: 'Santa Catarina',
		label: 'SC'
	},
	{
		value: 'Sergipe',
		label: 'SE'
	},
	{
		value: 'São Paulo',
		label: 'SP'
	},
	{
		value: 'Tocantins',
		label: 'TO'
	},
]


