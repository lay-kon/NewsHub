# NewsHub - Portal de Notícias

Um sistema completo de blog/portal de notícias desenvolvido com Node.js, Express, MySQL, HTML, CSS e JavaScript puro.

## Funcionalidades

- **Administradores**: Gerenciamento completo do sistema
- **Leitores/Autores**: Criação de publicações e comentários
- **Publicações**: CRUD completo com validação
- **Comentários**: Sistema de comentários com moderação
- **Autenticação**: Login seguro para administradores

## Estrutura do Projeto

```
newshub/
├── backend/          # API REST com Node.js/Express
├── frontend/         # Interface com HTML/CSS/JS puro
├── database/         # Scripts SQL
├── uploads/          # Arquivos enviados
└── docs/            # Documentação
```

## Instalação e Execução

### Pré-requisitos

- Node.js (v14+)
- MySQL
- Git

### Passos

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd newshub
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o banco de dados**
   - Crie um banco de dados MySQL chamado `newshub`
   - Execute o script SQL:
     ```bash
     mysql -u root -p newshub < database/schema.sql
     mysql -u root -p newshub < database/seed.sql
     ```

4. **Configure as variáveis de ambiente**
   - Edite o arquivo `.env` com suas configurações de banco de dados

5. **Execute o servidor**
   ```bash
   npm start
   ```

6. **Acesse no navegador**
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api

## API Endpoints

### Administradores
- `POST /api/admins/login` - Login
- `GET /api/admins` - Listar admins
- `POST /api/admins` - Criar admin

### Publicações
- `GET /api/publicacoes` - Listar publicações
- `GET /api/publicacoes/:id` - Obter publicação
- `POST /api/publicacoes` - Criar publicação
- `PUT /api/publicacoes/:id` - Atualizar publicação
- `DELETE /api/publicacoes/:id` - Deletar publicação

### Comentários
- `GET /api/comentarios/publicacao/:id` - Comentários de uma publicação
- `POST /api/comentarios` - Criar comentário

## Tecnologias Utilizadas

- **Backend**: Node.js, Express.js, MySQL2, JWT, bcrypt
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Banco de Dados**: MySQL
- **Autenticação**: JWT (JSON Web Tokens)

## Desenvolvimento

Para desenvolvimento, use:
```bash
npm run dev  # Com nodemon
```

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

MIT
