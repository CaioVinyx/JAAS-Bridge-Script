# Explicação do projeto: API de Gerenciamento de Pacientes com Fastify

Este documento foi criado para registrar, de forma didática e organizada, tudo o que foi feito neste projeto. A ideia é explicar o funcionamento de cada parte do código de maneira simples.
## 1. Objetivo do projeto

O projeto implementa uma **API RESTful simples** para gerenciar dados de pacientes. A aplicação permite:

- **Cadastrar** novos pacientes com informações completas (CPF, nome, email, telefone, endereço, etc.);
- **Listar** todos os pacientes cadastrados;
- **Armazenar temporariamente** os dados em memória (estrutura Map);
- **Testar requisições HTTP** sem necessidade de ferramentas externas.

A principal ideia é aprender como uma API funciona na prática, usando o framework **Fastify** com **Node.js**.

## 2. O que foi construído

Até agora, o projeto possui:

- Um servidor web rodando na **porta 3333**;
- **CORS habilitado** para permitir requisições de diferentes origens;
- **Duas rotas implementadas**: POST e GET;
- **Banco de dados em memória** que armazena os dados vindos do POST temporariamente;

---

## 3. Estrutura dos arquivos do projeto

### Arquivo: server.js

Este é o arquivo principal da aplicação. Responsável por criar o servidor Fastify, configurar o CORS, definir as rotas e conectar ao banco de dados em memória.

#### Explicação linha a linha

**Importações:**
```javascript
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabaseMemory } from './database-memory.js'
```
- `fastify`: Framework para criar servidores HTTP rápidos e eficientes em Node.js.
- `@fastify/cors`: Plugin que habilita CORS (Cross-Origin Resource Sharing) para aceitar requisições de outras origens.
- `DatabaseMemory`: Classe personalizada que gerencia o armazenamento de pacientes em memória.

**Criação do servidor e banco:**
```javascript
const server = fastify()
const database = new DatabaseMemory()
```
- `server`: Instância do Fastify que processará as requisições HTTP.
- `database`: Instância do banco de dados onde os pacientes serão armazenados.

**Configuração do CORS:**
```javascript
await server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400
})
```
- `origin: '*'`: Permite requisições de qualquer domínio.
- `methods`: Define quais métodos HTTP são permitidos.
- `allowedHeaders`: Headers que podem ser enviados nas requisições.
- `maxAge: 86400`: CORS é cacheado por 24 horas no navegador.

**Rota POST /pacientes:**
```javascript
server.post('/pacientes', (request, reply) => {
    const {CPF, Name, NameMom, email, Cel, cep, End, NumEnd, ComplementoEnd, CityEnd, StateEnd} = request.body

    database.create({
        CPF: CPF,
        Name: Name,
        NameMom: NameMom,
        email: email,
        Cel: Cel,
        cep: cep,
        End: End,
        NumEnd: NumEnd,
        ComplementoEnd: ComplementoEnd,
        CityEnd: CityEnd,
        StateEnd: StateEnd,
    })

    return reply.status(201).send()
})
```
- Recebe dados do paciente no corpo da requisição (JSON).
- Extrai os campos usando **destructuring** do JavaScript.
- Chama `database.create()` para armazenar o paciente.
- Retorna status **201 (Created)** indicando sucesso.

**Dados esperados no POST:**
- `CPF`: Cadastro de Pessoa Física
- `Name`: Nome do paciente
- `NameMom`: Nome da mãe
- `email`: Email
- `Cel`: Celular/Telefone
- `cep`: Código de Endereço Postal
- `End`: Endereço (rua)
- `NumEnd`: Número do endereço
- `ComplementoEnd`: Complemento (apto, bloco, etc.)
- `CityEnd`: Cidade
- `StateEnd`: Estado (UF)

**Rota GET /pacientes:**
```javascript
server.get('/pacientes', (request, reply) => {
    const listPacientes = database.list();
    return reply.status(200).send(listPacientes)
})
```
- Recupera a lista de todos os pacientes.
- Chama `database.list()` que retorna um array com todos os registros.
- Retorna status **200 (OK)** com a lista em JSON.

**Inicialização do servidor:**
```javascript
server.listen({
    port: 3333,
})
```
- Faz o servidor ficar escutando na porta **3333**.
- O servidor estará acessível em `http://localhost:3333`.

#### Resumo da lógica

O arquivo `server.js` é o **"coração"** da aplicação porque:
- Monta e configura o servidor Fastify;
- Define as rotas da API;
- Conecta as rotas ao banco de dados;
- Responde aos pedidos dos clientes;
- Gerencia o protocolo CORS.

---

### Arquivo: database-memory.js

Representa o banco de dados em memória do projeto. Armazena os pacientes temporariamente usando uma estrutura Map (mapa de chave-valor).

#### Explicação linha a linha

**Importação:**
```javascript
import { randomUUID } from "node:crypto"
```
- Importa a função `randomUUID` do módulo nativo `crypto`.
- Gera identificadores únicos universais (UUID v4) para cada paciente.

**Declaração da classe:**
```javascript
export class DatabaseMemory{
    #pacientes = new Map()
    ...
}
```
- `export`: Permite que a classe seja importada em outros arquivos.
- `#pacientes = new Map()`: Cria um Map privado (o símbolo `#` torna a variável privada).
- Um Map funciona como um dicionário: armazena pares de chave-valor.

