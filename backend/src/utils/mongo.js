const mongoose = require("mongoose");

const MONGO_URL =process.env.MONGO_URL;

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

  