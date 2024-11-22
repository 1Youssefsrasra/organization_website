const request = require('supertest');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const Demande = require('../models/Demande');
const demandeController = require('../controllers/demandesController');

const app = express();
app.use(express.json());
app.post('/demandes', demandeController.addDemande);
app.get('/demandes', demandeController.getALLDemandes);
app.delete('/demandes/:id', demandeController.deleteDemande);

// Connect to your local MongoDB instance before running the tests
beforeAll(async () => {
  jest.setTimeout(10000);
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clean up the database after all tests are done
afterAll(async () => {
  await Demande.deleteMany({});
  await mongoose.disconnect();
});

describe('Demande Controller', () => {
  it('should add a new demande', async () => {
    const res = await request(app)
      .post('/demandes')
      .send({ title: 'Test Demande', description: 'Test description' });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data.title).toBe('Test Demande'); // Check if title matches
    expect(res.body.data.description).toBe('Test description'); // Check if description matches
  });

  it('should get all demandes', async () => {
    const res = await request(app).get('/demandes');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should delete a demande', async () => {
    const newDemande = new Demande({ title: 'Delete Test', description: 'Delete description' });
    await newDemande.save();

    const res = await request(app).delete(`/demandes/${newDemande._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Demande deleted successfully');

    // Verify that the demande has been deleted
    const findRes = await request(app).get('/demandes');
    const deletedDemande = findRes.body.data.find(demande => demande._id === newDemande._id);
    expect(deletedDemande).toBeUndefined(); // Ensure the demande does not exist
  });
});
