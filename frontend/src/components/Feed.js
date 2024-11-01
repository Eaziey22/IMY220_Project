import React from "react";
import * as styles from '../styles/Feed.module.css'
import { Song } from "./Song";
import { PlayListPreview } from "./PlaylistsPreview";
import { CreatePlaylist } from "./createPlaylist";
import { AddSong } from "./addSong";


export class Feed extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            playlists: this.props.playlists,
            userSongs: this.props.userSongs,
        };
    }

    fetchPlaylists = async () => {
        const { fetchUserPlaylists } = this.props; 
        const updatedPlaylists = await fetchUserPlaylists(); 
        this.setState({ playlists: updatedPlaylists });
    };

    handleSongAddition = async () => {
        
        await this.fetchPlaylists();
    };

    render(){
        
        const {playlists, userSongs, recentMusicData, fetchUserSongs, fetchUserPlaylists } = this.props;

        return (


            <div className={styles.feed}>
                
                <div className={styles.songsOfTheWeek}>
                    <h3 className={styles.header}>Your Songs</h3>
                     <div className={`${styles.songsOfTheWeekContainer} row`}>
                        {userSongs.slice(0,7).map((music, index) => (
                            <div className="col-12 col-md-6 col-lg-3" key={index}>
                                
                                {userSongs?<Song onHandleSubmit = {this.fetchUserSongs} image="" name={music.name} songId = {music._id} onSongAdded={this.handleSongAddition}/>: <div></div>}
                            </div>
                        ))}
                        <div className="col-12 col-md-6 col-lg-3">
                            <AddSong fetchUserSongs={fetchUserSongs}/>
                        </div>
                    </div>
                    
                </div>
                <div className={styles.playlists}>
                    <h3 className={styles.header}>Your Playlists</h3>
                    <div className={`${styles.playlistsContainer} row`}>
                        {playlists.slice(0, 5).map((playlist, index) => (
                            <div className="col-12 col-md-6 col-lg-2" key={index}>
                                <PlayListPreview image='' title={playlist.playlistName} songAmount={playlist.songs.length} playlistId = {playlist._id}/>
                            </div>
                        ))}
                        <div className="col-12 col-md-6 col-lg-3">
                            <CreatePlaylist />
                        </div>
                    </div>
                </div>
                <div className={styles.playlists}>
                    <h3 className={styles.header}>Your friends Playlists</h3>
                    <div className={`${styles.playlistsContainer} row`}>
                        {playlists.slice(0, 5).map((playlist, index) => (
                            <div className="col-12 col-md-6 col-lg-2" key={index}>
                                <PlayListPreview image='' title={playlist.playlistName} songAmount={playlist.songs.length} playlistId = {playlist._id}/>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        );
    }
}