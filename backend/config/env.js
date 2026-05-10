require('dotenv').config();

module.exports = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'newshub',
    JWT_SECRET: process.env.JWT_SECRET || 'newshub_secret',
    PORT: process.env.PORT || 3000
};