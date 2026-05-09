# 📊 Modelo de Dados - NewsHub

## 🗄️ Estrutura do Banco de Dados

```
newshub
├── administradores (admins do sistema)
├── leitorAutores (autores e leitores)
├── publicacoes (artigos/notícias)
├── comentarios (comentários nos artigos)
├── categorias (categorias de artigos)
├── estados (estados das publicações)
├── validacoes (log de aprovações)
├── telefones (contatos de autores)
├── sites (websites de autores)
├── redes_sociais (social media de autores)
└── [tabela de relacionamento]
```

---

## 📋 Tabelas Detalhadas

### 1. `administradores`
**Armazena informações dos administradores do sistema**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `idAdm` | INT | ID único (Primary Key) |
| `primeiro_nome` | VARCHAR(100) | Nome |
| `ultimo_nome` | VARCHAR(100) | Sobrenome |
| `email` | VARCHAR(100) | Email (Unique) |
| `username` | VARCHAR(30) | Usuário para login (Unique) |
| `senha` | VARCHAR(255) | Senha hasheada com bcrypt |
| `pin` | VARCHAR(10) | PIN de segurança (Unique) |

**Índices:** idAdm (PK), email (UNIQUE), username (UNIQUE)

**Exemplo:**
```sql
{
  idAdm: 1,
  primeiro_nome: "Admin",
  ultimo_nome: "NewsHub",
  email: "admin@newshub.com",
  username: "admin",
  senha: "$2a$10$examplehashedpassword",
  pin: "1234"
}
```

---

### 2. `leitorAutores`
**Armazena perfis de autores e leitores**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `idLeitorAutor` | INT | ID único (Primary Key) |
| `primeiro_nome` | VARCHAR(100) | Nome |
| `ultimo_nome` | VARCHAR(100) | Sobrenome |
| `email` | VARCHAR(100) | Email (Unique) |
| `username` | VARCHAR(30) | Usuário (Unique) |
| `senha` | VARCHAR(255) | Senha hasheada |
| `biografia` | TEXT | Biografia/descrição |
| `foto_perfil` | VARCHAR(255) | URL da foto de perfil |

**Índices:** idLeitorAutor (PK), email (UNIQUE), username (UNIQUE)

**Relacionamentos:**
- 1 autor → N publicações
- 1 leitor → N comentários

---

### 3. `publicacoes`
**Armazena artigos/notícias**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `idPublicacao` | INT | ID único (Primary Key) |
| `titulo` | VARCHAR(255) | Título do artigo |
| `resumo` | TEXT | Resumo/descrição breve |
| `conteudo` | LONGTEXT | Conteúdo completo |
| `imagem_destaque` | VARCHAR(255) | URL da imagem de capa |
| `arquivo_pdf` | VARCHAR(255) | URL do PDF (opcional) |
| `data_publicacao` | TIMESTAMP | Data de criação |
| `idestado` | INT | Estado (FK) |
| `idautor` | INT | Autor (FK) |
| `idCategoria` | INT | Categoria (FK, opcional) |

**Índices:** idPublicacao (PK), idestado (FK), idautor (FK), idCategoria (FK)

**Relacionamentos:**
- N publicações → 1 estado
- N publicações → 1 autor (leitorAutores)
- N publicações → 1 categoria
- 1 publicação → N comentarios

**Estados Possíveis:**
1. Rascunho (draft)
2. Pendente (awaiting approval)
3. Publicado (published)
4. Rejeitado (rejected)

---

### 4. `comentarios`
**Armazena comentários nas publicações**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id_comentario` | INT | ID único (Primary Key) |
| `conteudo` | TEXT | Texto do comentário |
| `data_hora` | TIMESTAMP | Data de criação |
| `estado` | ENUM | Estado (pendente/aprovado/rejeitado) |
| `idpublicacao` | INT | Publicação (FK) |
| `idleitor` | INT | Autor do comentário (FK) |

**Índices:** id_comentario (PK), idpublicacao (FK), idleitor (FK)

**Relacionamentos:**
- N comentários → 1 publicação
- N comentários → 1 leitor (leitorAutores)

---

### 5. `categorias`
**Armazena categorias de publicações**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `idCategoria` | INT | ID único (Primary Key) |
| `nome` | VARCHAR(100) | Nome da categoria (Unique) |

**Índices:** idCategoria (PK), nome (UNIQUE)

**Categorias Padrão:**
- Política
- Economia
- Tecnologia
- Esportes
- Entretenimento

**Relacionamentos:**
- 1 categoria → N publicações

---

### 6. `estados`
**Armazena os estados possíveis de publicações**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `idestado` | INT | ID único (Primary Key) |
| `estado` | VARCHAR(50) | Nome do estado |

**Índices:** idestado (PK)

**Estados Padrão:**
- 1: rascunho
- 2: pendente
- 3: publicado
- 4: rejeitado

---

### 7. `validacoes`
**Log de validações (aprovações/rejeições)**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `idValidacao` | INT | ID único (Primary Key) |
| `data_validacao` | TIMESTAMP | Data da validação |
| `idadm` | INT | Admin que validou (FK) |
| `idpublicacao` | INT | Publicação validada (FK) |

**Índices:** idValidacao (PK), idadm (FK), idpublicacao (FK)

---

### 8. `telefones`
**Telefones de contato dos autores**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `idfone` | INT | ID único (Primary Key) |
| `numero` | VARCHAR(20) | Número de telefone |
| `idleitorAutor` | INT | Autor (FK) |

**Relacionamentos:**
- N telefones → 1 autor

---

### 9. `sites`
**Websites/blogs dos autores**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `idsite` | INT | ID único (Primary Key) |
| `url` | VARCHAR(255) | URL do website |
| `idleitorAutor` | INT | Autor (FK) |

**Relacionamentos:**
- N sites → 1 autor

---

### 10. `redes_sociais`
**Perfis de redes sociais dos autores**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `idrede` | INT | ID único (Primary Key) |
| `tipo` | VARCHAR(50) | Tipo (Twitter, LinkedIn, etc) |
| `usuario` | VARCHAR(100) | Usuário/handle |
| `idleitorAutor` | INT | Autor (FK) |

**Relacionamentos:**
- N redes_sociais → 1 autor

---

## 🔗 Relacionamentos

### Diagrama ER (Entidade-Relacionamento)

```
administradores (1) ──── (N) validacoes
                         │
                         └──── (1) publicacoes

