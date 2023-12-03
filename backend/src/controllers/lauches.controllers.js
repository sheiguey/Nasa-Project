const {getLaunches,scheduleNewLaunch,existLaunchWithId,abortLaunchById}=require('../models/lauches.model')
const {getPagination} = require('../utils/pagination')


async function httpGetAllLaunches(req,res){
    const {skip,limit} = getPagination(req.query);
    const launches = await getLaunches(skip,limit)
    return res.status(200).json(launches);
}


function httpAddNewLaunche(req,res){
    const launch = req.body;
    if(!launch.mission || !launch.launchDate || !launch.rocket ){
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

    scheduleNewLaunch(launch) ;
    return res.status(201).json({
        ok:true
    });
}

async function httpDeleteLaunche(req,res){
  const launchId = +req.params.id;
 
  const existLaunch = await existLaunchWithId(launchId);

  if(!existLaunch){
    return res.status(400).json({
        error:'Launch not found'
    })
  }
  const aborted = await abortLaunchById(launchId);
  if(aborted){
    return res.status(200).json({
      ok:true
    });
  }else{
    return res.status(400).json({
        error:'Launch not aborded',
    })
  }

}

module.exports={
    httpGetAllLaunches,
    httpAddNewLaunche,
    httpDeleteLaunche
}