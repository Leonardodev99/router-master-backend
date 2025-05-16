import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';


class TokenController {
  async store(req, res) {
    const { email = '', password = ''} = req.body;


    if(!email || !password) {
      return res.status(400).json({
        errors: ['Invalid credentials'],
      });
    }

    const user = await User.findOne({ where: { email }});


    if(!user) {
      return res.status(400).json({
        errors: ['User does not exist'],
      });
    }

     // Verificar a senha
     if (!(await bcryptjs.compare(password, user.password_hash))) {
      return res.status(401).json({
        errors: ['Invalid password']
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPERATION,
    });

    return res.json({ token });


  }
}

export default new TokenController();
