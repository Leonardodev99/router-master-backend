import multer from "multer";
import multerConfig from "../config/multerConfig";

const upload = multer(multerConfig).single('photo');

class PhotoController {

  async Store(req, res) {


    return upload(req, res, (err) => {
      if(err) {
        return res.status(400).json({
          errors: [err.code]
        });
      }

      res.json(req.file)
    });
  }

}

export default new PhotoController;
