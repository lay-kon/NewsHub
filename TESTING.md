# 🧪 Guia de Teste - NewsHub

## ✅ Testes Pré-Inicialização

### Verificações Necessárias
- [ ] MySQL está rodando e acessível
- [ ] Banco de dados `newshub` foi criado
- [ ] Schema.sql e seed.sql foram executados
- [ ] `.env` está configurado com credenciais corretas
- [ ] Node.js v14+ está instalado
- [ ] `npm install` foi executado com sucesso

## 🚀 Inicializando

```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Ou modo produção
npm start
```

Servidor deve iniciar em: **http://localhost:3000**

## 📋 Testes de Funcionalidade

### 1️⃣ Página Inicial
- [ ] Abrir http://localhost:3000
- [ ] Verificar hero section com título
- [ ] Verificar se publicações aparecem em grid
- [ ] Testar responsividade em mobile

### 2️⃣ Login de Admin
- **URL**: http://localhost:3000/pages/login.html
- **Credenciais padrão**:
  - Usuário: `admuser`
  - Senha: `AdmUserSecret2026!`
  - PIN: `97689763`
  - ID do admin: `1`
  
#### Ações de Teste:
- [ ] Fazer login com usuário e senha corretos
- [ ] Confirmar PIN e ID na segunda etapa
- [ ] Redirecionar para dashboard
- [ ] Testar login com credenciais incorretas (deve mostrar erro)
- [ ] Verificar navbar mostrando nome do admin

### 3️⃣ Dashboard Admin
- **URL**: http://localhost:3000/pages/dashboard.html
- **Requer**: Estar logado como admin

#### Ações de Teste:
- [ ] Visualizar publicações pendentes
- [ ] Aprovar uma publicação
- [ ] Rejeitar uma publicação
- [ ] Criar nova publicação
- [ ] Verificar se a publicação aparece na home após criação
- [ ] Testar botão Logout

### 4️⃣ Registro de Autor
- **URL**: http://localhost:3000/pages/author-register.html
- **Dados de Teste**:
  ```
  Nome: João
  Sobrenome: Silva
  Email: joao@teste.com
  Usuário: joaosilva
  Senha: senha123
  Biografia: Sou um autor de testes
  ```

#### Ações de Teste:
- [ ] Preencher formulário
- [ ] Fazer registro
- [ ] Verificar se redireciona para author-dashboard
- [ ] Verificar se nome aparece na navbar

### 5️⃣ Dashboard Autor
- **URL**: http://localhost:3000/pages/author-dashboard.html
- **Requer**: Estar logado como autor

#### Ações de Teste:
- [ ] Criar novo artigo
- [ ] Preencher título, resumo e conteúdo
- [ ] Verificar se artigo aparece em "Meus Artigos"
- [ ] Verificar estado "pendente"
- [ ] Testar deletar artigo
- [ ] Testar Logout

### 6️⃣ Publicações
- **URL**: http://localhost:3000/pages/publicacoes.html
- **Sem autenticação necessária**

#### Ações de Teste:
- [ ] Listar todas as publicações
- [ ] Testar busca por título
- [ ] Testar filtro por autor
- [ ] Clicar em "Ver artigo" deve abrir detalhes

### 7️⃣ Detalhes de Publicação
- **URL**: http://localhost:3000/pages/detalhes.html?id=1
- **Sem autenticação necessária**

#### Ações de Teste:
- [ ] Visualizar conteúdo completo do artigo
- [ ] Visualizar comentários
- [ ] Deixar um comentário (informando ID de leitor)
- [ ] Novo comentário deve aparecer na lista
- [ ] Testar com URL inválida (deve mostrar erro)

## 🔌 Testes de API

### Testar com cURL ou Postman

#### 1. Listar Publicações
```bash
curl http://localhost:3000/api/publicacoes
```
**Esperado**: Array JSON com todas as publicações

#### 2. Login de Admin
```bash
curl -X POST http://localhost:3000/api/admins/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admuser","senha":"AdmUserSecret2026!"}'
```
**Esperado**: JSON com `pinRequired: true` e `idAdm`

Em seguida:
```bash
curl -X POST http://localhost:3000/api/admins/login \
  -H "Content-Type: application/json" \
  -d '{"adminId":1,"pin":"97689763"}'
```
**Esperado**: JSON com token e dados do admin

#### 3. Criar Publicação (requer token)
```bash
curl -X POST http://localhost:3000/api/publicacoes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_AQUI" \
  -d '{
    "titulo":"Teste",
    "resumo":"Teste de API",
    "conteudo":"Conteúdo teste",
    "idestado":2,
    "idautor":1,
    "idCategoria":1
  }'
```
**Esperado**: JSON com ID da publicação criada

#### 4. Listar Categorias
```bash
curl http://localhost:3000/api/categorias
```
**Esperado**: Array com categorias

#### 5. Listar Estados
```bash
curl http://localhost:3000/api/estados
```
**Esperado**: Array com estados (rascunho, pendente, publicado, rejeitado)

## 🐛 Troubleshooting

### Erro: "Cannot GET /"
- Verifique se frontend está em `../frontend/` relativo ao `app.js`
- Verifique se arquivos HTML existem em `frontend/pages/`

### Erro: "CORS error"
- Verifique se CORS está habilitado em `app.js`
- Certifique-se de que está acessando via `http://localhost:3000`

### Erro: "Failed to connect to database"
- MySQL está rodando?
- Credenciais no `.env` estão corretas?
- Banco `newshub` foi criado?

### Erro: "Invalid token"
- Token JWT expirou? Faça login novamente
- Token está sendo enviado corretamente no header?

### Publicações não aparecem
- Verifique se têm estado 'publicado'
- Verifique console do navegador (F12) para erros
- Verifique aba Network para ver requisição

## 📊 Checklist Final

- [ ] Todas as páginas carregam sem erros 404
- [ ] Login/Logout funciona corretamente
- [ ] Publicações aparecem na home
- [ ] Admin consegue aprovar publicações
- [ ] Autor consegue criar artigos
- [ ] Comentários funcionam
- [ ] Busca funciona
- [ ] Navegação entre páginas funciona
- [ ] Navbar muda baseado em autenticação
- [ ] API endpoints retornam dados corretos
- [ ] Erros são tratados com mensagens claras
- [ ] Design responsivo em mobile

## ✅ Se todos os testes passarem...

**Parabéns! 🎉 O NewsHub está totalmente funcional!**

Agora você pode:
- Deployer em produção
- Adicionar mais funcionalidades
- Customizar o design
- Integrar com serviços adicionais
