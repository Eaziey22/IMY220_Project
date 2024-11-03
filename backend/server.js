import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
require('dotenv').config();
const multer = require("multer");

//const jwt = require('jsonwebtoken');
//const secretKey = process.env.Secret_Key


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

//const storage = multer.memoryStorage(); 
//const upload = multer({ storage: storage });

const upload = multer({
    dest: path.join(__dirname, '../../frontend/public/assets/images/profilePictures')
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


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

app.post("/auth/register", async (req, res) =>{
    try{
        const {name, surname, username,email, password, bio, pronouns, instagram, facebook, twitter  } = req.body;

        const userEmailExists = await User.userExists(email);

        if(userEmailExists){
            return res.status(409).json({
                status: "error", 
                message: `Email address already exists` 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.createUser(name, surname, username,email, hashedPassword, bio, pronouns, instagram, facebook, twitter );

        //const tkn = jwt.sign({userId: user._id, email: user.email}, secretKey, {expiresIn: '2h'});

        console.log("User:", user);
        res.status(201).json({
            status: "success",
            message: "user registered successfully" ,
            data : {userId : user.insertedId}
            /*data : {token : tkn }*/ });
    }
    catch(err){
        console.log(`Error registering user: ${err}`);
        res.status(500).json({ 
            status: "error",
            error: "Internal server error"
        });
    }
});

app.post("/auth/login", async(req, res) => {
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

        //const tkn = jwt.sign({userId: user._id, email: user.email}, secretKey, {expiresIn : '2h'});

        return res.status(200).json({
            status: "success",
            message: "Login successful", 
            /*data :{token: tkn}*/
            data : {userId : user._id}
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

        console.log(usr);

        if(!usr){
            return res.status(404).json({
                status: "error", 
                message: "User not found"
            });
        }

        return res.status(200).json({
            status: "success", 
            message : `User with userId: ${id} retrieved successfully`, 
            data : {
                userId: usr._id, 
                username: usr.username, 
                friends: usr.friends, 
                profilePicture: usr.profilePicture,
                name: usr.name,
                surname: usr.surname,
                pronouns: usr.pronouns,
                bio: usr.bio,
                instagram: usr.instagram,
                twitter: usr.twitter,
                facebook: usr.facebook,
                email: usr.email
            }
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

app.put("/updateUser/:id", upload.single('profilePicture'),  async (req, res) =>{
    const id = req.params.id;
    let updateData = {};
    try{

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "error", 
                 message: "Invalid user ID format" 
            });
        }

        updateData = req.body;

        if(req.file){
            updateData.profilePicture = `/assets/images/profilePictures/${req.file.filename}`;
        }

        const result = await User.updateUser(id , updateData);

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

app.get("/user/getFriends/:userId", async(req, res) =>{

    const {userId}= req.params;

    try{

        if (!ObjectId.isValid(userId) ) {
            return res.status(400).json({
                status: "error", 
                message: "Invalid user ID format" });
        }

        const user = await User.getUserById(userId);
        //console.log("user", result);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }
        
        const friends = await User.getFriends(user.friends);
        
        /*
        const friends = await Promise.all(result.map(async (friendId) => {
            const friend = await User.getUserById(friendId);
            return friend;
        }));*/

        return res.status(200).json({
            status: "success",
            message: `Friends retrieved successfully`,
            data: { friends }
        });


    }
    catch(error){
        console.log(`Error fetching friends: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"
        });
    }
})

app.put("/user/:userId/addFriend/:friendId", async (req, res) =>{

    const {userId, friendId} = req.params;

    try{

        if (!ObjectId.isValid(userId) || !ObjectId.isValid(friendId) ) {
            return res.status(400).json({
                status: "error", 
                message: "Invalid user or friend ID format" });
        }

        const result = await User.addFriend(userId, friendId);
        const result2 = await User.addFriend(friendId, userId);
        if(result === 0  && result2 === 0){
            
            return res.status(404).json({
                status: "error", 
                message: "Unable to add friend"
            });
        }

        const updatedUser = await User.getUserById(userId);
        const updatedFriend = await User.getUserById(friendId);

        return res.status(200).json({
            status: "success",
            message: `Friend with id: ${friendId} added to friends`, 
            data: {updatedCount: result, user: updatedUser, friend: updatedFriend}
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

app.put('/user/:userId/like/:playlistId', async (req, res) => {
    
    const {userId, playlistId} = req.params;

    try{

        if (!ObjectId.isValid(userId) || !ObjectId.isValid(playlistId) ) {
            return res.status(400).json({
                status: "error", 
                message: "Invalid user or playlist ID format" });
        }

        const result = await User.addToLikedPlaylists(userId, playlistId);
        console.log("result:", result);
        
        if(result === 0 ){
            
            return res.status(404).json({
                status: "error", 
                message: "Unable to add playlist to liked playlists"
            });
        }

        const updatedUser = await User.getUserById(userId);
        

        return res.status(200).json({
            status: "success",
            message: `Playlist with id: ${playlistId} added to liked playlists`, 
            data: {updatedCount: result, user: updatedUser}
        });


    }
    catch(error){
        console.log(`Error adding liked playlist: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"
        });
    }
});

app.put('/user/:userId/unlike/:playlistId', async (req, res) => {
    
    const {userId, playlistId} = req.params;

    try{

        if (!ObjectId.isValid(userId) || !ObjectId.isValid(playlistId) ) {
            return res.status(400).json({
                status: "error", 
                message: "Invalid user or playlist ID format" });
        }

        const result = await User.removeFromLikedPlaylists(userId, playlistId);
        
        if(result === 0 ){
            
            return res.status(404).json({
                status: "error", 
                message: "Unable to add playlist to liked playlists"
            });
        }

        const updatedUser = await User.getUserById(userId);
        

        return res.status(200).json({
            status: "success",
            message: `playlist with id: ${friendId} removed from playlists`, 
            data: {updatedCount: result, user: updatedUser}
        });


    }
    catch(error){
        console.log(`Error removing playlist from liked playlists: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"
        });
    }
});

app.get('/user/getLikedPlaylists/:userId', async (req, res) =>{

    const userId = req.params.userId;

    try{

        console.log(userId)
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ 
                status: "error", 
                message: "Invalid user ID format "  });
        }

        const likedPlaylists = await User.getLikedPlaylists(userId);

        if(!likedPlaylists){
            return res.status(404).json({
                status: "error", 
                message: "Liked Playlists not found"});
        }

        return res.status(200).json({
            status: "success", 
            message : `User with userId: ${userId}'s liked playlists retrieved successfully`, 
            data: {likedPlaylists: likedPlaylists}
        });
    }
    catch(error){
        console.log(`Error getting user's playlists: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"});
    }
    
});



app.get("/user/getSuggestedFriends/:userId", async (req, res) =>{

    const {userId}= req.params;

    try{

        if (!ObjectId.isValid(userId) ) {
            return res.status(400).json({
                status: "error", 
                message: "Invalid user ID format" });
        }

        const user = await User.getUserById(userId);
        //console.log("user", result);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }
        
        //const friends = await User.getFriends(user.friends);
        
        var suggestedFriends = await User.getSuggestedFriends(user.friends, userId);
        
        //suggestedFriends.splice(userId);

        /*
        const friends = await Promise.all(result.map(async (friendId) => {
            const friend = await User.getUserById(friendId);
            return friend;
        }));*/

        return res.status(200).json({
            status: "success",
            message: `Friends retrieved successfully`,
            data: { suggestedFriends }
        });


    }
    catch(error){
        console.log(`Error fetching friends: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"
        });
    }
})

app.put("/user/:userId/removeFriend/:friendId", async (req, res) =>{

    const {userId, friendId} = req.params;

    try{

        if (!ObjectId.isValid(userId) || !ObjectId.isValid(friendId) ) {
            return res.status(400).json({
                status: "error", 
                message: "Invalid user or friend ID format" });
        }

        const result = await User.removeFriend(userId, friendId);
        const result2 = await User.removeFriend(friendId, userId);
        if(result === 0 && result2 === 0){
            
            return res.status(404).json({
                status: "error", 
                message: "Unable to remove friend"
            });
        }

        const updatedUser = await User.getUserById(userId);
        const updatedFriend = await User.getUserById(friendId);

        return res.status(200).json({
            status: "success",
            message: `Friend with id: ${friendId} removed from friends`, 
            data: {updatedCount: result, user: updatedUser, friend: updatedFriend}
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

app.post("/playlists/createPlaylist",upload.single('coverImage'), async (req, res) =>{

    try{
        const {playlistName,ownerId, category,description,hashtags } = req.body;

        let coverImage = null;

        if(req.file){
            coverImage = `/assets/images/profilePictures/${req.file.filename}`;
        }

        const songs = req.body.songs ? JSON.parse(req.body.songs) : [];
        //const likedPlaylists = req.body.likedPlaylists ? JSON.parse(req.body.likedPlaylists) : [];
        
        //const coverImage = req.file ? req.file.filename : null;
        const user = await User.getUserById(ownerId);
        const pl = await Playlist.createPlaylist(playlistName,ownerId, songs, category, description,coverImage,hashtags, user.username );

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

app.put("/playlists/updatePlaylist/:id", upload.single('coverImage'), async (req, res) =>{
    const id = req.params.id;

    let updateData = {};

    try{

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ 
                status: "error", 
                message: "Invalid playlist ID format" });
        }

        updateData = req.body;

        if(req.file){
            updateData.coverImage = `/assets/images/profilePictures/${req.file.filename}`;
        }
        else{
            updateData.coverImage = "";
        }

        console.log("updateDatat: ", updateData);

        const result = await Playlist.updatePlaylist(id , updateData);

        console.log("updated playlist count: ",result);

        const result2 = await Playlist.getPlaylistById(id);
        console.log("updated playlist: ",result2);
        if(!result){
            return res.status(404).json({
                status: "error", 
                message: "Unable to update playlist"});
        }

        return res.status(200).json({
            status: "success", 
            message: `Playlist with id: ${id} updated`, 
            data: {modifiedCount: result, playlistData: result2}
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

    //console.log("songAndPlaylist: ", playlistId, songId);
    try {
        const modifiedCount = await Playlist.addSongToPlaylist(playlistId, songId);

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
        const modifiedCount = await Playlist.removeSongFromPlaylist(playlistId, songId);

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

app.post("/songs/addSong", upload.single("file"),  async (req, res) =>{
    const {name, artistName, genre, album, ownerId } = req.body;

    const file = req.file;
    console.log("artist1: ", file);
    try{

        const addedSong = await Song.addSong(name, artistName, genre, album,  file, ownerId);

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

app.get("/playlist/getPlaylistSongs/:playlistId", async(req, res) =>{

    const { playlistId} = req.params;

    try{

        if (!ObjectId.isValid(playlistId)) {
            return res.status(400).json({
                status: "error", 
                message: "Invalid playlist ID format" });
        }

        const songIds = await Playlist.getSongsFromPlaylist(playlistId);

        console.log(songIds);
        
        const sngs = [];

        for (const songId of songIds) {
            const sng = await Song.getSongById(songId); 
            sngs.push(sng);
        }

        if(!sngs){
            return res.status(404).json({
                status: "error", 
                message: "Songs from playlist not found"});
        }

        return res.status(200).json({
            status: "success", 
            message : `Songs from playlist with playlistId: ${playlistId} retrieved successfully`, 
            data : {songs: sngs}
        });

    }
    catch(err){
        console.log(`Error getting songs from playlist by id: ${err}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"
        });
    }


});

app.get("/playlists/getFriendsPlaylists/:userId", async (req, res) =>{

    const {userId} = req.params;

    try{

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: "error", 
                message: "Invalid user ID format" });
        }
        

        const friendsPlaylistsIds = await User.getFriendsPlaylists(userId);

        const frndsPlaylists = await Playlist.getFriendsPlaylists(friendsPlaylistsIds);

        console.log("pd",friendsPlaylistsIds ,"p:", frndsPlaylists);

        if(!frndsPlaylists || frndsPlaylists.length === 0){
            return res.status(404).json({
                status: "error", 
                message: "Playlists not found"});
        }

        return res.status(200).json({
            status: "success", 
            message : `playlists retrieved successfully`, 
            data: {friendsPlaylists: frndsPlaylists}
        });
    }
    catch(error){
        console.log(`Error getting Playlists: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"});
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



app.get("/songs/getSongs", async (req, res) =>{

    //const {userId} = req.params;

    try{

        

        const sngs = await Song.getSongs();

        if(!sngs || sngs.length === 0){
            return res.status(404).json({
                status: "error", 
                message: "Songs not found"});
        }

        return res.status(200).json({
            status: "success", 
            message : `Songs retrieved successfully`, 
            data: {songs: sngs}
        });
    }
    catch(error){
        console.log(`Error getting Songs: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"});
    }
    
});

app.get("/playlists/getPlaylists", async(req, res) =>{

    try{

        

        const ps = await Playlist.getAllPlaylists();
        

        if (!ps) {
            return res.status(404).json({
                status: "error",
                message: "Playlists not found"
            });
        }
        

        return res.status(200).json({
            status: "success",
            message: `Playlists retrieved successfully`,
            data: { playlists: ps }
        });


    }
    catch(error){
        console.log(`Error fetching friends: ${error}`);
        res.status(500).json({
            status: "error", 
            message: "Internal server error"
        });
    }
})



//PORT TO LISTEN TO
app.listen(3001, () => {
console.log("Listening on localhost:3001");
});