

class HomeController {
  index(req, res) {
    res.json({
      'tudoCerto': false,
    });
  }
}

export default new HomeController();
