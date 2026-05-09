# 📚 Referência de API - NewsHub

## 🔐 Autenticação

Todas as rotas protegidas requerem:
```
Header: Authorization: Bearer <seu_token_jwt>
```

Tokens são obtidos via login e expiram em 24 horas.

---

## 👤 Administradores

### POST `/api/admins/login`
**Faça login como administrador**

**Request:**
```json
{
  "username": "admin",
  "senha": "sua_senha"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5...",
  "id": 1,
  "username": "admin",
  "nome": "Admin NewsHub",
  "email": "admin@newshub.com"
}
```

---

### GET `/api/admins` ✅
**Listar todos os administradores**

**Requer:** Autenticação

**Response:** `200 OK`
```json
[
  {
    "idAdm": 1,
    "primeiro_nome": "Admin",
    "ultimo_nome": "NewsHub",
    "email": "admin@newshub.com",
    "username": "admin"
  }
]
```

---

### POST `/api/admins` 
**Criar novo administrador**

**Request:**
```json
{
  "primeiro_nome": "João",
  "ultimo_nome": "Silva",
  "email": "joao@admin.com",
  "username": "joaosilva",
  "senha": "senha123",
  "pin": "1234"
}
```

**Response:** `201 Created`
```json
{
  "id": 2,
  "message": "Admin criado com sucesso"
}
```

---

## ✍️ Autores / Leitores

### POST `/api/autores/login`
**Faça login como autor**

**Request:**
```json
{
  "username": "joaosilva",
  "senha": "senha123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5...",
  "autorId": 1,
  "nome": "João Silva"
}
```

---

### POST `/api/autores/registro`
**Registrar novo autor**

**Request:**
```json
{
  "primeiro_nome": "João",
  "ultimo_nome": "Silva",
  "email": "joao@newshub.com",
  "username": "joaosilva",
  "senha": "senha123",
  "biografia": "Sou jornalista desde 2020"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "message": "Autor criado com sucesso"
}
```

---

### GET `/api/autores`
**Listar todos os autores**

**Response:** `200 OK`
```json
[
  {
    "idLeitorAutor": 1,
    "primeiro_nome": "João",
    "ultimo_nome": "Silva",
    "email": "joao@newshub.com",
    "username": "joaosilva",
    "biografia": "Sou jornalista desde 2020"
  }
]
```

---

## 📰 Publicações

### GET `/api/publicacoes`
**Listar todas as publicações**

**Response:** `200 OK`
```json
[
  {
    "idPublicacao": 1,
    "titulo": "Notícia Importante",
    "resumo": "Resumo da notícia...",
    "conteudo": "Conteúdo completo...",
    "imagem_destaque": "https://...",
    "primeiro_nome": "João",
    "ultimo_nome": "Silva",
    "estado": "publicado",
    "categoria": "Tecnologia",
    "data_publicacao": "2024-01-15T10:30:00Z"
  }
]
```

---

### GET `/api/publicacoes/:id`
**Obter publicação específica**

**URL:** `/api/publicacoes/1`

**Response:** `200 OK`
```json
{
  "idPublicacao": 1,
  "titulo": "Notícia Importante",
  "resumo": "Resumo da notícia...",
  "conteudo": "Conteúdo completo...",
  "imagem_destaque": "https://...",
  "primeiro_nome": "João",
  "ultimo_nome": "Silva",
  "estado": "publicado",
  "categoria": "Tecnologia"
}
```

---

### GET `/api/publicacoes/estado/:estado`
**Listar publicações por estado**

**URL:** `/api/publicacoes/estado/publicado`

**Estados válidos:** `rascunho`, `pendente`, `publicado`, `rejeitado`

**Response:** `200 OK`
```json
[...]
```

---

### POST `/api/publicacoes` ✅
**Criar nova publicação**

**Requer:** Autenticação

**Request:**
```json
{
  "titulo": "Nova Notícia",
  "resumo": "Resumo da notícia",
  "conteudo": "Conteúdo completo da notícia",
  "imagem_destaque": "https://...",
  "idestado": 2,
  "idautor": 1,
  "idCategoria": 1
}
```

**Estados:**
- 1 = Rascunho
- 2 = Pendente (para aprovação)
- 3 = Publicado
- 4 = Rejeitado

**Response:** `201 Created`
```json
{
  "id": 2,
  "message": "Publicação criada com sucesso"
}
```

