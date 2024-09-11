**SET UP**
_You might your IP adress to Linnea so she can add it to the list of users that can access the database or change access permisions_

1. Clone project from Github
2. Create a .env file.
   Add the following lines to the file:
   <MONGO_URI= (see trello)>
   <PORT=3001>
3. Run <npm install> to install all required dependencies from the package.json file.This installs packages like express, mongoose, and others that are required for the backend to run.
4. Start the server with <npm start>. This should start the backend and connect to MongoDB. The server will be running on http://localhost:3001.

**Frontend (or Postman) Example for Retrieving Leaderboards:**
GET http://localhost:3001/leaderboard/highest-scores
GET http://localhost:3001/leaderboard/fastest-hit-rates

**Submit new player from Postman**
POST http://localhost:3001/submit-player
Choose _Body_ -> _raw_ -> _JSON_
JSON example:
{
"playerName": "Elin",
"score": 1200,
"hitRate": 1.5
}

**How to send data from Frontend Example code**
async function submitPlayerData(playerName, score, hitRate) {
const response = await fetch('http://localhost:3001/submit-player', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
playerName: playerName,
score: score,
hitRate: hitRate,
}),
});
const result = await response.json();
if (response.ok) {
console.log('Success:', result.message);
} else {
console.error('Error:', result.error);
}
}
