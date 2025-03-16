import Contact from '../models/Contact';
import User from '../models/User';

class ContactController {
  // Método para adicionar um contato
  async store(req, res) {
    try {
      const { phone } = req.body;
      const user_id = req.userId; // ID do usuário autenticado

      // Verifica se o número de telefone pertence a um usuário do sistema
      const contact = await User.findOne({ where: { phone } });

      if (!contact) {
        return res.status(404).json({ errors: ['Este número não está no Router Master.'] });
      }

      // Verifica se o usuário já adicionou esse contato antes
      const contactExists = await Contact.findOne({
        where: { user_id, contact_id: contact.id },
      });

      if (contactExists) {
        return res.status(400).json({ errors: ['Este contato já foi adicionado.'] });
      }

      // Criar o contato
      const newContact = await Contact.create({
        user_id,
        contact_id: contact.id,
      });

      return res.status(201).json(newContact);
    } catch (error) {
      console.error('Erro ao adicionar contato:', error);
      return res.status(500).json({ errors: ['Erro ao adicionar contato.'] });
    }
  }

  // Método para listar os contatos do usuário
  async index(req, res) {
    try {
      const user_id = req.userId;

      const contacts = await Contact.findAll({
        where: { user_id },
        include: [
          {
            model: User,
            as: 'contact',
            attributes: ['id', 'username', 'phone', 'email'],
          },
        ],
      });

      if (contacts.length === 0) {
        return res.status(404).json({ errors: ['Nenhum contato encontrado.'] });
      }

      return res.json(contacts);
    } catch (error) {
      console.error('Erro ao listar contatos:', error);
      return res.status(500).json({ errors: ['Erro ao listar contatos.'] });
    }
  }
}

export default new ContactController();
