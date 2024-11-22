const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Event = require('../models/Event');
const eventController = require('../controllers/eventController');

const app = express();
app.use(express.json());
app.get('/event', eventController.getEvent);
app.put('/event', eventController.updateEvent);

// Connect to your local MongoDB instance before running the tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

// Clean up the database after all tests are done
afterAll(async () => {
  await Event.deleteMany({});
  await mongoose.disconnect();
});

describe('Event Controller', () => {
  it('should get an event', async () => {
    const event = new Event({ name: 'Event Test', date: '2024-10-30' });
    await event.save();

    const res = await request(app).get('/event');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should update an event', async () => {
  // Créez un événement initial
  const event = new Event({ title: 'Old Event', description: 'Description here', images: [] });
  await event.save();

  // Mettez à jour l'événement
  const res = await request(app)
    .put('/event')
    .send({ id: event._id, title: 'Updated Event', description: 'Updated description', images: [] });

  // Vérifiez les résultats
  expect(res.statusCode).toBe(200);
  expect(res.body.title).toBe('Updated Event');
});

});
