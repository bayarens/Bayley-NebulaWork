const express = require('express');
const app = express();
const db = require("./queries.js");
const port = 3030;
const cors = require('cors');

app.use(cors());

app.get('/', (request, response) => {
  response.json({ info: "Hello there you... you... lovely person" })
});

app.get('/movie', (request, response) => {
  response.json({ info: "Batman" })
});

app.get('/planes', db.getPlanes);
app.post('/planes', db.addPlanes);

app.listen(port, () => {
  console.log(`Server is running... on port ${port}`);
});
