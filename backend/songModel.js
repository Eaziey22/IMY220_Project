const {ObjectId} = require('mongodb');

export class songModel{

    constructor(db){
        this.collection = db.collection("Song");
    }

    async addSong(name, artistName, genre, album, song, ownerId){

        const result = await this.collection.insertOne({
            name, 
            artistName,
            genre,
            album,
            song,
            ownerId : new ObjectId(ownerId),
            dateAdded : new Date()
        });

        return result;
    }

    async deleteSong(songId){

        const result = await this.collection.deleteOne({
            _id : new ObjectId(songId)
        })


        return result.deletedCount;
    }

    async getUserSongs(userId){

        const userSongs = this.collection.find({ownerId : new ObjectId(userId)}).toArray();

        return userSongs;
    }

    async getSongById(songId){

        const song = this.collection.findOne({_id :new ObjectId(songId)});

        return song;
    }

    async deleteUserSongs(userId){
        const result = await this.collection.deleteMany(
            {ownerId: new ObjectId(userId)}
        );

        return result.deletedCount;
    }

}