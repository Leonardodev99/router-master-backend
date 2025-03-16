import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

class GeneralizedPasswordRecoveryController {
  // Solicitar redefinição de senha
  async requestReset(req, res) {
    try {
      const { email } = req.body;

      // Verificar se o email existe
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      // Gerar token de recuperação
      const token = uuidv4();
      const now = new Date();
      const expires = new Date(now.getTime() + 3600000); // Expira em 1 hora

      // Atualizar usuário com token e data de expiração
      await user.update({
        password_reset_token: token,
        password_reset_expires: expires,
      });

      // Configurar transporte de email
      const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        port: Number(process.env.SMTP_PORT),
        secure: Boolean(process.env.SMTP_SECURE),
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      // Configurar email
      const mailOptions = {
        from: process.env.SMTP_USERNAME,
        to: email,
        subject: 'Recuperação de Senha',
        text: `Você solicitou uma redefinição de senha. Use este token para redefinir sua senha: ${token}\nEste token expira em 1 hora.`,
        html: `
          <h2>Recuperação de Senha</h2>
          <p>Você solicitou uma redefinição de senha.</p>
          <p>Use este token para redefinir sua senha: <strong>${token}</strong></p>
          <p>Este token expira em 1 hora.</p>
        `,
      };

      // Enviar email
      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        message: 'Email de recuperação enviado com sucesso'
      });

    } catch (error) {
      console.error('Erro ao solicitar redefinição de senha:', error);
      return res.status(500).json({
        error: 'Erro interno ao processar solicitação'
      });
    }
  }

  // Redefinir a senha
  async resetPassword(req, res) {
    try {
      const { email, token, newPassword } = req.body;

      // Buscar usuário
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      // Verificar token e expiração
      if (user.password_reset_token !== token) {
        return res.status(400).json({ error: 'Invalid token' });
      }

      if (new Date() > user.password_reset_expires) {
        return res.status(400).json({ error: 'Token expired' });
      }

      // Atualizar senha
      user.password = newPassword;
      user.password_reset_token = null;
      user.password_reset_expires = null;

      await user.save();

      return res.status(200).json({
        message: 'Senha redefinida com sucesso'
      });

    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return res.status(500).json({
        error: 'Erro interno ao redefinir senha'
      });
    }
  }
}

export default new GeneralizedPasswordRecoveryController();
