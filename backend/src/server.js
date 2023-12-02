const http = require('http');
require('dotenv').config();
const app = require('./app');

const {mongoConnect}  = require('./utils/mongo')
const { loadPlanetsData } = require('./models/planets.model');
const {launch,saveLaunch} = require('./models/lauches.model');
const {loadLaunchData} = require ('./models/lauches.model')



const PORT = process.env.PORT || 8000;


const server = http.createServer(app);

async function startServer(){
  await mongoConnect()
  
  await loadPlanetsData()

  await loadLaunchData()
  
  await saveLaunch(launch)
  
  server.listen(PORT,()=>(
    console.log(`listen to port ${PORT}`)
    ))
    
  }

 
  startServer()
  