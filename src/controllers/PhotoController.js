import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Photo from '../models/Photo';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  // Cadastrar Foto
  async store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { filename } = req.file;
        const user_id = req.userId; // Obtendo ID do usuário autenticado

        // Salvar no banco de dados
        const photo = await Photo.create({
          filename,
          url: `${process.env.APP_URL}/uploads/images/${filename}`,
          user_id,
        });

        return res.json(photo);
      } catch (error) {
        return res.status(400).json({
          errors: ['Erro ao salvar a foto.'],
        });
      }
    });
  }

  // Atualizar Foto
  async update(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const user_id = req.userId;
        const { filename } = req.file;

        const photo = await Photo.findOne({ where: { user_id } });

        if (!photo) {
          return res.status(404).json({ errors: ['Foto não encontrada.'] });
        }

        // Atualizar foto
        await photo.update({
          filename,
          url: `${process.env.APP_URL}/uploads/${filename}`,
        });

        return res.json(photo);
      } catch (error) {
        return res.status(400).json({
          errors: ['Erro ao atualizar a foto.'],
        });
      }
    });
  }
}

export default new PhotoController();
