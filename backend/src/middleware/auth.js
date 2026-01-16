const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Acesso não autorizado' });

  const secret = process.env.JWT_SECRET || 'hotel_vms_secret';

jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(401).json({ message: 'Token inválido ou expirado' });
    req.user = user;
    next();
  });
};