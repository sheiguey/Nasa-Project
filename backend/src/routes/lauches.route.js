const express = require('express');

const lauchesRouter=express.Router();

const {httpGetAllLaunches,httpAddNewLaunche,httpDeleteLaunche}= require('../controllers/lauches.controllers');

lauchesRouter.get('/',httpGetAllLaunches);
lauchesRouter.post('/',httpAddNewLaunche);
lauchesRouter.delete('/:id',httpDeleteLaunche)


module.exports= lauchesRouter
