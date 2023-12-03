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


async function saveLaunch(launch){
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

async function getLaunchDataFromSpaceX(){
   const response =  await axios.post(SPACEX_API_URL,{
      query:{},
      options:{
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

    if(response.status===!200){
      console.log('something went wrong while loading the spaceX data');
      throw new Error('load spaceX data launches failed')
    }
    const lauchDocs = response.data.docs;

    for (const lauchDoc of lauchDocs){
      const rocket = lauchDoc['rocket']['name'];
      const payloads = lauchDoc['payloads'];
      const customers =payloads.flatMap((payload)=>{
         return payload['customers'];
      })

      const lauch={
         flightNumber: lauchDoc['flight_number'],
         mission:lauchDoc['name'],
         rocket:rocket,
         launchDate:lauchDoc['date_local'],
         Customer:customers,
         upcoming:lauchDoc['upcoming'],
         success:lauchDoc['success'],
      }
      await saveLaunch(lauch)
    }
}

//load launch data from spaceXAPI To our database
async function loadLaunchData(){
  const firstLaunch = await findLaunch({
      flightNumber:1,
      rocket:'Falcon 1',
      mission:'FalconSat'
   })

   if(firstLaunch){
      console.log('spaceX launch data already exist');
   }else{
     await getLaunchDataFromSpaceX();
   }
 }

async function findLaunch(filter){
   return await launchesDatabase.findOne(filter)
}

async function existLaunchWithId(launchId){
  return await findLaunch({
      flightNumber:launchId
   })
}

async function abortLaunchById(launchId){
   const aborted = await launchesDatabase.updateOne({flightNumber:launchId},{
        upcoming:false,
        success:false
   }) 
   return aborted;
}

async function scheduleNewLaunch(launch){
   const target = await planets.findOne({
      keplerName:launch.target,
   });

   if(!target){
      throw new Error('the target doesn\'t exist in the database check the lis of planets aigain')
   }
   const newFlightNumber = await getLatestFlightNumber() + 1
   const newlauch = Object.assign(launch,{
      flightNumber:newFlightNumber,
      Customer:['Zero To Mastery','NASA'],
      upcoming:true,
      success:true
   })
   await saveLaunch(newlauch)
}

async function getLaunches(skip,limit){
   return await launchesDatabase
   .find({},{'__id':0,'__v':0})
   .sort({flightNumber:1})
   .skip(skip)
   .limit(limit)
}

module.exports ={getLaunches,scheduleNewLaunch,existLaunchWithId,abortLaunchById,saveLaunch,loadLaunchData}