import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
require('dotenv').config();


//import { userClass } from "./userClass";

import { userModel } from "./userModel";
import { playlistModel } from "./playlistModel";

const connectionString = process.env.MONGO_URI
const client = new MongoClient(connectionString);
let db;
let User;
let Playlist;
let Song;

const path = require('path');
//CREATE APP
const app = express();

app.use(express.json());


client.connect().then(() => {
        console.log("Connected to mongoDB");
        db = client.db("Project_DB");
        User = new userModel(db);
        Playlist = new playlistModel(db);
    }
).catch((error) => {
    console.error(`Error connecting to MongoDB: ${error}`);
});



//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(express.static(path.join(__dirname, '../../frontend/public')));

app.post("/register", async (req, res) =>{
    try{
        const {username,email, password } = req.body;

        const userEmailExists = await User.userExists(email);

        if(userEmailExists){
            return res.status(409).json({ error: `User with Email: ${email} already exists` });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.createUser(username,email, hashedPassword );

        res.status(201).json(user);
    }
    catch(error){
        console.log(`Error registering user: ${error}`);
        res.status(500).json({error: "Error registering user"});
    }
});

app.post("/login", async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.login(email);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const isPwValid = await bcrypt.compare(password, user.password);

        if(!isPwValid){
            return res.status(401).json({message: "Invalid password"});
        }


        return res.status(200).json({message: "Login successful", userId: user._id});

    }
    catch(error){
        console.error(`could not login user: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/getUser/:id", async (req, res) =>{

    const id = req.params.id;

    try{

        /*
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }*/

        const usr = await User.getUserById(id);

        if(!usr){
            return res.status(404).json({message: "User not found"});
        }

        return res.status(200).json({message : `User with userId: ${id} retrieved successfully`, user: usr});
    }
    catch(error){
        console.log(`Error getting user by id: ${error}`);
        res.status(500).json({error: "Error getting user"});
    }
    
});

app.put("/updateUser/:id", async (req, res) =>{
    const id = req.params.id;

    try{

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const result = await User.updateUser(id , req.body);

        if(!result){
            return res.status(404).json({message: "Unable to update user"});
        }

        return res.status(200).json({message: `User with id: ${id} updated`, result });

    }
    catch(error){
        console.log(`Error updating user: ${error}`);
        res.status(500).json({error: "Error updating user"});
    }
});

app.delete("/deleteUser/:id", async (req, res) =>{
    const id = req.params.id;

    try{

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const result = await User.deleteUser(id);

        if(!result){
            return res.status(404).json({message: "Unable to delete user"});
        }

        const pl = await Playlist.deleteUserPlaylists(id)

        if(!pl){
            return res.status(404).json({message: "Unable to delete user's playlists"});
        }

        return res.status(200).json({message: `User with id: ${id} deleted`, result });

    }
    catch(error){
        console.log(`Error deleting user: ${error}`);
        res.status(500).json({error: "Error deleting user"});
    }
});

app.post("/createPlaylist", async (req, res) =>{

    try{
        const {playlistName,ownerId, songs } = req.body;
        const playlist = await Playlist.createPlaylist(playlistName,ownerId, songs );

        res.status(201).json(playlist);
    }
    catch(error){
        console.log(`Error creating a new playlist: ${error}`);
        res.status(500).json({error: "Error creating a new playlist"});
    }
});

app.get("/getPlaylist/:id", async (req, res) =>{

    const id = req.params.id;

    try{

        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid playlist ID format" });
        }

        const pl = await Playlist.getPlaylistById(id);

        if(!pl){
            return res.status(404).json({message: "Playlist not found"});
        }

        return res.status(200).json({message : `Playlist with playlistId: ${id} retrieved successfully`, playlist: pl});
    }
    catch(error){
        console.log(`Error getting playlist by id: ${error}`);
        res.status(500).json({error: "Error getting playlist"});
    }
    
});

app.get("/getPlaylists/:id", async (req, res) =>{

    const userId = req.params.id;

    try{

        
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const pl = await Playlist.getUserPlaylists(userId);

        if(!pl){
            return res.status(404).json({message: "Playlists not found"});
        }

        return res.status(200).json({message : `User with userId: ${userId}'s playlists retrieved successfully`, playlists: pl});
    }
    catch(error){
        console.log(`Error getting user's playlists: ${error}`);
        res.status(500).json({error: "Error getting user's playlists"});
    }
    
});

app.put("/updatePlaylist/:id", async (req, res) =>{
    const id = req.params.id;

    try{

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid playlist ID format" });
        }

        const result = await Playlist.updatePlaylist(id , req.body);

        if(!result){
            return res.status(404).json({message: "Unable to update playlist"});
        }

        return res.status(200).json({message: `Playlist with id: ${id} updated`, result });

    }
    catch(error){
        console.log(`Error updating playlist: ${error}`);
        res.status(500).json({error: "Error updating playlist"});
    }
});

app.put("/playlists/:playlistId/songs/:songId", async (req, res) => {
    const { playlistId, songId } = req.params;

    try {
        const modifiedCount = await User.addSongToPlaylist(playlistId, songId);

        if (modifiedCount === 0) {
            return res.status(404).json({ message: "Playlist not found or song already exists." });
        }

        return res.status(200).json({ message: "Song added to playlist successfully." });
    } catch (error) {
        console.log(`Error adding song to playlist: ${error}`);
        res.status(500).json({ error: "Error adding song to playlist." });
    }
});

app.delete("/deletePlaylist/:id", async (req, res) =>{
    const PlaylistId = req.params.id;

    try{

        if (!ObjectId.isValid(PlaylistId)) {
            return res.status(400).json({ message: "Invalid playlist ID format" });
        }

        const result = await Playlist.deletePlaylist(PlaylistId);

        if(!result){
            return res.status(404).json({message: "Unable to delete playlist"});
        }

        return res.status(200).json({message: `Playlist with id: ${PlaylistId} deleted`, result });

    }
    catch(error){
        console.log(`Error deleting playlist: ${error}`);
        res.status(500).json({error: "Error deleting playlist"});
    }
});



//PORT TO LISTEN TO
app.listen(3001, () => {
console.log("Listening on localhost:3001");
});