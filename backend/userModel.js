const { ObjectId } = require('mongodb');

export class userModel{
    constructor(dbName){

        this.collection = dbName.collection("User");
    }

    async createUser(name, surname, username,email, password, bio, pronouns, instagram, facebook, twitter ){

        
        const result = await this.collection.insertOne({
            name,
            surname,
            username,
            email,
            password, 
            friends: [],
            playlists: [],
            songs: [],
            profilePicture: '',
            bio,
            pronouns,
            instagram,
            facebook,
            twitter,
            likedSongs: [],
            dateJoined: new Date()
        });

        console.log("User added to database");
        return result;
    }

    async userExists(userEmail){
        const user = await this.collection.findOne({email : userEmail});
        //console.log(user);
        return user;
    }

    async login(uEmail){
        const user = await this.collection.findOne({email: uEmail});

        return user;
    }

    async getAllUsers(){
        const users = await this.collection.find({}).toArray();
        return users;
    }

    async getUserById(userId){

        const user = await this.collection.findOne({_id : new ObjectId(userId)});
        //console.log(user);
        return user;
    }


    async updateUser(userId, updateData){
        const result = await this.collection.updateOne(
            {_id : new ObjectId(userId)},
            {$set: updateData }
        );

        console.log(`user updated`);

        return result.modifiedCount > 0 ? result : null;

    }

    async deleteUser(userId){
        const result = await this.collection.deleteOne(
            {_id: new ObjectId(userId)}
        );

        return result.deletedCount;
    }

    async addFriend(userId, friendId){

        const result = await this.collection.updateOne(
            {_id : new ObjectId(userId)},
            {
                $addToSet: {friends: new ObjectId(friendId)}
            }
        );

        console.log(`friend added to friends`);

        return result.modifiedCount;

    }

    async removeFriend(userId, friendId){

        const result = await this.collection.updateOne(
            {
                _id : new ObjectId(userId)
            },
            {
                $pull: {friends: new ObjectId(friendId)}
            }
        );

        console.log(`friend removed from friends`);

        return result.modifiedCount;
    }

    async addToLikedPlaylists(userId, playlistId){

        const result = await this.collection.updateOne(
            {_id : new ObjectId(userId)},
            {
                $addToSet: {likedPlaylists: new ObjectId(playlistId)}
            }
        );

        console.log(`playlist added to liked playlists`);

        return result.modifiedCount;
    }

    async removeFromLikedPlaylists(userId, playlistId){

        const result = await this.collection.updateOne(
            {
                _id : new ObjectId(userId)
            },
            {
                $pull: {likedPlaylists: new ObjectId(playlistId)}
            }
        );

        console.log(`playlist removed from liked playlists`);

        return result.modifiedCount;
    }

    async getLikedPlaylists(userId){

        try{
            const user = await this.getUserById(userId);

            
            if (user) {
                return user.likedPlaylists || []; 
            } else {
                throw new Error("User not found");
            }
        } catch (error) {
            console.error("Error retrieving liked playlists:", error);
            throw error; 
    }
    }
    
    async addSongToSongs(userId, songId){

        const result = await this.collection.updateOne(
            {_id : new ObjectId(userId)},
            {
                $addToSet: {songs: new ObjectId(songId)}
            }
        );

        console.log(`song added to songs`);

        return result.modifiedCount;

    }

    async removeSongFromSongs(userId, songId){

        const result = await this.collection.updateOne(
            {
                _id : new ObjectId(userId)
            },
            {
                $pull: {songs: new ObjectId(songId)}
            }
        );

        console.log(`song removed from songs`);

        return result.modifiedCount;
    }

    async addPlaylistToPlaylists(userId, playlistId){

        const result = await this.collection.updateOne(
            {_id : new ObjectId(userId)},
            {
                $addToSet: {playlists: new ObjectId(playlistId)}
            }
        );

        console.log(`playlist added to Playlists`);

        return result.modifiedCount;

    }

    async removePlaylistFromPlaylists(userId, playlistId){

        const result = await this.collection.updateOne(
            {
                _id : new ObjectId(userId)
            },
            {
                $pull: {playlists: new ObjectId(playlistId)}
            }
        );

        console.log(`playlist removed from playlists`);

        return result.modifiedCount;
    }

    async getFriends(friends) {
        if (friends && friends.length > 0) {
            
            const result = await Promise.all(
                friends.map(async (friendId) => {
                    return await this.getUserById(friendId); 
                })
            );

    
            return result; 
        } else {
            return []; 
        }
    }

    async getSuggestedFriends(friends, userId){


        if (friends && friends.length > 0){
            const excludedFriends = friends.map(id => new ObjectId(id));
            excludedFriends.push(new ObjectId(userId));

            const results = await this.collection.find({
                _id: { $nin: excludedFriends }
              }).toArray();

            return results;
        }
        else{

            const excludedFriends = [new ObjectId(userId)];

            const results = await this.collection.find({
                _id: { $nin: excludedFriends }
              }).toArray();

            //console.log(results);

            return results;
        }
        
    }
    
    async getFriendsPlaylists(userId){
        console.log("yy:", userId);
        try{
            const user = await this.getUserById(userId);

            
            if (user) {
                return user.friends || []; 

            } else {
                throw new Error("User not found");
            }
        } catch (error) {
            console.error("Error retrieving friends Playlists:", error);
            throw error; 
        }
    }


}