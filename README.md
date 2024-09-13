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
const fetchHighScores = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/leaderboard/highest-scores"
      );
      console.log("High Scores Response:", response);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      console.log("Fetched High Scores Data:", data);

      setHighScores(data);
    } catch (error) {
      console.error("Error fetching high scores:", error);
    }
  };
```

### Top 10 fastest hit rates:

```javascript
 const fetchReactionTimes = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/leaderboard/fastest-hit-rates"
      );
      console.log("Reaction times  Response:", response);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      console.log("Fetched Reaction times Data:", data);

      setReactionTimes(data);
    } catch (error) {
      console.error("Error fetching reaction times:", error);
    }
  };

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
