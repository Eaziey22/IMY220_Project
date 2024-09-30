import express, { json } from "express";
import { MongoClient } from "mongodb";

import { userClass } from "./userClass";

const connectionString = "mongodb+srv://u21612812:Jh7e7cVjugHRYdwC@imy220.ktxbt.mongodb.net/?retryWrites=true&w=majority&appName=IMY220";
const client = new MongoClient(connectionString);
let db;

const path = require('path');
//CREATE APP
const app = express();

app.use(express.json());


client.connect().then(() => {
        console.log("Connected to mongoDB");
        db = client.db("Project_DB");
    }
).catch((error) => {
    console.error(`Error connecting to MongoDB: ${error}`);
});

const User = new userClass(db);

//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(express.static(path.join(__dirname, '../../frontend/public')));

app.post("/register", async (req, res) =>{
    try{
        const user = await User.createUser(req.body);

        res.status(201).json(user);
    }
    catch(error){
        console.log(`Error registering user: ${error}`);
        res.status(500).json({error: "Error registering user"});
    }
})
//PORT TO LISTEN TO
app.listen(3001, () => {
console.log("Listening on localhost:3001");
});