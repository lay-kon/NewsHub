-- Criação da base de dados
CREATE DATABASE IF NOT EXISTS newshub CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE newshub;

-- Tabela Administrador
CREATE TABLE IF NOT EXISTS administradores (
    idAdm INT AUTO_INCREMENT,
    primeiro_nome VARCHAR(100) NOT NULL,
    ultimo_nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(30) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    pin VARCHAR(10) NOT NULL UNIQUE,
    PRIMARY KEY (idAdm)
) DEFAULT CHARSET = utf8mb4;

-- Tabela LeitorAutor
CREATE TABLE IF NOT EXISTS leitorAutores (
    idLeitorAutor INT AUTO_INCREMENT,
    primeiro_nome VARCHAR(100) NOT NULL,
    ultimo_nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(30) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    biografia TEXT,
    foto_perfil VARCHAR(255),
    PRIMARY KEY (idLeitorAutor)
) DEFAULT CHARSET = utf8mb4;

-- Tabela Estados
CREATE TABLE IF NOT EXISTS estados (
    idestado INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(50)
) DEFAULT CHARSET = utf8mb4;

-- Tabela Categorias
CREATE TABLE IF NOT EXISTS categorias (
    idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
) DEFAULT CHARSET = utf8mb4;

-- Tabela Publicacao
CREATE TABLE IF NOT EXISTS publicacoes (
    idPublicacao INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    resumo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    data_publicacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    imagem_destaque VARCHAR(255),
    arquivo_pdf VARCHAR(255),
    idestado INT NOT NULL,
    idautor INT NOT NULL,
    idCategoria INT,
    FOREIGN KEY (idCategoria) REFERENCES categorias(idCategoria),
    FOREIGN KEY (idestado) REFERENCES estados(idestado),
    FOREIGN KEY (idautor) REFERENCES leitorAutores(idLeitorAutor) ON DELETE SET NULL
) DEFAULT CHARSET = utf8mb4;

-- Tabela Comentario
CREATE TABLE IF NOT EXISTS comentarios (
    id_comentario INT AUTO_INCREMENT PRIMARY KEY,
    conteudo TEXT NOT NULL,
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'pendente',
    idpublicacao INT NOT NULL,
    idleitor INT NOT NULL,
    FOREIGN KEY (idpublicacao) REFERENCES publicacoes(idPublicacao) ON DELETE CASCADE,
    FOREIGN KEY (idleitor) REFERENCES leitorAutores(idLeitorAutor) ON DELETE CASCADE
) DEFAULT CHARSET = utf8mb4;

-- Tabela Validacao
CREATE TABLE IF NOT EXISTS validacoes (
    idValidacao INT AUTO_INCREMENT PRIMARY KEY,
    idadm INT NOT NULL,
    idpublicacao INT NOT NULL,
    data_validacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idadm) REFERENCES administradores(idAdm),
    FOREIGN KEY (idpublicacao) REFERENCES publicacoes(idPublicacao)
) DEFAULT CHARSET = utf8mb4;

-- Tabela Telefones
CREATE TABLE IF NOT EXISTS telefones (
    idfone INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(20) UNIQUE,
    idleitorAutor INT,
    FOREIGN KEY (idleitorAutor) REFERENCES leitorAutores(idLeitorAutor) ON DELETE CASCADE
) DEFAULT CHARSET = utf8mb4;

-- Tabela Sites
CREATE TABLE IF NOT EXISTS sites (
    idsite INT AUTO_INCREMENT PRIMARY KEY,
    name_site VARCHAR(255) NOT NULL,
    link_site VARCHAR(255) NOT NULL,
    idleitorAutor INT,
    FOREIGN KEY (idleitorAutor) REFERENCES leitorAutores(idLeitorAutor) ON DELETE CASCADE
) DEFAULT CHARSET = utf8mb4;

-- Tabela Redes Sociais
CREATE TABLE IF NOT EXISTS redes_sociais (
    idrede INT AUTO_INCREMENT PRIMARY KEY,
    plataforma VARCHAR(100) NOT NULL,
    link_perfil VARCHAR(255) NOT NULL,
    idleitorAutor INT,
    FOREIGN KEY (idleitorAutor) REFERENCES leitorAutores(idLeitorAutor) ON DELETE CASCADE
) DEFAULT CHARSET = utf8mb4;