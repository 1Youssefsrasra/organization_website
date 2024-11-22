const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const MessageContact = require('../models/MessageContact');
const messageContactController = require('../controllers/messageContactController');
require('dotenv').config();

const app = express();
app.use(express.json());
app.post('/messages', messageContactController.addMessageContact);
app.get('/messages', messageContactController.getMessagesContact);
app.delete('/messages/:id', messageContactController.deleteMessageContact);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await MessageContact.deleteMany({});
  await mongoose.disconnect();
});

describe('Message Contact Controller (Boîte Blanche)', () => {
  it('should add a new message contact (check steps)', async () => {
    const res = await request(app)
      .post('/messages')
      .send({ fullname: 'John Doe', email: 'john@example.com', text: 'Hello!' });

    // Vérifie les étapes de création
    expect(res.statusCode).toBe(201);                          // Étape 1 : Vérifie le code de statut
    expect(res.body.success).toBe(true);                       // Étape 2 : Vérifie le succès
    expect(res.body.messageContact).toHaveProperty('_id');     // Étape 3 : Vérifie l'ID de l'instance créée
  });

  it('should get all messages (check steps)', async () => {
    const res = await request(app).get('/messages');

    // Vérifie les étapes de récupération
    expect(res.statusCode).toBe(200);                          // Étape 1 : Vérifie le code de statut
    expect(Array.isArray(res.body)).toBe(true);                // Étape 2 : Vérifie que la réponse est un tableau
  });

  it('should delete a message contact (check steps)', async () => {
    const newMessage = new MessageContact({ fullname: 'Jane Doe', email: 'jane@example.com', text: 'Hi!' });
    await newMessage.save();

    const res = await request(app).delete(`/messages/${newMessage._id}`);

    // Vérifie les étapes de suppression
    expect(res.statusCode).toBe(200);                           // Étape 1 : Vérifie le code de statut
    expect(res.body.success).toBe(true);                        // Étape 2 : Vérifie le succès de la suppression
    expect(res.body.message).toBe('MessageContact deleted successfully');  // Étape 3 : Message de confirmation
  });
});
