

export class userClass{
    constructor(dbName){

        this.collection = dbName.collection("User");
    }

    async createUser({username, email, password}){
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

    async getAllUsers(){
        const users = await this.collection.find({}).toArray();
        return users;
    }

    async getUserById(userId){

        const user = this.collection.findOne({_id : userId});

        return user;
    }


    async updateUser(userId, updateData){
        const result = await this.collection.updateOne(
            {_id : userId},
            {$set: updateData }
        );

        console.log(`user updated`);

        return result.modifiedCount;

    }

    async deleteUser(userId){
        const result = await this.collection.deleteOne({_id: userId});

        return result.deleteCount;
    }

}