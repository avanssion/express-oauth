function sendError(res, status, type, code, message) {
    return res.status(status).json({ type, code, message });
}

module.exports = sendError;
