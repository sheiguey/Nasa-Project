const {getLaunches,addNewLaunche}=require('../models/lauches.model')


function httpGetAllLaunches(req,res){
    return res.status(200).json(getLaunches());
}

function httpAddNewLaunche(req,res){
    const launch = req.body;

    if(!launch.mission || !launch.launchDate || !launch.rocket || !launch.target){
        return res.status(400).json({
            error:'Missing require lauch property'
        })
    }

    launch.launchDate = new Date(launch.launchDate)

    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error:'invalid date'
        })  
    }

    addNewLaunche(launch);
    return res.status(201).json(launch);
}

module.exports={
    httpGetAllLaunches,
    httpAddNewLaunche
}