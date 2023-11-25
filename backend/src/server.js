const http = require('http');

const mongoose = require('mongoose');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000 ;

const MONGO_URL ='mongodb+srv://sheiguey:f4emr5lLP49cTOhQ@cluster0.pwgms.mongodb.net/nasa?retryWrites=true&w=majority'

const server = http.createServer(app) ;

mongoose.connection.once('open',()=>{
  console.log('mongo db connection ready!');   
})

mongoose.connection.on('error',(err)=>{
  console.error(err);  
})

async function startServer(){
        
await loadPlanetsData()

await mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true, 
})

server.listen(PORT,()=>(
        console.log(`listen to port ${PORT}`)
))

}


startServer()
