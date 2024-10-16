import React from "react";
import * as styles from '../styles/Feed.module.css'
import { Song } from "./Song";
import { PlayListPreview } from "./PlaylistsPreview";
import { CreatePlaylist } from "./createPlaylist";
import { AddSong } from "./addSong";


export class Feed extends React.Component{

    render(){
        return (
            <div className={styles.feed}>
                <div className={styles.recentlyPlayedSongs}>
                    <h3 className={styles.header}>Recently played songs</h3>
                    <div className={`${styles.recentlyPlayedSongsContainer} row`}>
                        {this.props.recentMusicData.map((music, index) => (
                            <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
                                <Song image={music.image} name={music.name} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.songsOfTheWeek}>
                    <h3 className={styles.header}>Your Songs</h3>
                    <div className={`${styles.songsOfTheWeekContainer} row`}>
                        {this.props.songsOfWeekData.slice(0,7).map((music, index) => (
                            <div className="col-12 col-md-6 col-lg-3" key={index}>
                                <Song image={music.image} name={music.name} />
                            </div>
                        ))}
                        <div className="col-12 col-md-6 col-lg-3">
                            <AddSong/>
                        </div>
                    </div>
                    
                </div>
                <div className={styles.playlists}>
                    <h3 className={styles.header}>Your Playlists</h3>
                    <div className={`${styles.playlistsContainer} row`}>
                        {this.props.playlists.slice(0, 5).map((playlist, index) => (
                            <div className="col-12 col-md-6 col-lg-2" key={index}>
                                <PlayListPreview image='' title={playlist.playlistName} songAmount={playlist.songs.lenth} />
                            </div>
                        ))}
                        <div className="col-12 col-md-6 col-lg-3">
                            <CreatePlaylist />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}