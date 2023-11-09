const express = require('express');

const planetsRouter=express.Router()

const { getAllPlanets } = require('../controllers/planets.controller')

planetsRouter.get('/getallplanets',getAllPlanets)


module.exports = planetsRouter