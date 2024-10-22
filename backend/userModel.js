const { ObjectId } = require('mongodb');

export class userModel{
    constructor(dbName){

        this.collection = dbName.collection("User");
    }

    async createUser(username, email, password){

        
        const result = await this.collection.insertOne({
            username,
            email,
            password, 
            friends: [],
            playlists: [],
            songs: []
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

    async addplaylistToPlaylists(userId, playlistId){

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


}