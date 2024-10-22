import React from "react";
import * as styles from '../styles/Feed.module.css'
import { Song } from "./Song";
import { PlayListPreview } from "./PlaylistsPreview";
import { CreatePlaylist } from "./createPlaylist";
import { AddSong } from "./addSong";


export class Feed extends React.Component{

    render(){
        
        const {playlists, userSongs, recentMusicData, fetchUserSongs } = this.props;

        return (


            <div className={styles.feed}>
                
                <div className={styles.songsOfTheWeek}>
                    <h3 className={styles.header}>Your Songs</h3>
                     <div className={`${styles.songsOfTheWeekContainer} row`}>
                        {userSongs.slice(0,7).map((music, index) => (
                            <div className="col-12 col-md-6 col-lg-3" key={index}>
                                {userSongs?<Song onHandleSubmit = {this.fetchUserSongs} image="" name={music.name} />: <div></div>}
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