const planets = require('./planets.mongo')

const {parse} = require('csv-parse');

const path = require('path')


const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

function loadPlanetsData(){
 return new Promise((resolve,reject)=>{
  fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
  .pipe(parse({
    comment: '#',
    columns: true,
  }))
  .on('data',async (data) => {
    if (isHabitablePlanet(data)) {
     // habitablePlanets.push(data);
     //TODO replace the create by upsert
     await savePlanets(data)
    }
  })
  .on('error', (err) => {
    console.log(err);
    reject(err)
 
  })
  .on('end', async() => {
    const countPlanetsFound=(await getAllplanets()).length
    console.log(`${countPlanetsFound} habitable planets found!`);
    resolve()
  });
 });

}

async function getAllplanets(){
  //return habitablePlanets
  return await planets.find({},{
    '__id':0,
    '__v':0
  }) ;
}

async function savePlanets(planet){
  try{
   await planets.updateOne({
     keplerName:planet.kepler_name
    },{
     keplerName:planet.kepler_name
    },{
     upsert:true
    })
  }catch(err){
    console.error(`we could not save the planet something went wrong ${err}`)
  }
}


module.exports={loadPlanetsData ,getAllplanets};