import React from 'react';

import {
	Box,
	Tab
} from '@mui/material'

import {
	TabContext,
	TabList,
	TabPanel
} from '@mui/lab'
import ListarClientes from './clientes/listarClientes';
import CadastrarCliente from './clientes/cadastrarCliente';
import ListarProdutos from './produtos/listarProdutos';
import Home from './home'

export default function MostrarConteudo() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
	  
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center'}}>

          <TabList onChange={handleChange} aria-label="lab API tabs example" >
            <Tab label="Home" value="1" />
            <Tab label="Cadastrar Cliente" value="2" />
            <Tab label="Listar Cliente" value="3" />
            <Tab label="Listar Produto" value="4" />
          </TabList>
        </Box>

		<Box sx={{display: 'flex', justifyContent:'center'}}>
			<TabPanel value="1" sx={{width: '50%'}}><Home/></TabPanel>
			<TabPanel value="2" sx={{width: '50%'}}><CadastrarCliente/></TabPanel>
			<TabPanel value="3" sx={{width: '50%'}}><ListarClientes/></TabPanel>
			<TabPanel value="4" sx={{width: '50%'}}><ListarProdutos/></TabPanel>
		</Box>
      </TabContext>
	  
  );
}