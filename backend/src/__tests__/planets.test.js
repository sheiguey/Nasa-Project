const request = require('supertest')
const app = require('../app')

describe('Test for /planets',()=>{
    test('Get planet with response code 200',async ()=>{
      const response = await request(app).get('/planets')
        .expect('Content-Type',/json/)
        .expect(200);
    })
})