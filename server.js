/*
    NodeJS Assignment
        -Abhishek Surbhat
                        */

const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/", (req, res) => res.send("NodeJS Assignment running!"));

//1. Write a Nodejs server that listens on port 3001 and outputs a file content
// from any local directory
const data = fs.readFileSync('./data/example.txt', 'utf-8');
app.get('/outputFileContents', (req, res) => {
    res.send(data);
});

//2. Write a Nodejs server that serves as a RESTFUL API that takes two
// parameters in a GET call and produces their product.

//Parameters to be passed are x and y
app.get('/multiply', (req, res) => {
    // console.log(req.query.id);
    if (Object.keys(req.query).length !== 2) {
        res.send('Send two parameters only');
        return;
    }
    if (!(req.query.x && req.query.y)) {
        res.send('Set the parameters as x and y.\nFor Example: http://localhost:3001/multiply?x=7&y=4');
        return;
    }
    res.send(`The result is: ${req.query.x*req.query.y}`);
});

//3. Write a Nodejs server that serves as a RESTFUL  API that accepts a
// file content and writes them to the disk. 
app.post('/fileWrite', (req, res) => {
    if (Object.keys(req.body).length !== 1) {
        res.send('Send one body content. In JSON format. Make sure to set header "Content-type" to "application/json"');
        return;
    }
    let key = Object.keys(req.body)[0];
    try {
        fs.writeFileSync(__dirname + '/data/thirdQuesOutput.txt', req.body[key]);
        res.send('File written successfully');
    } catch (err) {
        res.send(err);
    }
});

//4. Write a Nodejs server that serves as a RESTFUL  API that accepts a String as
// an input name and returns the first non-repeating character in the String.
app.get('/nonRepeatingCharacter', (req, res) => {
    if (req.query.string) {
        for (const i of req.query.string) {
            if ((req.query.string.split(i).length - 1) == 1) {
                res.send(`Non-repeating character is: ${i}`);
                return;
            }
        }
        res.send('No non-repeating character');
    } else {
        res.send('Set string parameter.');
    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;