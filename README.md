# Hotel VMS - Sistema de Gerenciamento de Hotéis

Sistema completo de gerenciamento de hotéis, reservas e hóspedes desenvolvido com Node.js, React e PostgreSQL.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Documentação](#documentação)
- [Funcionalidades](#funcionalidades)

## Sobre o Projeto

O Hotel VMS é um sistema completo para gerenciamento de hotéis que permite:

- ✅ Gerenciar hotéis (cadastrar, editar, excluir, listar)
- ✅ Gerenciar reservas (criar, editar, excluir, listar)
- ✅ Gerenciar hóspedes (cadastrar, editar, excluir, listar)
- ✅ Dashboard com estatísticas e visão geral
- ✅ Interface responsiva para mobile e desktop
- ✅ Autenticação via JWT
- ✅ API REST completa

## Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação

### Frontend
- **React 18** - Biblioteca JavaScript
- **Material-UI** - Componentes React
- **Vite** - Build tool
- **React Router** - Roteamento
- **Axios** - Cliente HTTP

## Estrutura do Projeto

```
hotel-vms/
├── backend/              # API REST
│   ├── src/
│   │   ├── controllers/  # Controladores
│   │   ├── models/       # Modelos Sequelize
│   │   ├── routes.js     # Rotas da API
│   │   └── server.js     # Servidor Express
│   ├── package.json
│   └── README.md         # Documentação do backend
│
├── frontend/             # Interface React
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── pages/       # Páginas da aplicação
│   │   ├── services/    # Serviços (API)
│   │   └── theme/       # Tema MUI
│   ├── package.json
│   └── README.md         # Documentação do frontend
│
└── README.md            # Este arquivo
```

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 16 ou superior)
- **PostgreSQL** (versão 12 ou superior)
- **npm** ou **yarn**
- **Git** (opcional)

## Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd hotel-vms
```

2. **Instale as dependências do backend:**
```bash
cd backend
npm install
```

3. **Instale as dependências do frontend:**
```bash
cd ../frontend
npm install
```

## Configuração

### Backend

1. Crie um arquivo `.env` na pasta `backend/`:
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

### Frontend

O frontend está configurado para se conectar ao backend em `http://localhost:3000`. 

Se necessário, altere a URL em `frontend/src/services/api.js`.

## ▶Executando o Projeto

### 1. Inicie o Backend

```bash
cd backend
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### 2. Inicie o Frontend

Em outro terminal:

```bash
cd frontend
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### 3. Acesse a Aplicação

1. Abra o navegador em `http://localhost:5173`
2. Faça login com:
   - **Usuário:** `admin`
   - **Senha:** `123456`

## Documentação

### Backend
Documentação completa disponível em: [backend/README.md](./backend/README.md)

Inclui:
- Rotas da API
- Modelos de dados
- Exemplos de requisições
- Códigos de status

### Frontend
Documentação completa disponível em: [frontend/README.md](./frontend/README.md)

Inclui:
- Componentes disponíveis
- Páginas da aplicação
- Configuração do tema
- Guia de responsividade

## Funcionalidades

### Autenticação
- Login com JWT
- Proteção de rotas
- Token armazenado no localStorage

### Gerenciamento de Hotéis
- Listar hotéis
- Criar novo hotel
- Editar hotel existente
- Excluir hotel (com validação de vínculos)

### Gerenciamento de Reservas
- Listar reservas com dados do hotel
- Criar nova reserva
- Editar reserva existente
- Excluir reserva
- Seleção de hotel
- Datas de check-in e check-out

### Gerenciamento de Hóspedes
- Listar hóspedes
- Cadastrar novo hóspede
- Editar hóspede existente
- Excluir hóspede
- Vincular hóspede a reserva

### Dashboard
- Estatísticas gerais (total de hotéis, reservas, hóspedes)
- Cards visuais com ícones
- Layout responsivo
- Cálculo automático de quartos disponíveis (considera reservas ativas)
- Lista de reservas recentes
- Lista de hotéis com disponibilidade em tempo real

### Responsividade
- Interface adaptada para mobile
- Login responsivo com layout adaptativo (imagem lateral oculta no mobile)
- Sidebar responsiva (drawer no mobile)
- Tabelas convertidas para lista no mobile
- Formulários otimizados para touch

## Scripts Disponíveis

### Backend
- `npm start` - Inicia o servidor em modo produção
- `npm run dev` - Inicia o servidor em modo desenvolvimento (com nodemon)

### Frontend
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## Banco de Dados

O sistema utiliza PostgreSQL com as seguintes tabelas:

- **hotels** - Dados dos hotéis
- **reservas** - Dados das reservas
- **hospedes** - Dados dos hóspedes

As tabelas são criadas automaticamente pelo Sequelize ao iniciar o backend.

## Docker

O projeto inclui suporte completo para Docker e Docker Compose. Consulte o arquivo [DOCKER.md](./DOCKER.md) para instruções detalhadas de execução com Docker.

### Executando com Docker Compose

```bash
docker-compose up --build
```

Isso iniciará automaticamente:
- Banco de dados PostgreSQL
- Backend Node.js
- Frontend React (com Nginx)

A aplicação estará disponível em `http://localhost`.

## Segurança

- Autenticação via JWT
- Validação de dados no backend
- Proteção contra exclusão com vínculos ativos
- CORS configurado

## Licença

Este projeto é de uso interno.

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Suporte

Para dúvidas ou problemas:

1. Verifique a documentação específica (backend/README.md ou frontend/README.md)
2. Verifique os logs do console
3. Confirme se todas as dependências estão instaladas
4. Verifique se o PostgreSQL está rodando

---
