import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
require('dotenv').config();


//import { userClass } from "./userClass";

import { userModel } from "./userModel";
import { playlistModel } from "./playlistModel";
import { songModel } from "./songModel";

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
        Song = new songModel(db);
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
            return res.status(409).json({
                status: "error", 
                message: `User with Email: ${email} already exists` 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.createUser(username,email, hashedPassword );

        res.status(201).json({
            status: "success",
            message: "user registered successfully" ,
            data : {userId : user._id} });
    }
    catch(err){
        console.log(`Error registering user: ${error}`);
        res.status(500).json({ 
            status: "error",
            error: "Internal server error"
        });
    }
});

app.post("/login", async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.login(email);

        if(!user){
            return res.status(404).json({
                status: "error", 
                message: "User not found"
            });
        }

        const isPwValid = await bcrypt.compare(password, user.password);

        if(!isPwValid){
            return res.status(401).json({
                status: "error", 
                message: "Invalid password"
            });
        }


        return res.status(200).json({
            status: "success",
            message: "Login successful", 
            data :{userId: user._id}
        });

    }
    catch(error){
        console.error(`could not login user: ${error}`);
        res.status(500).json({ 
            status: "error", 
            message: "Internal server error" 
        });
    }
});

app.get("/getUser/:id", async (req, res) =>{

    const id = req.params.id;

    try{

        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ 
                status: "error", 
                message: "Invalid user ID format" 
            });
        }

        const usr = await User.getUserById(id);

        if(!usr){
            return res.status(404).json({
                status: "error", 
                message: "User not found"
            });
        }

        return res.status(200).json({
            status: "success", 
            message : `User with userId: ${id} retrieved successfully`, 
            data : {userId: usr._id, username: usr.username}
        });
    }
    catch(error){
        console.log(`Error getting user by id: ${error}`);
        res.status(500).json({
            status: "error", 
            error: "Internal server error"
        });
    }
    
});

app.put("/updateUser/:id", async (req, res) =>{
    const id = req.params.id;

    try{

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "error", 
                 message: "Invalid user ID format" 
            });
        }

        const result = await User.updateUser(id , req.body);

        if(!result){
            return res.status(404).json({
                status: "error", 
                message: "Unable to update user"
            });
        }

        return res.status(200).json({
            status: "success", 
            message: `User with id: ${id} updated`, 
            data: {modifiedCount: result} });

    }
    catch(error){
        console.log(`Error updating user: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"
        });
    }
});

app.delete("/deleteUser/:id", async (req, res) =>{
    const id = req.params.id;

    try{

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "error", 
                message: "Invalid user ID format" });
        }

        const result = await User.deleteUser(id);
        if(result === 0){
            
            return res.status(404).json({
                status: "error", 
                message: "Unable to delete user"
            });
        }

        const pl = await Playlist.deleteUserPlaylists(id);
        if(pl === 0){
            return res.status(404).json({
                status: "error", 
                message: "Unable to delete user's playlists"});
        }

        const sngs = await Song.deleteUserSongs(id);
        if(sngs === 0){
            return res.status(404).json({
                status: "error", 
                message: "Unable to delete user's songs"});
        }

        return res.status(200).json({
            status: "success",
            message: `User with id: ${id} deleted`, 
            data: {deletedCount: result}
        });
        


    }
    catch(error){
        console.log(`Error deleting user: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"
        });
    }
});

