const Client = require('../models/Client');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los clientes' });
  }
};

exports.createClient = async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el cliente' });
  }
};
