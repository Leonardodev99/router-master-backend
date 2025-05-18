import Message from '../models/Message.js';
import User from '../models/User.js';
import { Op } from 'sequelize';

class MessageController {
  async index(req, res) {
    const userId = req.userId;
    const { username } = req.params;

    const otherUser = await User.findOne({ where: { username } });
    if (!otherUser) return res.status(404).json({ error: 'Usuário não encontrado' });

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: userId, recipient_id: otherUser.id },
          { sender_id: otherUser.id, recipient_id: userId },
        ],
      },
      order: [['created_at', 'ASC']],
    });

    res.json(messages);
  }
}

export default new MessageController();