app.put("user/:userId/addFriend/:friendId", async (req, res) =>{

    const {userId, friendId} = req.params;

    try{

        if (!ObjectId.isValid(userId) || !ObjectId.isValid(friendId) ) {
            return res.status(400).json({
                status: "error", 
                message: "Invalid user or friend ID format" });
        }

        const result = await User.addFriend(userId, friendId);
        if(result === 0){
            
            return res.status(404).json({
                status: "error", 
                message: "Unable to add friend"
            });
        }

        const updatedUser = await User.getUserById(userId);

        return res.status(200).json({
            status: "success",
            message: `Friend with id: ${friendId} added to friends`, 
            data: {updatedCount: result, user: updatedUser}
        });


    }
    catch(error){
        console.log(`Error adding friend: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"
        });
    }
});

app.put("user/:userId/removeFriend/:friendId", async (req, res) =>{

    const {userId, friendId} = req.params;

    try{

        if (!ObjectId.isValid(userId) || !ObjectId.isValid(friendId) ) {
            return res.status(400).json({
                status: "error", 
                message: "Invalid user or friend ID format" });
        }

        const result = await User.removeFriend(userId, friendId);
        if(result === 0){
            
            return res.status(404).json({
                status: "error", 
                message: "Unable to remove friend"
            });
        }

        const updatedUser = await User.getUserById(userId);

        return res.status(200).json({
            status: "success",
            message: `Friend with id: ${friendId} removed from friends`, 
            data: {updatedCount: result, user: updatedUser}
        });


    }
    catch(error){
        console.log(`Error removing friend: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"
        });
    }
});

app.post("/playlists/createPlaylist", async (req, res) =>{

    try{
        const {playlistName,ownerId, songs } = req.body;
        const pl = await Playlist.createPlaylist(playlistName,ownerId, songs );

        await User.addPlaylistToPlaylists(ownerId, pl._id);

        res.status(201).json({
            status: "success", 
            message: "playlist created successfully",
            data: {playlist: pl}
        });
    }
    catch(error){
        console.log(`Error creating a new playlist: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"
        });
    }
});

app.get("/playlists/getPlaylist/:id", async (req, res) =>{

    const id = req.params.id;

    try{

        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ 
                status: "error", 
                message: "Invalid playlist ID format" 
            });
        }

        const pl = await Playlist.getPlaylistById(id);

        if(!pl){
            return res.status(404).json({
                status: "error", 
                message: "Playlist not found"});
        }

        return res.status(200).json({
            status: "success", 
            message : `Playlist with playlistId: ${id} retrieved successfully`, 
            data: {playlist: pl}
        });
    }
    catch(error){
        console.log(`Error getting playlist by id: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"
        });
    }
    
});

app.get("/playlists/getUserPlaylists/:id", async (req, res) =>{

    const userId = req.params.id;

    try{

        
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ 
                status: "error", 
                message: "Invalid user ID format" });
        }

        const pl = await Playlist.getUserPlaylists(userId);

        if(!pl){
            return res.status(404).json({
                status: "error", 
                message: "Playlists not found"});
        }

        return res.status(200).json({
            status: "success", 
            message : `User with userId: ${userId}'s playlists retrieved successfully`, 
            data: {playlists: pl}
        });
    }
    catch(error){
        console.log(`Error getting user's playlists: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"});
    }
    
});

app.put("/playlists/updatePlaylist/:id", async (req, res) =>{
    const id = req.params.id;

    try{

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ 
                status: "error", 
                message: "Invalid playlist ID format" });
        }

        const result = await Playlist.updatePlaylist(id , req.body);

        if(!result){
            return res.status(404).json({
                status: "error", 
                message: "Unable to update playlist"});
        }

        return res.status(200).json({
            status: "success", 
            message: `Playlist with id: ${id} updated`, 
            data: {updateCount: result} 
        });

    }
    catch(error){
        console.log(`Error updating playlist: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"});
    }
});

app.put("/playlists/addSong/:playlistId/songs/:songId", async (req, res) => {
    const { playlistId, songId } = req.params;

    try {
        const modifiedCount = await User.addSongToPlaylist(playlistId, songId);

        if (modifiedCount === 0) {
            return res.status(404).json({ 
                status: "error", 
                message: "Playlist not found or song already exists." });
        }

        return res.status(200).json({
            status: "success", 
            message: "Song added to playlist successfully.",
            data: {UpdatedCount : modifiedCount}
         });
    } catch (error) {
        console.log(`Error adding song to playlist: ${error}`);
        res.status(500).json({ 
            status: "error", 
            message: "Internal server error" 
        });
    }
});

