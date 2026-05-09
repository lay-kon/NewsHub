# 📰 NewsHub - Portal de Notícias

Um sistema completo de blog/portal de notícias desenvolvido com **Node.js**, **Express**, **MySQL**, **HTML5**, **CSS3** e **JavaScript** puro.

## ✨ Funcionalidades

- **👨‍💼 Administradores**: Gerenciamento completo do sistema
- **✍️ Leitores/Autores**: Criação e publicação de artigos
- **📰 Publicações**: CRUD completo com validação
- **💬 Comentários**: Sistema de comentários com moderação
- **🔐 Autenticação**: Login seguro para administradores e autores
- **📁 Categorização**: Organização de publicações por categorias
- **⏳ Fluxo de aprovação**: Artigos passam por revisão antes de serem publicados

## 🏗️ Estrutura do Projeto

```
newshub/
├── backend/              # API REST com Node.js/Express
│   ├── config/          # Configuração de banco de dados e variáveis
│   ├── controllers/      # Lógica de negócio
│   ├── models/          # Camada de dados
│   ├── routes/          # Definição de rotas
│   ├── middlewares/      # Middlewares de autenticação e validação
│   └── utils/           # Funções utilitárias
├── frontend/            # Interface com HTML/CSS/JS puro
│   ├── pages/           # Páginas HTML
│   ├── js/              # JavaScript (API client, autenticação)
│   ├── css/             # Estilos
│   └── assets/          # Imagens e ícones
├── database/            # Scripts SQL
│   ├── schema.sql       # Estrutura das tabelas
│   └── seed.sql         # Dados iniciais
├── uploads/             # Arquivos enviados pelos usuários
└── docs/                # Documentação adicional
```

## 🚀 Instalação e Execução

### 📋 Pré-requisitos

