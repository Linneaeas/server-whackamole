# SET UP

_You might your IP adress to Linnea so she can add it to the list of users that can access the database or change access permisions_

## 1. Clone project from Github.

Use Github desktop or through terminal with:
`git clone https://github.com/Linneaeas/server-whackamole.git `

## 2. Create a `.env ` file.

Add the following lines to the file:
`MONGO_URI=` _see trello for URI_
`PORT=3001`

## 3. Install dependencies

Run `npm install`, to install all required dependencies from the package.json file.This installs packages like express, mongoose, and others that are required for the backend to run.

## 4. Start the server

Run `npm start`. This should start the backend and connect to MongoDB. The server will be running on http://localhost:3001.

# USAGE EXAMPLES

## POSTMAN

### Top 10 highest scores:

**GET** http://localhost:3001/leaderboard/highest-scores

### Top 10 fastest hit rates:

**GET** http://localhost:3001/leaderboard/fastest-hit-rates

### Submit new player:

**POST** http://localhost:3001/submit-player
Choose:
\_Body
\_raw
\_JSON

Example JSON:

```json
{
   "playerName": "Elin",
   "score": 1200,
   "hitRate": 1.5
}
```

## FRONTEND

### Top 10 highest scores:

```javascript
async function getHighestScores() {
  try {
    const response = await fetch("http://localhost:3001/leaderboard/highest-scores");
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    console.log("Highest Scores:", data);
    // Process and display the data as needed
  } catch (error) {
    console.error("Error fetching highest scores:", error);
  }
}
// Example usage
getHighestScores();
```

### Top 10 fastest hit rates:

```javascript
async function getFastestHitRates() {
  try {
    const response = await fetch("http://localhost:3001/leaderboard/fastest-hit-rates");
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    console.log("Fastest Hit Rates:", data);
    // Process and display the data as needed
  } catch (error) {
    console.error("Error fetching fastest hit rates:", error);
  }
}
// Example usage
getFastestHitRates();
```

### Submit new player:

```javascript
 async function submitPlayerData(playerName, score, hitRate) {
  const response = await fetch("http://localhost:3001/submit-player", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      playerName: playerName,
      score: score,
      hitRate: hitRate,
    }),
  });
  const result = await response.json();
  if (response.ok) {
    console.log("Success:", result.message);
  } else {
    console.error("Error:", result.error);
  }
}
```

### Extra example in context

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Whack-a-Mole Leaderboards</title>
  <script defer src="script.js"></script>
</head>
<body>
  <h1>Whack-a-Mole Leaderboards</h1>

  <h2>Highest Scores</h2>
  <ul id="highest-scores-list"></ul>

  <h2>Fastest Hit Rates</h2>
  <ul id="fastest-hit-rates-list"></ul>

  <script>
    async function fetchLeaderboards() {
      // Fetch and display highest scores
      try {
        const response = await fetch("http://localhost:3001/leaderboard/highest-scores");
        const highestScores = await response.json();
        const highestScoresList = document.getElementById("highest-scores-list");
        highestScoresList.innerHTML = highestScores.map(player =>
          `<li>${player.playerName}: Score - ${player.score}</li>`
        ).join("");
      } catch (error) {
        console.error("Error fetching highest scores:", error);
      }

      // Fetch and display fastest hit rates
      try {
        const response = await fetch("http://localhost:3001/leaderboard/fastest-hit-rates");
        const fastestHitRates = await response.json();
        const fastestHitRatesList = document.getElementById("fastest-hit-rates-list");
        fastestHitRatesList.innerHTML = fastestHitRates.map(player =>
          `<li>${player.playerName}: Hit Rate - ${player.hitRate} ms</li>`
        ).join("");
      } catch (error) {
        console.error("Error fetching fastest hit rates:", error);
      }
    }
    // Call the function to fetch and display the data when the page loads
    fetchLeaderboards();
  </script>
</body>
</html>
```
