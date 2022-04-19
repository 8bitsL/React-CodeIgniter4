<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ClienteModel;

class Clientes extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
	use ResponseTrait;
    public function index()
    {
        $model = new ClienteModel();
		$data = $model->findAll();
		return $this->respond($data);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($cnpj = null)
    {
        $model = new ClienteModel();
		$data = $model->find(['cnpj' => $cnpj]);
		if(!$data) return $this->failNotFound('Nenhum usuario encontrado');
		return $this->respond($data[0]);
    }

    /**
     * Return a new resource object, with default properties
     *
     * @return mixed
     */
    public function new()
    {
        //
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        helper(['form']);
		$rules = [
			'cnpj' => 'required',
			'razao_social' => 'required',
			'uf' => 'required',
			'estado' => 'required',
			'situacao' => 'required',
		];

		$data = [
			'cnpj' => $this->request->getVar('cnpj'),
			'razao_social' => $this->request->getVar('razao_social'),
			'uf' => $this->request->getVar('uf'),
			'estado' => $this->request->getVar('estado'),
			'situacao' => $this->request->getVar('situacao')
		];
		if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());
		$model = new ClienteModel();
		$model->save($data);
		$response = [
			'status' => 201,
			'error' => null,
            'messages' => [
                'success' => 'Usuario cadastrado com sucesso'
			]
		];
		return $this->respondCreated($response);
    }

	public function filtro()
	{
		echo 'teste';
	}

    /**
     * Return the editable properties of a resource object
     *
     * @return mixed
     */
    public function edit($id = null)
    {
        //
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        //
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        //
    }
}
