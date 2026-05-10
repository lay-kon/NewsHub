# 🚀 Início Rápido - NewsHub

## ⚡ 5 Passos para Começar

### 1️⃣ Preparar o Banco de Dados

```bash
# Abra o MySQL
mysql -u root -p

# Dentro do MySQL, execute:
CREATE DATABASE newshub CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE newshub;
SOURCE database/schema.sql;
SOURCE database/seed.sql;
EXIT;
```

### 2️⃣ Configurar Variáveis de Ambiente

Edite o arquivo `.env` diretamente com suas credenciais MySQL e configurações.

### 3️⃣ Instalar Dependências

```bash
npm install
```

### 4️⃣ Iniciar o Servidor

```bash
# Desenvolvimento (com reload automático)
npm run dev

# Ou produção
npm start
```

**Sucesso!** Servidor rodando em: **http://localhost:3000**

### 5️⃣ Fazer Login

#### 👨‍💼 Como Admin
1. Acesse: http://localhost:3000/pages/login.html
2. Usuário: `admuser`
3. Senha: `AdmUserSecret2026!`
4. PIN: `97689763`
5. ID do admin: `1`

#### ✍️ Como Autor
1. Acesse: http://localhost:3000/pages/author-register.html
2. Crie uma nova conta
3. Faça login em: http://localhost:3000/pages/author-login.html

#### 📖 Como Leitor
1. Acesse: http://localhost:3000
2. Navegue livremente (sem login necessário)

---

## 📚 Páginas Principais

| Página | URL | Descrição |
|--------|-----|-----------|
| Home | `/` | Últimas notícias |
| Publicações | `/pages/publicacoes.html` | Todas as publicações |
| Artigo | `/pages/detalhes.html?id=1` | Lê artigo + comentários |
| **Admin** | | |
| Login Admin | `/pages/login.html` | Fazer login como admin |
| Dashboard Admin | `/pages/dashboard.html` | Aprovar/rejeitar publicações |
| **Autor** | | |
| Registro | `/pages/author-register.html` | Criar conta de autor |
| Login Autor | `/pages/author-login.html` | Fazer login como autor |
| Dashboard Autor | `/pages/author-dashboard.html` | Gerenciar meus artigos |

---

## 🔧 Troubleshooting Rápido

### Erro: "Cannot connect to database"
```bash
# Verifique se MySQL está rodando
# Linux/Mac:
mysql --version

# Windows (se instalado):
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql" --version

# Inicie o MySQL (se não estiver rodando)
```

### Erro: "Database not found"
```bash
# Confirme que executou os scripts SQL
mysql -u root -p newshub
SHOW TABLES;  # Deve listar as tabelas
EXIT;
```

### Erro: "Cannot GET /"
- Verifique se o servidor iniciou sem erros
- Confirme que `frontend/` existe no diretório raiz

### Nenhuma publicação aparece
- Admin criou alguma publicação?
- A publicação tem estado "publicado"?
- Verifique console (F12) para erros

---

## 📞 Próximos Passos

1. ✅ Verificar se tudo funciona (veja [TESTING.md](TESTING.md))
2. 📖 Ler documentação completa (veja [README.md](README.md))
3. 🎨 Customizar design em `frontend/css/style.css`
4. 🔐 Trocar credenciais padrão em produção
5. 🚀 Fazer deploy

---

## 💡 Dicas Úteis

### Adicionar um novo admin
```bash
# Via API
curl -X POST http://localhost:3000/api/admins \
  -H "Content-Type: application/json" \
  -d '{
    "primeiro_nome":"Novo",
    "ultimo_nome":"Admin",
    "email":"novo@admin.com",
    "username":"novoadmin",
    "senha":"senha123",
    "pin":"1234"
  }'
```

### Resetar banco de dados
```bash
mysql -u root -p newshub < database/schema.sql
mysql -u root -p newshub < database/seed.sql
```

### Ver logs do servidor
O servidor mostra logs no terminal quando:
- Requisições chegam
- Erros ocorrem
- Conexões de banco de dados

---

## 🎯 Fluxo Típico de Teste

1. **Abra http://localhost:3000** → Veja notícias
2. **Registre como autor** → http://localhost:3000/pages/author-register.html
3. **Faça login como autor** → http://localhost:3000/pages/author-login.html
4. **Crie um artigo** → Dashboard autor
5. **Faça login como admin** → http://localhost:3000/pages/login.html
6. **Aprove o artigo** → Dashboard admin
7. **Veja na home** → http://localhost:3000

---

**Pronto! 🎉 Você está pronto para usar o NewsHub!**

Para mais detalhes, consulte [README.md](README.md)
