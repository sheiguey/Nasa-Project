const request = require('supertest');

const {mongoConnect,mongoDisconnect} = require('../utils/mongo');

const app = require('../app')

describe('test for planets API',()=>{
  
  beforeAll(async()=>{
    await mongoConnect()
  },200000)

 afterAll(async()=>{
    await mongoDisconnect();
});
  

  describe('Test for /planets',()=>{
      test('Get planet with response code 200',async ()=>{
        const response = await request(app).get('/planets')
          .expect('Content-Type',/json/)
          .expect(200);
      },500000)
  })
})
