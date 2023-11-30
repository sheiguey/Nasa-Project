const express = require('express')

const planetsRouter= require('./planets.route')
const lauchesRouter =require('./lauches.route')

const api = express()


api.use('/planets',planetsRouter);
api.use('/launches',lauchesRouter);


module.exports= api;

