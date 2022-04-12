const baseURL = 'http://localhost:3000/games'
const url = "wss://u8f3ja8yu3.execute-api.us-east-1.amazonaws.com/dev"


// ---------- api calls ---------------
const webSocket = new WebSocket(url);
webSocket.onmessage =  (event) =>  {
  console.log(event);
  //const game = JSON.parse(event.data)
  //this.gameToSquares(game)
}

const createGame = async (gameName) =>{
  console.log('subscribing to channel', gameName)
  const data = {
    action: 'subscribeChannel',
    channelId:gameName || "KNOLL123"

  }
  webSocket.send(JSON.stringify(data))

}

const joinGame = async ({data}) =>{
  console.log(JSON.stringify(data))
  const game = await fetch(`${baseURL}/join`, {
    method:'POST',
    body:JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(function (response) {
    // The API call was successful!
    return response.json();
  }).then(function (data) {
    // This is the JSON from our response
    console.log(data);
    return data
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
  console.log('done!!')
  return game

}

const play = async ({data}) =>{
  console.log(JSON.stringify(data))

  const game = await fetch(`${baseURL}/play`, {
    method:'POST',
    body:JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(function (response) {
    // The API call was successful!
    return response.json();
  }).then(function (data) {
    // This is the JSON from our response
    console.log(data);
    return data
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
  console.log('done!!')
  return game

}

const getGame = async ({gameId}) =>{
  console.log(JSON.stringify(gameId))
  const game = await fetch(`${baseURL}/get?id=${gameId}`).then(function (response) {
    // The API call was successful!
    return response.json();
  }).then(function (data) {
    // This is the JSON from our response
    console.log(data);
    return data
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
  console.log('done!!')
  return game

}
// API Functions Insertion Point (do not change this text, it is being used by hygen cli)

export {
  createGame,
  joinGame,
  play,
  getGame,
  baseURL,

  // API Export Insertion Point (do not change this text, it is being used by hygen cli)
};
