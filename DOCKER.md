# Guia de Execução com Docker

Este guia explica como executar o Hotel VMS usando Docker e Docker Compose.

## Pré-requisitos

- Docker instalado e rodando
- Docker Compose instalado (geralmente vem com Docker Desktop)

## Executando o Projeto

### 1. Navegue até a raiz do projeto

```bash
cd hotel-vms
```

### 2. Execute o Docker Compose

```bash
docker-compose up --build
```

O parâmetro `--build` força a reconstrução das imagens. Na primeira execução, isso é necessário.

**Para executar em background (detached mode):**
```bash
docker-compose up -d --build
```

### 3. Aguarde os serviços iniciarem

Você verá logs de:
- **db**: Banco de dados PostgreSQL iniciando
- **backend**: API Node.js iniciando e conectando ao banco
- **frontend**: Build do React e servidor Nginx

### 4. Acesse a aplicação

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000
- **Banco de Dados**: localhost:5432

## Credenciais de Login

- **Usuário**: `admin`
- **Senha**: `123456`

## Comandos Úteis

### Parar os serviços
```bash
docker-compose down
```

### Parar e remover volumes (limpar banco de dados)
```bash
docker-compose down -v
```

### Ver logs
```bash
# Todos os serviços
docker-compose logs

# Apenas backend
docker-compose logs backend

# Apenas frontend
docker-compose logs frontend

# Apenas banco
docker-compose logs db

# Logs em tempo real
docker-compose logs -f
```

### Reconstruir apenas um serviço
```bash
# Backend
docker-compose up --build backend

# Frontend
docker-compose up --build frontend
```

### Acessar container
```bash
# Backend
docker-compose exec backend sh

# Banco de dados
docker-compose exec db psql -U postgres -d hotel_db
```

### Ver status dos serviços
```bash
docker-compose ps
```

## Variáveis de Ambiente

As variáveis de ambiente podem ser configuradas de duas formas:

### 1. Arquivo .env (recomendado)

Crie um arquivo `.env` na raiz do projeto:

```env
DB_NAME=hotel_db
DB_USER=postgres
DB_PASS=123456
JWT_SECRET=hotel_vms_secret
```

### 2. Diretamente no docker-compose.yml

As variáveis padrão já estão configuradas no `docker-compose.yml`. Se não criar o `.env`, os valores padrão serão usados.

## Troubleshooting

### Porta já em uso

Se a porta 3000, 80 ou 5432 estiverem em uso, você pode alterar no `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Mude 3001 para outra porta disponível
```

### Erro de conexão com banco

1. Verifique se o serviço `db` está rodando: `docker-compose ps`
2. Verifique os logs: `docker-compose logs db`
3. Aguarde o healthcheck completar antes do backend iniciar

### Frontend não carrega

1. Verifique se o build foi concluído: `docker-compose logs frontend`
2. Verifique se o nginx está rodando: `docker-compose ps`
3. Tente reconstruir: `docker-compose up --build frontend`

### Backend não conecta ao banco

1. Verifique se o `DB_HOST` está como `db` (nome do serviço no docker-compose)
2. Verifique se o banco está saudável: `docker-compose ps`
3. Verifique as variáveis de ambiente: `docker-compose config`

### Limpar tudo e começar do zero

```bash
# Para todos os containers
docker-compose down -v

# Remove imagens
docker-compose down --rmi all

# Limpa tudo (cuidado!)
docker system prune -a --volumes
```

## Estrutura dos Serviços

- **db** (PostgreSQL): Banco de dados na porta 5432
- **backend** (Node.js): API REST na porta 3000
- **frontend** (Nginx): Interface web na porta 80

## Atualizando o Código

Após fazer alterações no código:

1. **Backend**: Reinicie o serviço
   ```bash
   docker-compose restart backend
   ```

2. **Frontend**: Reconstrua a imagem
   ```bash
   docker-compose up --build frontend
   ```

## Notas

- O banco de dados persiste dados em um volume Docker
- O backend usa volumes para hot-reload em desenvolvimento
- O frontend é buildado estaticamente no container
- Todos os serviços reiniciam automaticamente em caso de falha
