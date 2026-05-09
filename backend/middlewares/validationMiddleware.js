const validationMiddleware = (req, res, next) => {
    // Basic validation example
    if (req.body.email && !req.body.email.includes('@')) {
        return res.status(400).json({ message: 'Invalid email' });
    }
    next();
};

module.exports = validationMiddleware;