- **Node.js** v14+ ([Download](https://nodejs.org/))
- **MySQL** 5.7+ ([Download](https://www.mysql.com/downloads/))
- **Git** ([Download](https://git-scm.com/))

### 📥 Passos de Instalação

#### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/newshub.git
cd newshub
```

#### 2. Instale as dependências
```bash
npm install
```

#### 3. Configure o banco de dados
```bash
# Acesse o MySQL
mysql -u root -p

# Crie o banco de dados e importe o schema
CREATE DATABASE newshub CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE newshub;
SOURCE database/schema.sql;
SOURCE database/seed.sql;

# Saia do MySQL
EXIT;
```

#### 4. Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o .env com suas configurações
nano .env
```

Configurações necessárias no `.env`:
```
DB_HOST=localhost          # Host do MySQL
DB_USER=root               # Usuário do MySQL
DB_PASSWORD=sua_senha      # Senha do MySQL
DB_NAME=newshub            # Nome do banco
JWT_SECRET=chave_secreta   # Chave para JWT (use algo aleatório em produção)
PORT=3000                  # Porta do servidor
```

#### 5. Execute o servidor
```bash
# Modo desenvolvimento (com reload automático)
npm run dev

# Modo produção
npm start
```

#### 6. Acesse no navegador
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api

## 🔑 Credenciais Padrão

O script de seed cria um administrador padrão:

- **Usuário**: `admin`
- **Senha**: Use a senha hasheada no seed.sql
- **Email**: admin@newshub.com

⚠️ **Importante**: Altere a senha do administrador padrão em produção!

## 📚 API Endpoints

### 👤 Administradores
```
POST   /api/admins/login     - Fazer login
GET    /api/admins           - Listar administradores (requer autenticação)
GET    /api/admins/:id       - Obter administrador por ID
POST   /api/admins           - Criar novo administrador
PUT    /api/admins/:id       - Atualizar administrador
DELETE /api/admins/:id       - Deletar administrador
```

### ✍️ Autores
```
POST   /api/autores/login    - Fazer login como autor
POST   /api/autores/registro - Registrar novo autor
GET    /api/autores          - Listar todos os autores
GET    /api/autores/:id      - Obter autor por ID
PUT    /api/autores/:id      - Atualizar dados do autor
DELETE /api/autores/:id      - Deletar autor
```

### 📰 Publicações
```
GET    /api/publicacoes           - Listar todas as publicações
GET    /api/publicacoes/:id       - Obter publicação específica
GET    /api/publicacoes/estado/:estado - Listar por estado (publicado, pendente, etc)
POST   /api/publicacoes           - Criar nova publicação (requer autenticação)
PUT    /api/publicacoes/:id       - Atualizar publicação (requer autenticação)
DELETE /api/publicacoes/:id       - Deletar publicação (requer autenticação)
POST   /api/publicacoes/:id/validate - Validar/aprovar publicação (admin)
```

### 💬 Comentários
```
GET    /api/comentarios                    - Listar todos os comentários (admin)
GET    /api/comentarios/:id                - Obter comentário específico
GET    /api/comentarios/publicacao/:id     - Listar comentários de uma publicação
POST   /api/comentarios                    - Criar novo comentário
PUT    /api/comentarios/:id                - Atualizar comentário (requer autenticação)
DELETE /api/comentarios/:id                - Deletar comentário (requer autenticação)
POST   /api/comentarios/:id/approve        - Aprovar comentário (admin)
POST   /api/comentarios/:id/reject         - Rejeitar comentário (admin)
```

### 📂 Categorias
```
GET    /api/categorias           - Listar todas as categorias
GET    /api/categorias/:id       - Obter categoria específica
POST   /api/categorias           - Criar categoria (requer autenticação)
DELETE /api/categorias/:id       - Deletar categoria (requer autenticação)
```

### 📊 Estados
```
GET    /api/estados     - Listar todos os estados (rascunho, pendente, publicado, rejeitado)
GET    /api/estados/:id - Obter estado específico
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL2** - Driver MySQL
- **JWT** (jsonwebtoken) - Autenticação
- **bcryptjs** - Criptografia de senhas
- **dotenv** - Variáveis de ambiente
- **multer** - Upload de arquivos
- **CORS** - Controle de origem

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilos responsivos
- **JavaScript ES6+** - Lógica de client
- **Fetch API** - Requisições HTTP
- **LocalStorage** - Armazenamento local

### Banco de Dados
- **MySQL** - Banco de dados relacional

## 📖 Guia de Uso

### Para Administradores

1. Acesse http://localhost:3000/login.html
2. Faça login com suas credenciais
3. No dashboard, você pode:
   - ✅ Aprovar/rejeitar publicações pendentes
   - 📝 Criar novas publicações
   - 👥 Gerenciar usuários
   - 💬 Moderar comentários

### Para Autores

1. Acesse http://localhost:3000/author-register.html para criar uma conta
2. Faça login em http://localhost:3000/author-login.html
3. No seu dashboard, você pode:
   - ✍️ Escrever novos artigos
   - 📋 Visualizar seus artigos
   - ✏️ Editar seus artigos
   - 🗑️ Deletar seus artigos

### Para Leitores

1. Acesse a página inicial http://localhost:3000
2. Navegue pelos artigos
3. Leia artigos completos
4. Deixe comentários (informando seu ID de leitor)

## 🔒 Segurança

- Senhas são criptografadas com **bcryptjs**
- Autenticação via **JWT** (JSON Web Tokens)
- CORS configurado para controlar requisições
- Validação de entrada nos middlewares
- Variáveis sensíveis no `.env` (nunca commitadas)

## 📦 Estrutura de Dados

### Tabelas Principais

- **administradores** - Contas de admin
- **leitorAutores** - Perfis de autores e leitores
- **publicacoes** - Artigos publicados
- **comentarios** - Comentários nos artigos
- **categorias** - Categorias de artigos
- **estados** - Estados das publicações (rascunho, pendente, publicado, rejeitado)
- **validacoes** - Log de validações de artigos

## 🐛 Troubleshooting

### "Erro ao conectar no banco de dados"
- Verifique se MySQL está rodando
- Confirme as credenciais no `.env`
- Verifique se o banco `newshub` foi criado

### "Erro 401 Unauthorized"
- Token JWT expirou, faça login novamente
- Verifique se o token está sendo enviado corretamente

### "CORS error"
- Verifique se o servidor backend está rodando
- Confirme a URL correta no `api.js`

## 🚀 Deployment

Para fazer deploy em produção:

1. Use um gerenciador de processos como **PM2**
2. Configure variáveis de ambiente em produção
3. Use HTTPS em produção
4. Configure um firewall adequado
5. Faça backup regular do banco de dados
6. Use um reverse proxy como **Nginx**

## 📝 Licença

Este projeto está sob a licença **MIT** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Abdoulayé Eduardo Francisco Konaté**

## 🤝 Contribuição

Contribuições são bem-vindas! Para grandes mudanças, abra uma issue primeiro para discutir as alterações propostas.

## 📞 Suporte

Para problemas, dúvidas ou sugestões, abra uma [issue](https://github.com/seu-usuario/newshub/issues) no repositório.
