import Walk from '../models/Walk';
import User from '../models/User';
import axios from 'axios';

class WalkController {
  // Método para calcular distância via OpenRouteService API
  async calculateDistance(origin, destination) {
    try {
      const apiKey = process.env.OPENROUTESERVICE_API_KEY; // Chave da API
      const orsUrl = `https://api.openrouteservice.org/v2/directions/foot-walking`;

      // Formatar coordenadas corretamente (longitude, latitude)
      const coordinates = {
        coordinates: [
          [origin.lng, origin.lat], // Origem
          [destination.lng, destination.lat] // Destino
        ]
      };

      console.log("Enviando para OpenRouteService:", coordinates); // Debug

      const response = await axios.post(orsUrl, coordinates, {
        headers: {
          "Authorization": apiKey, // A API espera um header Authorization
          "Content-Type": "application/json",
        }
      });

      if (!response.data.routes || response.data.routes.length === 0) {
        console.error("Erro na resposta da API:", response.data);
        return null;
      }

      const distance = response.data.routes[0].summary.distance / 1000; // Convertendo metros para km
      return distance;
    } catch (error) {
      console.error("Erro ao calcular a distância:", error.response?.data || error.message);
      return null;
    }
  }




  // Cadastrar uma nova caminhada
  async store(req, res) {
    try {
      const { origin, destination, transport_way } = req.body;
      const user_id = req.userId;

      // Verifica se o usuário existe
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ errors: ['Usuário não encontrado'] });
      }

      // Calculando a distância entre os pontos (Corrigido)
      const distance = await WalkController.prototype.calculateDistance(origin, destination);
      if (distance === null) {
        return res.status(400).json({ errors: ['Não foi possível calcular a distância'] });
      }

      // Criar a caminhada no banco de dados
      const walk = await Walk.create({
        origin: `${origin.lat},${origin.lng}`,
        destination: `${destination.lat},${destination.lng}`,
        transport_way,
        distance,
        user_id,
      });

      return res.status(201).json(walk);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errors: ['Erro ao registrar a caminhada'] });
    }
  }

  // Listar caminhadas do usuário logado
  async index(req, res) {
    try {
      const user_id = req.userId; // Obtendo o ID do usuário autenticado

      const walks = await Walk.findAll({
        where: { user_id },
        attributes: ['id', 'origin', 'destination', 'transport_way', 'distance', 'created_at'],
        order: [['created_at', 'DESC']], // Ordenando pela mais recente
      });

      if (walks.length === 0) {
        return res.status(404).json({ errors: ['Nenhuma caminhada encontrada para este usuário.'] });
      }

      return res.json(walks);
    } catch (error) {
      console.error('Erro ao listar caminhadas:', error);
      return res.status(500).json({ errors: ['Erro ao buscar caminhadas do usuário.'] });
    }
  }
}

export default new WalkController();
