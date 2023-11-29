const http = require('http');
const app = require('./app');

const {mongoConnect}  = require('./utils/mongo')
const { loadPlanetsData } = require('./models/planets.model');
const {launch,saveLaunch} = require('./models/lauches.model')


const PORT = process.env.PORT || 3030 ;



const server = http.createServer(app) ;

async function startServer(){
  await mongoConnect()
  
  await loadPlanetsData()
  
  await saveLaunch(launch)
  
  server.listen(PORT,()=>(
    console.log(`listen to port ${PORT}`)
    ))
    
  }

 
  startServer()
  