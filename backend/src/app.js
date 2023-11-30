const express = require('express');

const path = require('path')

const cors = require('cors');

const morgan = require('morgan')

const planetsRouter = require('./routes/planets.route');

const lauchesRouter = require('./routes/lauches.route')

const app = express();

app.use(cors({
    origin:"http://localhost:3001"
})) 

app.use(morgan('combined'))

app.use(express.json());

app.use(express.static(path.join(__dirname,'..','public')))

app.use('/planets',planetsRouter);

app.use('/launches',lauchesRouter);

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})



module.exports = app

