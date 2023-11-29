const mongoose = require("mongoose");

const MONGO_URL ='mongodb+srv://nasa-user:j5r7dMWjNdl7ni8I@cluster0.pwgms.mongodb.net/nasa?retryWrites=true&w=majority';

async function mongoConnect(){
    await mongoose.connect(MONGO_URL)
}

async function mongoDisconnect(){
    await mongoose.disconnect()
}

mongoose.connection.once('open',()=>{
    console.log('mongo db connection ready!');   
  })
  
  mongoose.connection.on('error',(err)=>{
    console.error(err);  
  })

  module.exports={mongoConnect,mongoDisconnect}

  