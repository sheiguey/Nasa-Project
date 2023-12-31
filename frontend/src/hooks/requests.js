
//for production render
const API_URL = 'https://localhost:10000/v1';

//for production in aws
//const API_URL = 'v1';

//for test
//const API_URL = 'http://localhost:8000/v1';

 // Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`)
  const data = await response.json();
  return data;
 
}


// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`)
  const data = await response.json();
  return data.sort((a,b)=>a.flightNumber-b.flightNumber); 
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try{
    return  await fetch(`${API_URL}/launches`,{
      headers:{
        "Content-Type":"application/json"
      },
      method:"post",
      body:JSON.stringify(launch)
     })
    }catch(error){
     return {
      ok:false
     }
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try{
     return await fetch(`${API_URL}/launches/${id}`,{
      method:'delete'
    })
  }catch(err){
    console.log(err)
    return{
      ok:false
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};