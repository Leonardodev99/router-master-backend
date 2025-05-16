import User from "../models/User";
import Photo from '../models/Photo';


class UserController {
  //Criar conta
  async store(req, res) {

    try {
      const { username, phone, email, password } = req.body;
      const newUser = await User.create({ username, phone, email, password });
      return res.json({
        username: newUser.username,
        phone: newUser.phone,
        email: newUser.email,
        password: newUser.password
      });

    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });

    }
  }

  // Consultar perfil
  async userprofile(req, res) {
    try {

      const user= await User.findByPk(req.userId,{
        attributes: ['username', 'email', 'phone'],
        include: {
          model: Photo,
          as: 'photos',
          attributes:['url', 'filename']
        },

      });
      if (!user) {
        return res.status(404).json({
          errors: ['User not found'],
        });
      }
      return res.json(user);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }

  // Atualizar perfil
  async update(req, res) {
    try {

      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não encontrado'],
        });
      }

      const { username, email, phone } = req.body;

      await user.update({ username, email, phone });

      if (req.file) {
        const { filename } = req.file;

        // Aqui você pode criar uma nova Photo ou atualizar a existente
        await Photo.create({
          user_id: user.id,
          filename,
          url: `http://localhost:3005/uploads/images/${filename}`,
        });
      }

      const updatedUser = await User.findByPk(req.userId, {
        attributes: ['username', 'email', 'phone'],
        include: {
          model: Photo,
          as: 'photos',
          attributes: ['url', 'filename'],
        },
      });

      return res.json(updatedUser);

    }catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }
    //Destroy
    async delete (req, res) {
      try {

        if(!req.params.id) {
          return res.status(400).json({
            errors: ['ID invalided']
          });
        }

        const user = await User.findByPk(req.params.id);

        if(!user) {
          return res.status(400).json({
            errors: ['User dont found!']
          });
        }

         await user.destroy();
         return res.json(user);


      } catch (e) {
        return res.status(400).json(null);
      }
    }

}

export default new UserController();