---

### PUT `/api/publicacoes/:id` ✅
**Atualizar publicação**

**Requer:** Autenticação

**Request:** (mesmo formato de POST)

**Response:** `200 OK`
```json
{
  "message": "Publicação atualizada com sucesso"
}
```

---

### DELETE `/api/publicacoes/:id` ✅
**Deletar publicação**

**Requer:** Autenticação

**Response:** `200 OK`
```json
{
  "message": "Publicação deletada com sucesso"
}
```

---

### POST `/api/publicacoes/:id/validate` ✅
**Validar/aprovar publicação (Admin)**

**Requer:** Autenticação como Admin

**URL:** `/api/publicacoes/1/validate`

**Response:** `200 OK`
```json
{
  "message": "Publicação aprovada com sucesso"
}
```

---

## 💬 Comentários

### GET `/api/comentarios/publicacao/:id`
**Listar comentários de uma publicação**

**URL:** `/api/comentarios/publicacao/1`

**Response:** `200 OK`
```json
[
  {
    "id_comentario": 1,
    "conteudo": "Ótimo artigo!",
    "primeiro_nome": "Maria",
    "ultimo_nome": "Santos",
    "data_hora": "2024-01-15T10:35:00Z",
    "estado": "aprovado"
  }
]
```

---

### POST `/api/comentarios`
**Criar novo comentário**

**Request:**
```json
{
  "conteudo": "Ótimo artigo! Muito informativo.",
  "idpublicacao": 1,
  "idleitor": 1
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "message": "Comentário criado com sucesso"
}
```

---

### POST `/api/comentarios/:id/approve` ✅
**Aprovar comentário (Admin)**

**URL:** `/api/comentarios/1/approve`

**Response:** `200 OK`
```json
{
  "message": "Comentário aprovado com sucesso"
}
```

---

### POST `/api/comentarios/:id/reject` ✅
**Rejeitar comentário (Admin)**

**URL:** `/api/comentarios/1/reject`

**Response:** `200 OK`
```json
{
  "message": "Comentário rejeitado com sucesso"
}
```

---

## 📂 Categorias

### GET `/api/categorias`
**Listar todas as categorias**

**Response:** `200 OK`
```json
[
  {
    "idCategoria": 1,
    "nome": "Tecnologia"
  },
  {
    "idCategoria": 2,
    "nome": "Política"
  }
]
```

---

### POST `/api/categorias` ✅
**Criar nova categoria**

**Requer:** Autenticação

**Request:**
```json
{
  "nome": "Esportes"
}
```

**Response:** `201 Created`
```json
{
  "id": 6,
  "message": "Categoria criada com sucesso"
}
```

---

## 📊 Estados

### GET `/api/estados`
**Listar todos os estados**

**Response:** `200 OK`
```json
[
  {
    "idestado": 1,
    "estado": "rascunho"
  },
  {
    "idestado": 2,
    "estado": "pendente"
  },
  {
    "idestado": 3,
    "estado": "publicado"
  },
  {
    "idestado": 4,
    "estado": "rejeitado"
  }
]
```

---

## 🔴 Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 200 | OK - Sucesso |
| 201 | Created - Recurso criado |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Não autenticado ou credenciais inválidas |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro no servidor |

---

## 📝 Exemplo de Fluxo Completo

```bash
# 1. Login como admin
curl -X POST http://localhost:3000/api/admins/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","senha":"password"}' \
  > response.json

# Salvar token
TOKEN=$(jq -r '.token' response.json)

# 2. Criar publicação (requer token)
curl -X POST http://localhost:3000/api/publicacoes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "titulo":"Nova Notícia",
    "resumo":"Resumo",
    "conteudo":"Conteúdo completo",
    "idestado":3,
    "idautor":1
  }'

# 3. Listar publicações
curl http://localhost:3000/api/publicacoes

# 4. Buscar publicação específica
curl http://localhost:3000/api/publicacoes/1
```

---

## ✅ Teste Rápido

```bash
# Testar se a API está funcionando
curl http://localhost:3000/api/publicacoes

# Deve retornar um array JSON
```

Se receber um erro, verifique:
- ✅ Servidor está rodando (`npm run dev`)
- ✅ MySQL está ativo e configurado
- ✅ Banco `newshub` foi criado
- ✅ Scripts SQL foram executados