**Método create():**
```javascript
create(paciente){
    const pacienteID = randomUUID()
    this.#pacientes.set(pacienteID, paciente)
}
```
- Recebe um objeto `paciente` com os dados a serem salvos.
- Gera um UUID único como identificador.
- Armazena o paciente no Map usando o UUID como chave.

**Método list():**
```javascript
list(){
    return Array.from(this.#pacientes.entries()).map((pacienteArray) => {
        const id = pacienteArray [0]
        const data = pacienteArray [1]

        return{
            id,
            ...data
        }
    })
}
```
- `this.#pacientes.entries()`: Pega todos os pares [chave, valor] do Map.
- `Array.from()`: Converte o resultado em um array.
- `.map()`: Transforma cada entrada, separando ID e dados.
- Usa **spread operator** (`...data`) para incluir os dados do paciente no objeto retornado.
- Retorna um array de objetos com este formato:
```json
[
  {
    "id": "uuid-único",
    "CPF": "123.456.789-00",
    "Name": "João Silva",
    ...
  }
]
```

#### Resumo da lógica

O arquivo `database-memory.js` funciona como um **banco de dados temporário**:
- Dados são armazenados apenas enquanto o servidor está rodando.
- Quando o servidor reinicia, os dados são perdidos (estrutura em memória).
- Perfeito para aprender CRUD (Create, Read) sem complexidade de um banco real.
- Futuramente pode ser substituído por PostgreSQL, MongoDB, MySQL, etc.

---

### Arquivo: routes.http

Arquivo que contém **exemplos de requisições HTTP** para testar a API. Pode ser usado com extensões do VS Code ou ferramentas como Insomnia/Postman.

#### Requisições implementadas

**1. POST - Criar um paciente:**
```http
POST http://localhost:3333/pacientes
Content-Type: application/json
```
- Envia dados de um novo paciente.
- O corpo da requisição contém um JSON com os dados.
- Resposta esperada: Status 201 (Created).

**2. GET - Listar todos os pacientes:**
```http
GET http://localhost:3333/pacientes
Content-Type: application/json
```
- Busca a lista de todos os pacientes cadastrados.
- Resposta esperada: Status 200 (OK) com array JSON.

#### Como usar o arquivo

Com a extensão **REST Client** do VS Code:
1. Coloque o cursor na linha da requisição desejada.
2. Clique em "Send Request" que aparece acima da requisição.
3. A resposta aparecerá em um painel lateral.

---

### Arquivo: package.json

Define o projeto como um pacote Node.js e lista as dependências necessárias.

#### Conteúdo esperado

- `name`: Nome do projeto (ex: "api-pacientes")
- `version`: Versão inicial (ex: "1.0.0")
- `type`: Tipo de módulo (`"module"` para usar `import/export`)
- `dependencies`: 
  - `fastify`: Framework HTTP principal
  - `@fastify/cors`: Plugin de CORS

#### Instalação de dependências

Para instalar as dependências do projeto:
```bash
npm install
```

---

## 4. Como executar o projeto

**Pré-requisitos:**
- Node.js instalado (versão 16+)
- Pasta do projeto com os arquivos mencionados

**Passos:**

1. Abra um terminal na pasta do projeto.

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
node server.js
```

4. O servidor estará rodando em:
```
http://localhost:3333
```

---

## 5. Fluxo de funcionamento

### Quando um cliente faz uma requisição POST

1. Cliente envia dados do paciente em JSON para `/pacientes`;
2. `server.post()` recebe a requisição;
3. Extrai os dados do corpo (`request.body`);
4. Chama `database.create()` com os dados;
5. `database-memory.js` gera um UUID e armazena no Map;
6. Servidor retorna status 201 para o cliente.

### Quando um cliente faz uma requisição GET

1. Cliente solicita `/pacientes`;
2. `server.get()` recebe a requisição;
3. Chama `database.list()` para recuperar dados;
4. `database-memory.js` converte o Map em um array com IDs;
5. Servidor retorna status 200 com o array JSON.

---

## 6. Conceitos-chave aprendidos

- **API RESTful**: Interface para comunicação entre aplicações.
- **HTTP Methods**: GET (buscar), POST (criar), PUT (atualizar), DELETE (apagar).
- **Status Codes**: 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found), etc.
- **JSON**: Formato de troca de dados entre cliente e servidor.
- **CORS**: Mecanismo de segurança que permite requisições entre domínios.
- **Map**: Estrutura de dados chave-valor do JavaScript.
- **UUID**: Identificador único universal para cada registro.
- **Fastify**: Framework leve e rápido para servidores Node.js.


## 7. Dúvidas frequentes

**P: Por que os dados desaparecem quando reinicio o servidor?**
R: Porque usamos um Map em memória. Os dados existem apenas enquanto o aplicativo está rodando.

**P: Como conectar a um banco de dados real?**
R: Seria necessário instalar um driver (como `pg` para PostgreSQL ou `mongoose` para MongoDB) e substituir os métodos da classe `DatabaseMemory`.

**P: Posso usar essa API de outro computador?**
R: Sim, mudando `localhost` para o IP da máquina onde o servidor está rodando.

**P: Como adicionar novas rotas?**
R: Adicione novas chamadas `server.get()`, `server.post()`, etc. antes do `server.listen()`.

---