leitorAutores (1) ──────── (N) publicacoes
              │            │
              │            └──── (1) estados
              │
              ├──── (N) comentarios
              ├──── (N) telefones
              ├──── (N) sites
              └──── (N) redes_sociais

publicacoes (1) ──────── (N) comentarios
           │
           └──── (1) categorias

leitorAutores (1) ────── (N) comentarios
```

---

## 📊 Consultas Comuns

### Listar publicações com autor
```sql
SELECT p.*, la.primeiro_nome, la.ultimo_nome
FROM publicacoes p
JOIN leitorAutores la ON p.idautor = la.idLeitorAutor
WHERE p.idestado = 3; -- publicado
```

### Listar comentários aprovados de um artigo
```sql
SELECT c.*, la.primeiro_nome, la.ultimo_nome
FROM comentarios c
JOIN leitorAutores la ON c.idleitor = la.idLeitorAutor
WHERE c.idpublicacao = 1 AND c.estado = 'aprovado';
```

### Contar publicações por categoria
```sql
SELECT ca.nome, COUNT(*) as total
FROM publicacoes p
LEFT JOIN categorias ca ON p.idCategoria = ca.idCategoria
GROUP BY ca.nome;
```

### Publicações pendentes de aprovação
```sql
SELECT p.*, la.primeiro_nome, la.ultimo_nome
FROM publicacoes p
JOIN leitorAutores la ON p.idautor = la.idLeitorAutor
WHERE p.idestado = 2; -- pendente
```

### Histórico de validações de um admin
```sql
SELECT v.*, p.titulo
FROM validacoes v
JOIN publicacoes p ON v.idpublicacao = p.idPublicacao
WHERE v.idadm = 1
ORDER BY v.data_validacao DESC;
```

---

## 🔐 Constraint de Integridade

Todas as Foreign Keys têm:
- `ON DELETE SET NULL` para referências opcionais
- `ON DELETE CASCADE` para referências obrigatórias

Exemplo:
```sql
-- Se um autor é deletado, suas publicações são deletadas
ALTER TABLE publicacoes
ADD CONSTRAINT fk_autor
FOREIGN KEY (idautor) REFERENCES leitorAutores(idLeitorAutor)
ON DELETE CASCADE;
```

---

## 📈 Índices Criados

```sql
-- Primárias
PRIMARY KEY (idAdm)  -- administradores
PRIMARY KEY (idLeitorAutor)  -- leitorAutores
PRIMARY KEY (idPublicacao)  -- publicacoes
PRIMARY KEY (id_comentario)  -- comentarios

-- Únicas
UNIQUE (email)  -- administradores, leitorAutores
UNIQUE (username)  -- administradores, leitorAutores
UNIQUE (nome)  -- categorias

-- Estrangeiras
FOREIGN KEY (idestado) REFERENCES estados
FOREIGN KEY (idautor) REFERENCES leitorAutores
FOREIGN KEY (idCategoria) REFERENCES categorias
FOREIGN KEY (idpublicacao) REFERENCES publicacoes
FOREIGN KEY (idleitor) REFERENCES leitorAutores
```

---

## 💾 Backup do Banco

### Fazer backup
```bash
mysqldump -u root -p newshub > newshub_backup.sql
```

### Restaurar backup
```bash
mysql -u root -p newshub < newshub_backup.sql
```

---

## 🔍 Verificar Integridade

```sql
-- Verificar tabelas
USE newshub;
SHOW TABLES;

-- Verificar estrutura
DESCRIBE publicacoes;

-- Verificar relacionamentos
SELECT * FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'newshub';

-- Contar registros
SELECT 
  (SELECT COUNT(*) FROM administradores) as admins,
  (SELECT COUNT(*) FROM leitorAutores) as autores,
  (SELECT COUNT(*) FROM publicacoes) as publicacoes,
  (SELECT COUNT(*) FROM comentarios) as comentarios;
```
