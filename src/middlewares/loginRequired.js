import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Precisa fazer login'],
    });
  }

  // Divide o valor do header em "Bearer" e o token
  const [bearer, tokenUser] = authorization.split(' ');

  if (!bearer || !tokenUser || bearer !== 'Bearer') {
    return res.status(401).json({
      errors: ['Token inválido ou mal formatado'],
    });
  }

  try {
    const dados = jwt.verify(tokenUser, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};