app.put("/playlists/removeSong/:playlistId/songs/:songId", async (req, res) => {
    const { playlistId, songId } = req.params;

    try {
        const modifiedCount = await User.removeSongFromPlaylist(playlistId, songId);

        if (modifiedCount === 0) {
            return res.status(404).json({ 
                status: "error", 
                message: "Playlist not found or song not found." 
            });
        }

        return res.status(200).json({ 
            status: "success", 
            message: "Song removed from playlist successfully.",
            data: {updateCount: modifiedCount}
         });
    } catch (error) {
        console.log(`Error removing song from playlist: ${error}`);
        res.status(500).json({ 
            status: "error", 
            message: "Internal server error" 
        });
    }
});

app.delete("/playlists/deletePlaylist/:ownerId/:id", async (req, res) =>{
    const {ownerId, id} = req.params;

    try{

        if (!ObjectId.isValid(id) || !ObjectId.isValid(ownerId)) {
            return res.status(400).json({
                status: "error", 
                message: "Invalid playlist or User ID format" 
            });
        }

        
        const result = await Playlist.deletePlaylist(id);

        if(!result){
            return res.status(404).json({
                status: "error", 
                message: "Unable to delete playlist"});
        }


        await User.removePlaylistFromPlaylists(ownerId, id);

        return res.status(200).json({
            status: "success", 
            message: `Playlist with id: ${id} deleted`, 
            data: {deletedCount :result} 
        });

    }
    catch(error){
        console.log(`Error deleting playlist: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"});
    }
});

app.post("/songs/addSong", async (req, res) =>{
    const {name, artistName, genre, album, song, ownerId} = req.body;

    try{

        const addedSong = await Song.addSong(name, artistName, genre, album, song, ownerId);

        await User.addSongToSongs(ownerId, addedSong._id);

        return res.status(201).json({
            status: "success", 
            message: "song added to your songs" , 
            data : {song : addedSong}
        });
    }
    catch(error){
        console.log(`Error adding song: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"
        });
    }

});

app.delete("/songs/deleteSong/:ownerId/:songId",async(req, res) => {
    const { ownerId, songId } = req.params;

    try{

        if(!ObjectId.isValid(songId) || !ObjectId.isValid(ownerId)){
            return res.status(400).json({
                status: "error",
                message: "Invalid song or owner ID format" });
        }

        const dCount = await Song.deleteSong(songId);

        if(dCount === 0){
            return res.status(404).json({
                status: "error", 
                message: 'song not found or already deleted'
            });


        }

        await User.removeSongFromSongs(ownerId, songId);

        return res.status(200).json({
            status: "success", 
            message: "song deleted from your Songs",
            data: {deletedCount : dCount}
        });

    }catch(error){
        console.log(`Error deleting song: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"});
    }
});

app.get("/songs/getSong/:id", async (req, res) =>{

    const id = req.params.id;

    try{

        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "error", 
                message: "Invalid song ID format" });
        }

        const sng = await Song.getSongById(id);

        if(!sng){
            return res.status(404).json({
                status: "error", 
                message: "Song not found"});
        }

        return res.status(200).json({
            status: "success", 
            message : `Song with songId: ${id} retrieved successfully`, 
            data : {song: sng}
        });
    }
    catch(error){
        console.log(`Error getting song by id: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"
        });
    }
    
});

app.get("/songs/getUserSongs/:userId", async (req, res) =>{

    const {userId} = req.params;

    try{

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: "error", 
                message: "Invalid song ID format" });
        }

        const sngs = await Song.getUserSongs(userId);

        if(!sngs){
            return res.status(404).json({
                status: "error", 
                message: "User Songs not found"});
        }

        return res.status(200).json({
            status: "success", 
            message : `User Songs retrieved successfully`, 
            data: {songs: sngs}
        });
    }
    catch(error){
        console.log(`Error getting user songs: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"});
    }
    
});

//PORT TO LISTEN TO
app.listen(3001, () => {
console.log("Listening on localhost:3001");
});