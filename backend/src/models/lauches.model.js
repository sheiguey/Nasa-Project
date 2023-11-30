const axios = require('axios')
const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')


let DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL  ='https://api.spacexdata.com/v4/launches/query'

async function getLatestFlightNumber(){
   const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');
   if(!latestLaunch){
      return DEFAULT_FLIGHT_NUMBER
   }
   return latestLaunch.flightNumber
}

const launch ={
   flightNumber: 100,
   mission:'kepler exploration x',
   rocket:'explorer IS1',
   launchDate:new Date('December 27 2030'),
   target:'Kepler-442 b',
   Customer:['ZTM','NASA'],
   upcoming:true,
   success:true
}

async function saveLaunch(launch){
   const target = await planets.findOne({
      keplerName:launch.target,
   });

   if(!target){
      throw new Error('the target doesn\'t exist in the database check the lis of planets aigain')
   }
   try{
     await launchesDatabase.findOneAndUpdate({
      flightNumber:launch.flightNumber
     },launch,{
      upsert:true
     })
   }catch(err){
      console.error(`we could not save the launch something went wrong ${err}`)
   }
}

//launches.set(launch.flightNumber,launch);

async function existLaunchWithId(launchId){
   //return launches.has(lauchId)
  return await launchesDatabase.findOne({
      flightNumber:launchId
   })
}

async function abortLaunchById(launchId){
   const aborted = await launchesDatabase.updateOne({flightNumber:launchId},{
        upcoming:false,
        success:false
   }) 
 
   return aborted.acknowledged===true ;
}


async function scheduleNewLaunch(launch){
   const newFlightNumber = await getLatestFlightNumber() + 1
   const newlauch = Object.assign(launch,{
      flightNumber:newFlightNumber,
      Customer:['Zero To Mastery','NASA'],
      upcoming:true,
      success:true
   })
   await saveLaunch(newlauch)
}

/* function addNewLaunche(launch){
   lauchNumber +=1;
   launches.set(lauchNumber,Object.assign(launch,{
      flightNumber:lauchNumber,
      Customer:['Zero To Mastery','NASA'],
      upcoming:true,
      success:true
   }));
} */

async function getLaunches(){
   //return Array.from(launches.values()) from mocks data
   return await launchesDatabase
   .find({},{'__id':0,'__v':0})
}

async function loadLaunchData(){
  const response =  await axios.post(SPACEX_API_URL,{
      query:{},
      option:{
         pagination:false,
         populate:[
            {
               path:'rocket',
               select:{
                  name:1
               },
            },
            {
               path:'payloads',
               select:{
                  customers:1
               },
            },
         ]
      }
    })

    const lauchDocs = response.data.docs;
   
    for (const lauchDoc of lauchDocs){
      const rocket = lauchDoc['rocket']['name'];
      const payloads = lauchDoc['payloads'];
      const customers =payloads.flatMap((payload)=>{
         return payload['customers'];
      })
      
      console.log(payloads);
      console.log(rocket);
      

      const lauch={
         flightNumber: lauchDoc['flight_number'],
         mission:lauchDoc['name'],
         rocket:lauchDoc['rocket']['name'],
         launchDate:lauchDoc['date_local'],
         Customer:customers,
         upcoming:lauchDoc['upcoming'],
         success:lauchDoc['success'],
      }
      
    }

}


module.exports ={getLaunches,scheduleNewLaunch,existLaunchWithId,abortLaunchById,saveLaunch,launch,loadLaunchData}