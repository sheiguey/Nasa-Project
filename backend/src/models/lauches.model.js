const launches = new Map()

let lauchNumber = 100

const launch ={
   flightNumber: 100,
   mission:'kepler exploration x',
   rocket:'explorer IS1',
   launchDate:new Date('December 27 2030'),
   target:'kepler-442 b',
   Customer:['ZTM','NASA'],
   upcoming:true,
   success:true
}


launches.set(launch.flightNumber,launch);

function existLaunchWithId(lauchId){
   return launches.has(lauchId)
}

function abortLaunchById(lauchId){
   const aborded = launches.get(lauchId)
   aborded.upcoming=false,
   aborded.success = false

   return aborded
}

function addNewLaunche(launch){
   lauchNumber +=1;
   launches.set(lauchNumber,Object.assign(launch,{
      flightNumber:lauchNumber,
      Customer:['Zero To Mastery','NASA'],
      upcoming:true,
      success:true
   }));
    
}

function getLaunches(){
   return Array.from(launches.values())
}


module.exports ={getLaunches,addNewLaunche,existLaunchWithId,abortLaunchById}