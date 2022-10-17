Introdução 
----------

Projeto de API RESTful construída em Node.js para cadastro de veículos, conectado a um banco de dados no-SQL MongoDB através de ODM Mongoose e escrito em TypeScript.

O projeto possui estruturação em camadas (Model, Service, Controller) desenvolvidas com classes abstratas, utilizando os princípios da programação orientada a objetos para garantir fácil escalabilidade e a biblioteca Zod para validação de schemas.
As valida

Os testes unitários das camadas foram desenvolvidos com o uso de Mocha, Chai e Sinon.

Todos os commits estão no padrão Conventional Commits.

Este projeto foi desenvolvido durante a formação Web Full Stack da Trybe.

Instalação
----------

Instalar as dependências:

```bash
npm install
```
Para fazer a conexão com o banco, crie um arquivo .env na pasta raíz do projeto no seguinte modelo, substituindo os valores pelos seus dados:

```
MONGO_URI=seumongoURI
```
Ou utilize endereço padrão fornecido:
```
mongodb://localhost:27017/CarShop
```
Para iniciar a aplicação:
---------------

```bash
npm run dev
```

Funcionalidades:
---------------
A API permite ler, criar, editar e apagar carros e motos do banco, utilizando as seguintes estruturas:

Carros:
```json
{
	"model": "DMC DeLorean",
	"year": 1981,
	"color": "Silver",
	"buyValue": 3500,
	"seatsQty": 2,
	"doorsQty": 2	
}
```
Motos:
```json
{
	"model": "Bat Bike",
	"year": 2021,
	"color": "Black",
	"buyValue": 3500,
	"category": "Custom",
	"engineCapacity": 2	
}
```
As opções de categorias para motos são: Street, Custom e Trail.

* Para listar todos os veículos, faça uma requisição do tipo **GET** para o endpoint `/cars` para **Carros**, ou `/motorcycles` para **Motos**.

* Para criar um novo veículo, faça uma requisição do tipo **POST** para o endpoint `/cars` para **Carros**, ou `/motorcycles` para **Motos**, com todas as informações necessárias.

* Para editar um item, faça uma requisição do tipo **PUT** para o endpoint `/cars/id` para **Carros**, ou `/motorcycles/id` para **Motos**, fornecendo o id do veículo no endpoint.

* Para deletar um veículo, faça uma requisição do tipo **DELETE** para o endpoint `/cars/id` para **Carros**, ou `/motorcycles/id` para **Motos**, fornecendo o id do veículo no endpoint.

Testes
----------
Para rodar os testes unitários:
```bash
npm test
```
Para rodar os testes com informações sobre a cobertura:
```bash
npm run test:coverage
```


