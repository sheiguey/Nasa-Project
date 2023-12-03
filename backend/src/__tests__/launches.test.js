require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const {mongoConnect,mongoDisconnect} = require('../utils/mongo');
const { loadPlanetsData } = require('../models/planets.model');



describe('tests for launches API endpoint', ()=>{

beforeAll(async()=>{
await mongoConnect();
await loadPlanetsData();
},300000);

afterAll(async()=>{
    await mongoDisconnect();
});
  
describe('Test Get /launches',()=>{
    test('the request should respond with 200',async ()=>{
       const response= await request(app).get('/v1/launches')
       .expect('Content-Type',/json/)
       .expect(200);
   },200000)
});

describe('Test Post /launches',()=>{
    const completeLaunchData = {
        mission:'Cameroon space enterprise',
        rocket:'NCC 1701-D',
        target:'Kepler 186 f',
        launchDate:'January 4,2028'
    }

    const launchDataWithoutDate = {
        mission:'Cameroon space enterprise',
        rocket:'NCC 1701-D',
        target:'Kepler 186 f',
      
    }

    const launchDataWithInvalidDate = {
        mission:'Cameroon space enterprise',
        rocket:'NCC 1701-D',
        target:'Kepler 186 f',
        launchDate:"zuuut"
    }


    test('it should respond with status code 201 created',async()=>{
        const response= await request(app).post('/v1/launches')
        .send(completeLaunchData)
       .expect('Content-Type',/json/)
       .expect(201);

       const requestDate = new Date(completeLaunchData.launchDate).valueOf();
       const responseDate =new Date(response.body.launchDate).valueOf() ;
      
       //expect(requestDate).toBe(responseDate);
       //expect(response.body).toMatchObject(launchDataWithoutDate);

    },200000)

    test('it should catch missing required properties',async()=>{
        const response= await request(app).post('/v1/launches')
       .send(launchDataWithoutDate)
       .expect('Content-Type',/json/)
       .expect(400);
      
       expect(response.body).toStrictEqual({
        error:'Missing require lauch property'
    });
    },200000)


    test('it should catch invalid date',async()=>{
        const response= await request(app).post('/v1/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-Type',/json/)
        .expect(400);

       expect(response.body).toStrictEqual({
        error:'invalid date'
    });
    },200000)

})

})