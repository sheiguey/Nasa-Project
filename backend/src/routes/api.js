const express = require('express')

const planetsRouter= require('./planets.route')
const lauchesRouter =require('./lauches.route')

const api = express()


api.use('v1/planets',planetsRouter);
api.use('v1/launches',lauchesRouter);


module.exports= api;

