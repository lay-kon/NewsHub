USE newshub;

-- Insert estados
INSERT INTO estados (estado) VALUES ('rascunho'), ('pendente'), ('publicado'), ('rejeitado');

-- Insert categorias
INSERT INTO categorias (nome) VALUES ('Política'), ('Economia'), ('Tecnologia'), ('Esportes'), ('Entretenimento');

-- Insert admin
INSERT INTO administradores (primeiro_nome, ultimo_nome, email, username, senha, pin) VALUES ('Admin', 'NewsHub', 'admin@newshub.com', 'admuser', '$2a$10$Vg.nWJnz0GOWAuPKZp6zeuM8YYIGPkNeZJM.e9Q2KEPT2mpTzz6tm', '97689763');

-- Insert autores
INSERT INTO leitorAutores (primeiro_nome, ultimo_nome, email, username, senha, biografia) VALUES 
('João', 'Silva', 'joao@newshub.com', 'joaosilva', '$2a$10$8WK33vnD5/0aR9JX.FQtXeOOOlMHgzB6yqRw/8eezmYoNelgzXE9G', 'Jornalista experiente.'),
('Maria', 'Santos', 'maria@newshub.com', 'mariasantos', '$2a$10$RFTOHV8VVFmFqtjNWMgEf.PBgIYRmFb3yxYj4sjWoPUANw2yWo1Im', 'Especialista em tecnologia.');

-- Insert publicacao
INSERT INTO publicacoes (titulo, resumo, conteudo, imagem_destaque, idestado, idautor, idCategoria) VALUES 
('Título da Notícia', 'Resumo da notícia...', 'Conteúdo completo da notícia...', 'imagem.jpg', 3, 1, 1);