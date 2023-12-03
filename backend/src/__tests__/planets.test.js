require('dotenv').config();
const request = require('supertest');
const app = require('../app')
const {mongoConnect,mongoDisconnect} = require('../utils/mongo');
const {loadPlanetsData } =require('../models/planets.model')



describe('test for planets API',()=>{
  beforeAll(async()=>{
    await mongoConnect();
    await loadPlanetsData();
  },200000)

 
  describe('Test for /planets',()=>{
      test('Get planet with response code 200',async ()=>{
        const response = await request(app).get('/v1/planets')
          .expect('Content-Type',/json/)
          .expect(200);
      },500000)
  })
})
