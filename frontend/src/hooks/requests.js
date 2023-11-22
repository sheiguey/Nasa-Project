const API_URL = 'http://localhost:8000'

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

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};