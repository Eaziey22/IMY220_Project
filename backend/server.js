import express from "express";
const path = require('path');
//CREATE APP
const app = express();
//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(express.static(path.join(__dirname, '../../frontend/public')));
//PORT TO LISTEN TO
app.listen(3001, () => {
console.log("Listening on localhost:3001");
});