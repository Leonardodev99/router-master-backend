import User from "../models/User";


class HomeController {
  async index(req, res) {
    const novoUser = await User.create({
      username: 'Leonardodev',
      phone: '911679800',
      email: 'leonardo@gmail.com',
      password: '123456'
    });
    res.json(novoUser);
  }
}

export default new HomeController();
