const app = require('./app');
const env = require('./config/env');
const db = require('./config/db');

const PORT = env.PORT;

(async () => {
    try {
        await db.initializeDatabase();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize database:', error.message);
        process.exit(1);
    }
})();