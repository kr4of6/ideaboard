const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))


let ideas = [];
let id = 0;

//Used to get all ideas
app.get('/api/idea', (req, res) => {
    res.send(ideas);
});

//used to add a single idea
app.post('/api/idea', (req, res) => {
    id = id + 1;
    let idea = { id: id, text: req.body.text, likes: req.body.likes, dislikes: req.body.dislikes };
    ideas.push(idea);
    res.send(idea);
});

//used to update a single idea
app.put('/api/idea/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let ideasMap = ideas.map(idea => { return idea.id; });
    let index = ideasMap.indexOf(id);
    let idea = ideas[index];

    idea.likes = req.body.likes;
    idea.dislikes = req.body.dislikes;

    res.send(idea);
});

//used to add a single idea
app.delete('/api/idea/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let removeIndex = ideas.map(idea => { return idea.id; }).indexOf(id);
    if (removeIndex === -1) {
        res.status(404).send("Houston we have a problem");
        return;
    }

    ideas.splice(removeIndex, 1);
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
