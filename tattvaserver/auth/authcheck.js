module.exports = function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        req.session.touch();
        return next();
    }

    logger.debug('Unauthorised request found..!');
    res.status(401).json({
        "error": "Unauthorized request, please signin and retry..!"
    });
};
