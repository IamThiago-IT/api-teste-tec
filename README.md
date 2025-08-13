
# 🚀 Planner Backend API

Uma API robusta para sistema de planejamento financeiro desenvolvida com **Fastify**, **TypeScript** e **PostgreSQL**.

##  Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Testes](#testes)
- [Deploy com Docker](#deploy-com-docker)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)

##  Sobre o Projeto

O **Planner Backend** é uma API RESTful para gerenciamento de planejamento financeiro, oferecendo funcionalidades como:

- Gestão de clientes e perfis familiares
- Definição e acompanhamento de metas financeiras
- Simulações de investimentos
- Gestão de carteiras de investimento
- Sistema de eventos financeiros
- Sugestões personalizadas
- Sistema de autenticação JWT

##  Tecnologias

- **Runtime**: Node.js
- **Framework**: Fastify
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Autenticação**: JWT + bcrypt
- **Validação**: Zod
- **Testes**: Jest
- **Containerização**: Docker
- **Gerenciador de Pacotes**: pnpm

## ✨ Funcionalidades

- 🔐 **Autenticação e Autorização**
  - Login com JWT
  - Controle de roles (advisor, client)
  - Senhas criptografadas com bcrypt

- 👥 **Gestão de Clientes**
  - CRUD completo de clientes
  - Perfis familiares
  - Histórico de atividades

- 🎯 **Metas Financeiras**
  - Definição de objetivos
  - Acompanhamento de progresso
  - Datas alvo e valores

- 💰 **Carteiras de Investimento**
  - Alocação por classe de ativo
  - Percentuais e valores totais
  - Diversificação

-  **Simulações**
  - Projeções financeiras
  - Diferentes cenários
  - Taxas de retorno

- 🔔 **Sugestões Inteligentes**
  - Recomendações baseadas no perfil
  - Otimização de carteiras

## 📋 Pré-requisitos

- Node.js 20+ 
- PostgreSQL 15+
- Docker 
- pnpm (recomendado) ou npm

##  Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd api-teste-tec
```

### 2. Instale as dependências
```bash
pnpm install
# ou
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Database Configuration
DATABASE_URL="postgresql://usuario:senha@localhost:5432/banco"
JWT_SECRET="sua-chave-secreta-aqui"
PORT=3001
```

### 4. Configure o banco de dados
```bash
# Gere o cliente Prisma
pnpm prisma:generate

# Execute as migrações
pnpm prisma:migrate

# Popule o banco com dados iniciais
pnpm seed
```

### 5. Execute o projeto
```bash
# Desenvolvimento
pnpm dev

# Produção
pnpm build
pnpm start
```

## 🐳 Deploy com Docker

### Usando Docker Compose (Recomendado)
```bash
# Construir e executar
docker-compose up --build

# Executar em background
docker-compose up -d --build

# Parar serviços
docker-compose down
```

### Usando Dockerfile
```bash
# Construir imagem
docker build -t planner-backend .

# Executar container
docker run -p 3001:3001 --env-file .env planner-backend
```

## API Endpoints

### Autenticação
- `POST /auth/login` - Login de usuário
- `POST /auth/register` - Registro de usuário

### Clientes
- `GET /clients` - Listar clientes
- `POST /clients` - Criar cliente
- `GET /clients/:id` - Buscar cliente por ID
- `PUT /clients/:id` - Atualizar cliente
- `DELETE /clients/:id` - Deletar cliente

### Metas
- `GET /goals` - Listar metas
- `POST /goals` - Criar meta
- `PUT /goals/:id` - Atualizar meta
- `DELETE /goals/:id` - Deletar meta

### Carteiras
- `GET /wallet` - Listar carteiras
- `POST /wallet` - Criar carteira
- `PUT /wallet/:id` - Atualizar carteira

### Simulações
- `GET /simulations` - Listar simulações
- `POST /simulations` - Criar simulação

### Sugestões
- `GET /suggestions` - Obter sugestões personalizadas

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Testes com coverage
pnpm test --coverage

# Testes de integração
pnpm test tests/integration/

# Testes unitários
pnpm test tests/unit/
```

## 🔧 Scripts Disponíveis

```bash
pnpm dev              # Executa em modo desenvolvimento
pnpm build            # Compila o projeto
pnpm start            # Executa em produção
pnpm test             # Executa testes
pnpm seed             # Popula banco com dados iniciais
pnpm prisma:generate  # Gera cliente Prisma
pnpm prisma:migrate   # Executa migrações
pnpm lint             # Executa linter
```

## 🌍 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| `DATABASE_URL` | URL de conexão com PostgreSQL | - |
| `JWT_SECRET` | Chave secreta para JWT | `change-me` |
| `PORT` | Porta do servidor | `3001` |

## 📊 Banco de Dados

O projeto usa **PostgreSQL** com **Prisma ORM**. Principais entidades:

- **Client**: Clientes e perfis
- **Goal**: Metas financeiras
- **Wallet**: Carteiras de investimento
- **Event**: Eventos financeiros
- **Simulation**: Simulações e projeções
- **Insurance**: Seguros
- **User**: Usuários do sistema

## �� Deploy em Produção

### 1. Prepare o ambiente
```bash
# Configure variáveis de produção
cp .env.example .env.prod
# Edite .env.prod com valores reais
```

### 2. Execute migrações
```bash
pnpm prisma migrate deploy
```

### 3. Construa e execute
```bash
pnpm build
pnpm start
```

### 4. Com Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte:
- Abra uma [Issue](../../issues)
- Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido com ❤️ pela equipe de desenvolvimento**
```



