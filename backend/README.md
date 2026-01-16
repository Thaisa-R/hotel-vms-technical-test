# Hotel VMS - Backend API

API REST desenvolvida em Node.js com Express e Sequelize para gerenciamento de hotéis, reservas e hóspedes.

## Índice

- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Modelos de Dados](#modelos-de-dados)
- [Rotas da API](#rotas-da-api)
- [Autenticação](#autenticação)
- [Executando o Projeto](#executando-o-projeto)

## Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação via tokens
- **CORS** - Controle de acesso entre origens

## Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório e navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

## Configuração

1. Crie um arquivo `.env` na raiz da pasta `backend`:
```env
DB_NAME=hotel_vms
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_HOST=localhost
DB_PORT=5432
```

2. Crie o banco de dados PostgreSQL:
```sql
CREATE DATABASE hotel_vms;
```

## Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/          # Controladores das rotas
│   │   ├── HotelController.js
│   │   └── ReservaController.js
│   ├── database/             # Configuração do banco
│   │   └── index.js
│   ├── middleware/           # Middlewares
│   │   └── auth.js
│   ├── models/               # Modelos Sequelize
│   │   ├── Hotel.js
│   │   ├── Reserva.js
│   │   └── Hospede.js
│   ├── routes.js             # Definição de rotas
│   └── server.js             # Servidor Express
├── package.json
└── README.md
```

## Modelos de Dados

### Hotel
```javascript
{
  id: INTEGER (auto-increment),
  nome: STRING (obrigatório),
  cidade: STRING (obrigatório),
  qtd_quartos: INTEGER (obrigatório),
  createdAt: DATE,
  updatedAt: DATE
}
```

### Reserva
```javascript
{
  id: INTEGER (auto-increment),
  hospede_nome: STRING (obrigatório),
  data_checkin: DATEONLY (obrigatório),
  data_checkout: DATEONLY (obrigatório),
  hotel_id: INTEGER (foreign key -> Hotel.id),
  createdAt: DATE,
  updatedAt: DATE
}
```

### Hospede
```javascript
{
  id: INTEGER (auto-increment),
  nome: STRING (obrigatório),
  documento: STRING (obrigatório),
  reserva_id: INTEGER (foreign key -> Reserva.id),
  createdAt: DATE,
  updatedAt: DATE
}
```

### Relacionamentos

- **Hotel** `hasMany` **Reserva** (1:N)
- **Reserva** `belongsTo` **Hotel** (N:1)
- **Reserva** `hasMany` **Hospede** (1:N)
- **Hospede** `belongsTo` **Reserva** (N:1)

## Rotas da API

Base URL: `http://localhost:3000`

### Autenticação

#### POST `/login`
Autentica o usuário e retorna um token JWT.

**Request Body:**
```json
{
  "usuario": "admin",
  "senha": "123456"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (401):**
```json
{
  "error": "Usuário ou senha inválidos"
}
```

### Hotéis

#### GET `/hoteis`
Lista todos os hotéis cadastrados.

**Response (200):**
```json
[
  {
    "id": 1,
    "nome": "Hotel Exemplo",
    "cidade": "São Paulo",
    "qtd_quartos": 50,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST `/hoteis`
Cria um novo hotel.

**Request Body:**
```json
{
  "nome": "Hotel Exemplo",
  "cidade": "São Paulo",
  "qtd_quartos": 50
}
```

**Response (201):**
```json
{
  "id": 1,
  "nome": "Hotel Exemplo",
  "cidade": "São Paulo",
  "qtd_quartos": 50,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### PUT `/hoteis/:id`
Atualiza um hotel existente.

**Request Body:**
```json
{
  "nome": "Hotel Atualizado",
  "cidade": "Rio de Janeiro",
  "qtd_quartos": 75
}
```

**Response (200):**
```json
{
  "id": 1,
  "nome": "Hotel Atualizado",
  "cidade": "Rio de Janeiro",
  "qtd_quartos": 75,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

**Response (404):**
```json
{
  "error": "Hotel não encontrado"
}
```

#### DELETE `/hoteis/:id`
Exclui um hotel.

**Response (200):**
```json
{
  "message": "Hotel excluído com sucesso"
}
```

**Response (404):**
```json
{
  "error": "Hotel não encontrado"
}
```

**Response (500):**
```json
{
  "message": "Não é possível excluir: existem vínculos ativos"
}
```

### Reservas

#### GET `/reservas`
Lista todas as reservas com dados do hotel associado.

**Response (200):**
```json
[
  {
    "id": 1,
    "hospede_nome": "João Silva",
    "data_checkin": "2024-02-10",
    "data_checkout": "2024-02-15",
    "hotel_id": 1,
    "Hotel": {
      "nome": "Hotel Exemplo",
      "cidade": "São Paulo"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST `/reservas`
Cria uma nova reserva.

**Request Body:**
```json
{
  "hospede_nome": "João Silva",
  "data_checkin": "2024-02-10",
  "data_checkout": "2024-02-15",
  "hotel_id": 1
}
```

**Response (201):**
```json
{
  "id": 1,
  "hospede_nome": "João Silva",
  "data_checkin": "2024-02-10",
  "data_checkout": "2024-02-15",
  "hotel_id": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Response (404):**
```json
{
  "error": "Hotel não encontrado"
}
```

#### PUT `/reservas/:id`
Atualiza uma reserva existente.

**Request Body:**
```json
{
  "hospede_nome": "João Silva Atualizado",
  "data_checkin": "2024-02-12",
  "data_checkout": "2024-02-17",
  "hotel_id": 1
}
```

**Response (200):**
```json
{
  "id": 1,
  "hospede_nome": "João Silva Atualizado",
  "data_checkin": "2024-02-12",
  "data_checkout": "2024-02-17",
  "hotel_id": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

#### DELETE `/reservas/:id`
Exclui uma reserva.

**Response (200):**
```json
{
  "message": "Reserva excluída com sucesso"
}
```

### Hóspedes

#### GET `/hospedes`
Lista todos os hóspedes com dados da reserva associada.

**Response (200):**
```json
[
  {
    "id": 1,
    "nome": "Maria Santos",
    "documento": "12345678900",
    "reserva_id": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST `/hospedes`
Cria um novo hóspede.

**Request Body:**
```json
{
  "nome": "Maria Santos",
  "documento": "12345678900",
  "reserva_id": 1
}
```

**Response (201):**
```json
{
  "id": 1,
  "nome": "Maria Santos",
  "documento": "12345678900",
  "reserva_id": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### PUT `/hospedes/:id`
Atualiza um hóspede existente.

**Request Body:**
```json
{
  "nome": "Maria Santos Atualizado",
  "documento": "98765432100",
  "reserva_id": 1
}
```

**Response (200):**
```json
{
  "id": 1,
  "nome": "Maria Santos Atualizado",
  "documento": "98765432100",
  "reserva_id": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

#### DELETE `/hospedes/:id`
Exclui um hóspede.

**Response (200):**
```json
{
  "message": "Hóspede excluído com sucesso"
}
```

## Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Após fazer login, o token deve ser enviado no header `Authorization`:

```
Authorization: Bearer <token>
```

**Credenciais padrão:**
- Usuário: `admin`
- Senha: `123456`

## ▶Executando o Projeto

### Modo Desenvolvimento
```bash
npm run dev
```
O servidor será iniciado com nodemon, reiniciando automaticamente a cada alteração.

### Modo Produção
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Erro na requisição
- `401` - Não autorizado
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

## Tratamento de Erros

A API retorna erros no seguinte formato:

```json
{
  "error": "Mensagem de erro descritiva"
}
```

Para erros de validação de foreign key:
```json
{
  "message": "Não é possível excluir: existem vínculos ativos"
}
```

## Dependências Principais

- `express` - Framework web
- `sequelize` - ORM
- `pg` - Driver PostgreSQL
- `jsonwebtoken` - Autenticação JWT
- `cors` - Controle de acesso
- `dotenv` - Variáveis de ambiente

## Sincronização do Banco

O Sequelize sincroniza automaticamente as tabelas ao iniciar o servidor. As tabelas são criadas automaticamente se não existirem.

## Suporte

Para dúvidas ou problemas, verifique:
1. Se o PostgreSQL está rodando
2. Se as variáveis de ambiente estão configuradas corretamente
3. Se o banco de dados foi criado
4. Os logs do console para mensagens de erro
