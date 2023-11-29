const {getLaunches,scheduleNewLaunch,existLaunchWithId,abortLaunchById}=require('../models/lauches.model')


async function httpGetAllLaunches(req,res){
    return res.status(200).json(await getLaunches());
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

    scheduleNewLaunch(launch) ;
    return res.status(201).json(launch);
}

async function httpDeleteLaunche(req,res){
  const lauchId = +req.params.id;
 
  const existLaunch = await existLaunchWithId(lauchId);

  if(!existLaunch){
    return res.status(400).json({
        error:'Launch not found'
    })
  }
  const aborded = await abortLaunchById(lauchId);
  if(!aborded){
    return res.status(400).json({
        error:'Launch not aborded',
    })
  }
  return res.status(200).json({
    ok:true
  });

}

module.exports={
    httpGetAllLaunches,
    httpAddNewLaunche,
    httpDeleteLaunche
}