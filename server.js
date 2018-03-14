// COOL DUDE

const express = require('express');
const app = express();

//Used to get all ideas
app.get('/idea', (req, res) => {
  res.send('Get Idea was hit!');
});

//used to add a single idea
app.post('/idea/:id', (req, res) => {
    res.send('POST Idea was hit!');
  });

  //used to update a single idea
app.put('/idea/:id', (req, res) => {
    res.send('PUT Idea was hit!');
  });

  //used to add a single idea
app.delete('/idea/:id', (req, res) => {
    res.send('DELETE Idea was hit!');
  });

app.listen(3000, () => console.log('Server listening on port 3000!'));