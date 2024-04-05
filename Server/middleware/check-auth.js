const jwt = require('jsonwebtoken');

function checkAuth(role) {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.JWT_KEY);
            req.userData = decodedToken;
            const userRole = decodedToken.role;

            if (userRole === role) {
                if (role === 'admin') {
                    next();
                } else if (role === 'peserta_magang') {
                    const userId = decodedToken.userId;
                    const id = req.params.id;

                    if (id == userId) {
                        next();
                    } else {
                        return res.status(403).json({
                            'message': "Bukan milik anda"
                        });
                    }
                }
            } else {
                return res.status(403).json({
                    'message': `Bukan ${role}`
                });
            }
            
        } catch (error) {
            return res.status(401).json({
                'message': "Invalid or expired token!",
                'error': error
            });
        }
    };
}

module.exports = {
    checkAuth: checkAuth
};