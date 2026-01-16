# Hotel VMS - Frontend

Interface web desenvolvida em React com Material-UI para gerenciamento de hotéis, reservas e hóspedes.

## Índice

- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Componentes](#componentes)
- [Páginas](#páginas)
- [Serviços](#serviços)
- [Tema e Estilização](#tema-e-estilização)
- [Executando o Projeto](#executando-o-projeto)
- [Build de Produção](#build-de-produção)

## Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **Material-UI (MUI)** - Biblioteca de componentes React
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **React Toastify** - Notificações
- **SweetAlert2** - Alertas customizados
- **Lucide React** - Ícones

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Backend rodando em `http://localhost:3000`

## 🔧 Instalação

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

## ⚙️ Configuração

O frontend está configurado para se conectar ao backend em `http://localhost:3000`. 

Para alterar a URL da API, edite o arquivo `src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:3000' // Altere aqui se necessário
});
```

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── assets/              # Imagens e recursos estáticos
│   │   ├── HotelVMS-LF.png
│   │   └── HotelVMS-logo.png
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Card.jsx
│   │   ├── DataTable.jsx
│   │   ├── Layout.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── MuiModal.jsx
│   │   ├── PasswordField.jsx
│   │   └── StatCard.jsx
│   ├── pages/              # Páginas da aplicação
│   │   ├── Dashboard.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── HospedesPage.jsx
│   │   ├── HoteisPage.jsx
│   │   ├── Login.jsx
│   │   └── ReservasPage.jsx
│   ├── services/           # Serviços e APIs
│   │   └── api.js
│   ├── theme/              # Configuração do tema MUI
│   │   └── theme.js
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Entry point
│   └── index.css           # Estilos globais
├── package.json
└── README.md
```

## Componentes

### Card
Componente de card genérico usando MUI Paper.

**Props:**
- `children` - Conteúdo do card

**Uso:**
```jsx
<Card>
  <Typography>Conteúdo do card</Typography>
</Card>
```

### DataTable
Tabela de dados responsiva que exibe lista no mobile e tabela no desktop.

**Props:**
- `title` (string) - Título da tabela
- `headers` (array) - Array com nomes das colunas
- `data` (array) - Array de objetos com os dados
- `loading` (boolean) - Estado de carregamento
- `onAdd` (function) - Callback para adicionar novo item
- `onEdit` (function) - Callback para editar item
- `onDelete` (function) - Callback para excluir item
- `addButtonText` (string) - Texto do botão adicionar
- `emptyMessage` (string) - Mensagem quando não há dados
- `renderRow` (function) - Função para renderizar células da tabela
- `getCellValue` (function) - Função para obter valor da célula (mobile)

**Uso:**
```jsx
<DataTable
  title="Lista de Hotéis"
  headers={['Nome', 'Cidade', 'Quartos']}
  data={hotels}
  loading={loading}
  onAdd={handleNewHotel}
  onEdit={handleEdit}
  onDelete={handleDelete}
  addButtonText="Novo Hotel"
  renderRow={(h) => (
    <>
      <TableCell>{h.nome}</TableCell>
      <TableCell>{h.cidade}</TableCell>
      <TableCell>{h.qtd_quartos}</TableCell>
    </>
  )}
  getCellValue={(item, index) => {
    const values = [item.nome, item.cidade, item.qtd_quartos];
    return values[index] || '-';
  }}
/>
```

### Layout
Layout principal com sidebar e área de conteúdo.

**Props:**
- `children` - Conteúdo a ser renderizado

**Uso:**
```jsx
<Layout>
  <Typography>Conteúdo da página</Typography>
</Layout>
```

### LoadingSpinner
Spinner de carregamento.

**Uso:**
```jsx
<LoadingSpinner />
```

### MuiModal
Modal reutilizável usando MUI Dialog.

**Props:**
- `open` (boolean) - Controla visibilidade
- `onClose` (function) - Callback ao fechar
- `title` (string) - Título do modal
- `actions` (node) - Botões de ação
- `children` - Conteúdo do modal

**Uso:**
```jsx
<MuiModal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Novo Hotel"
  actions={
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button onClick={handleCancel}>Cancelar</Button>
      <Button onClick={handleSave}>Salvar</Button>
    </Box>
  }
>
  <TextField label="Nome" />
</MuiModal>
```

### PasswordField
Campo de senha com toggle de visibilidade.

**Props:**
- `label` (string) - Label do campo
- `value` (string) - Valor do campo
- `onChange` (function) - Callback de mudança
- `required` (boolean) - Campo obrigatório
- `fullWidth` (boolean) - Largura total

**Uso:**
```jsx
<PasswordField
  label="Senha"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>
```

### StatCard
Card de estatística com ícone.

**Props:**
- `title` (string) - Título do card
- `value` (number|string) - Valor a exibir
- `icon` (component) - Componente de ícone
- `color` (string) - Cor do ícone

**Uso:**
```jsx
<StatCard
  title="Total de Hotéis"
  value={hotels.length}
  icon={Hotel}
  color="#f59e0b"
/>
```

## Páginas

### Login
Página de autenticação do sistema.

**Funcionalidades:**
- Validação de credenciais
- Armazenamento de token no localStorage
- Redirecionamento para dashboard após login

### Dashboard
Página principal com visão geral do sistema (legado, mantido para compatibilidade).

### DashboardPage
Página principal com estatísticas e atividades recentes.

**Funcionalidades:**
- Cards de estatísticas (Hotéis, Reservas, Hóspedes)
- Lista de atividades recentes
- Layout responsivo

### HoteisPage
Página de gerenciamento de hotéis.

**Funcionalidades:**
- Listar hotéis
- Criar novo hotel
- Editar hotel existente
- Excluir hotel
- Validação de formulário

### ReservasPage
Página de gerenciamento de reservas.

**Funcionalidades:**
- Listar reservas com dados do hotel
- Criar nova reserva
- Editar reserva existente
- Excluir reserva
- Seleção de hotel
- Campos de data (check-in/check-out)

### HospedesPage
Página de gerenciamento de hóspedes.

**Funcionalidades:**
- Listar hóspedes
- Criar novo hóspede
- Editar hóspede existente
- Excluir hóspede
- Vincular hóspede a reserva

## Serviços

### api.js
Configuração do cliente Axios com interceptors.

**Funcionalidades:**
- Base URL configurada
- Interceptor para adicionar token JWT automaticamente
- Token obtido do localStorage

**Uso:**
```javascript
import api from '../services/api';

// GET
const response = await api.get('/hoteis');

// POST
await api.post('/hoteis', data);

// PUT
await api.put(`/hoteis/${id}`, data);

// DELETE
await api.delete(`/hoteis/${id}`);
```

## Tema e Estilização

### Tema MUI
O tema customizado está em `src/theme/theme.js`.

**Cores principais:**
- Primary: `#1a2a3a` (azul escuro)
- Secondary: `#f59e0b` (laranja)
- Background: `#f9fafb` (cinza claro)
- Text: `#1a2a3a` (azul escuro)

**Componentes customizados:**
- Botões com cores do tema
- TextFields com estilo consistente
- Dialogs com bordas arredondadas
- Tabelas com cabeçalho estilizado

### Responsividade
A aplicação é totalmente responsiva:

- **Mobile (< 768px):**
  - Sidebar como drawer
  - Tabelas convertidas para lista de cards
  - Botões full-width
  - Tipografia reduzida

- **Tablet (768px - 1024px):**
  - Layout adaptativo
  - Grids de 2 colunas

- **Desktop (> 1024px):**
  - Sidebar fixa
  - Tabelas completas
  - Grids de 3 colunas

## ▶Executando o Projeto

### Modo Desenvolvimento
```bash
npm run dev
```

O servidor de desenvolvimento será iniciado em `http://localhost:5173` (porta padrão do Vite).

### Modo Preview (Build)
```bash
npm run build
npm run preview
```

## Build de Produção

Para gerar o build de produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## Autenticação

O sistema utiliza JWT para autenticação:

1. Usuário faz login na página `/login`
2. Token é armazenado no `localStorage`
3. Token é enviado automaticamente em todas as requisições via interceptor
4. Rotas protegidas verificam a existência do token

**Credenciais padrão:**
- Usuário: `admin`
- Senha: `123456`

## Funcionalidades Mobile

### Sidebar Responsiva
- Drawer que abre/fecha com botão hamburger
- Overlay quando aberto no mobile
- Fecha automaticamente ao navegar

### Lista de Dados
- Tabelas convertidas para cards no mobile
- Dados exibidos lado a lado com títulos
- Botões de ação no final de cada card

### Formulários
- Campos full-width no mobile
- Botões adaptados para touch
- Validação visual

## Dependências Principais

### Produção
- `react` - Biblioteca React
- `react-dom` - React DOM
- `@mui/material` - Material-UI
- `@mui/icons-material` - Ícones MUI
- `react-router-dom` - Roteamento
- `axios` - Cliente HTTP
- `react-toastify` - Notificações
- `sweetalert2` - Alertas
- `lucide-react` - Ícones adicionais

### Desenvolvimento
- `vite` - Build tool
- `@vitejs/plugin-react` - Plugin React para Vite
- `eslint` - Linter
- `tailwindcss` - CSS framework (opcional)

## Notas de Desenvolvimento

### Estado de Componentes
- Uso de `useState` para estado local
- `useEffect` para efeitos colaterais
- `useCallback` para otimização de funções

### Gerenciamento de Estado
- Estado local por componente
- Sem Redux ou Context API (pode ser adicionado se necessário)

### Validação
- Validação básica nos formulários
- Mensagens de erro via toast
- Confirmação de exclusão via SweetAlert2

## Troubleshooting

### Erro de conexão com API
- Verifique se o backend está rodando
- Confirme a URL em `src/services/api.js`
- Verifique CORS no backend

### Token expirado
- Faça logout e login novamente
- Token expira em 1 dia

### Erro ao carregar dados
- Verifique console do navegador
- Confirme se o backend está respondendo
- Verifique se o token está sendo enviado

## Suporte

Para problemas ou dúvidas:
1. Verifique os logs do console do navegador
2. Verifique se o backend está rodando
3. Confirme as variáveis de ambiente
4. Verifique a documentação do backend
