const express = require('express');

const lauchesRouter=express.Router();

const {httpGetAllLaunches,httpAddNewLaunche}= require('../controllers/lauches.controllers');

lauchesRouter.get('/',httpGetAllLaunches);
lauchesRouter.post('/',httpAddNewLaunche)


module.exports= lauchesRouter
