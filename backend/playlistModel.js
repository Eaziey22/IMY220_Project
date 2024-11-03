const { ObjectId } = require('mongodb');

export class playlistModel{

    constructor(dbName)
    {
        this.collection = dbName.collection("Playlist");
    }

    async createPlaylist(playlistName, ownerId, songs, category,description, coverImage, hashtags, username){

        const result = await this.collection.insertOne({
            playlistName,
            ownerId : new ObjectId(ownerId),
            songs,
            category,
            description,
            coverImage,
            hashtags,
            dateCreated: new Date(),
            username
        });

        const playlist = await this.collection.findOne({ _id: result.insertedId });

        return playlist;
    }

    async getPlaylistById(playlistId){
        const playlist = await this.collection.findOne({_id : new ObjectId(playlistId) });

        return playlist;
    }

    async getUserPlaylists(userId){
        const playlists = await this.collection.find({ownerId : new ObjectId(userId)}).toArray();

        return playlists;
    }

    async deletePlaylist(playlistId){
        const result = await this.collection.deleteOne({_id: new ObjectId(playlistId)});

        return result.deletedCount;
    }

    async deleteUserPlaylists(userId){
        const result = await this.collection.deleteMany(
            {ownerId: new ObjectId(userId)}
        );

        return result.deletedCount;
    }

    async updatePlaylist(playlistId, updatedData){


        const result = await this.collection.updateOne(
            {_id : new ObjectId(playlistId)},
            {$set: updatedData }
        );

        if(result.modifiedCount>0){
            console.log(`playlist updated: `, result);
        }

        return result.modifiedCount > 0 ? result : null;

    }

    async addSongToPlaylist(playlistId, songId){

        const result = await this.collection.updateOne(
            {
                _id : new ObjectId(playlistId)
            },
            {
                $addToSet: {songs: new ObjectId(songId)}
            }
        );

        console.log(`song added to playlist`);

        return result.modifiedCount;
    }

    async removeSongFromPlaylist(playlistId, songId){
        const result = await this.collection.updateOne(
            {_id : new ObjectId(playlistId)},
            { $pull : {songs: new ObjectId(songId)}}
        );

        return result.modifiedCount;
    }

    async getSongsFromPlaylist(playlistId){

        const Playlist = await this.getPlaylistById(playlistId);

        if (!Playlist) {
            return [];
        }

        
        return Playlist.songs || [];
    }
}