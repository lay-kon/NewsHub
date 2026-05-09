// Helper functions
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR');
};

const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
};

module.exports = {
    formatDate,
    truncateText
};