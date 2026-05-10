USE newshub;

-- Insert estados
INSERT INTO estados (estado) VALUES ('rascunho'), ('pendente'), ('publicado'), ('rejeitado');

-- Insert categorias
INSERT INTO categorias (nome) VALUES ('Política'), ('Economia'), ('Tecnologia'), ('Esportes'), ('Entretenimento');

-- Insert admin
INSERT INTO administradores (primeiro_nome, ultimo_nome, email, username, senha, pin) VALUES ('Admin', 'NewsHub', 'admin@newshub.com', 'admin', '$2a$10$53P2jxjJf5OK1iaWEM7tuOd0n1NrYumTkxmch0jHngTIjFtqpsOdW', '1234');

-- Insert autores
INSERT INTO leitorAutores (primeiro_nome, ultimo_nome, email, username, senha, biografia) VALUES 
('João', 'Silva', 'joao@newshub.com', 'joaosilva', '$2a$10$oUXAG5ZdEq3ccWq3q7Sby.eUHGPjlcwFItWTk/4QxWd.LHGu5BsCW', 'Jornalista experiente.'),
('Maria', 'Santos', 'maria@newshub.com', 'mariasantos', '$2a$10$00ZsCge1Tyqxn3nqiB.9oeaUQee2LtxlbfZPKrAReDurn2Io5UhsS', 'Especialista em tecnologia.');

-- Insert publicacao
INSERT INTO publicacoes (titulo, resumo, conteudo, imagem_destaque, idestado, idautor, idCategoria) VALUES 
('Título da Notícia', 'Resumo da notícia...', 'Conteúdo completo da notícia...', 'imagem.jpg', 3, 1, 1);