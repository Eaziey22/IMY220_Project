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
        console.log(user);
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
        const result = await this.collection.deleteOne({_id: new ObjectId(userId)});

        return result.deletedCount;
    }

}