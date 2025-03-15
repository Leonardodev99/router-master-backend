import User from "../models/User";


class UserController {
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

    //Index
    async index (req, res) {
      try {
        const allUser = await User.findAll();
        return res.status(200).json(allUser);
      } catch (e) {
        return res.status(400).json('Error the find all users');
      }
    }

     //Show
     async show (req, res) {
      try {

        const user = await User.findByPk(req.params.id);
        return res.status(200).json(user);
      } catch (e) {
        return res.status(400).json(null);
      }
    }

    //update
    async update (req, res) {
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

        const newdate = await user.update(req.body);

        return res.status(200).json(newdate);

      } catch (e) {
        return res.status(400).json(null);
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
