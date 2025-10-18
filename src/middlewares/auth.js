import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { unauthorized } from '../utils/http.js';

export function auth(required = true) {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) return required ? unauthorized(res) : next();

    try {
      const payload = jwt.verify(token, env.JWT_SECRET);
      req.user = payload;
      next();
    } catch (err) {
      return unauthorized(res, 'Token inválido');
    }
  };
}

export function isAdmin(req, res, next) {
  if (req.user?.role !== 'ADMIN') return unauthorized(res, 'Acesso restrito a admins');
  next();
}
