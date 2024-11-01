import React from "react";
import * as styles from '../styles/playlists.module.css';
import { PlayListPreview } from "./PlaylistsPreview";
import { CreatePlaylist } from "./createPlaylist";

/*
const playlists = [
    {
        image: "../../public/assets/images/logo.png",
        title: "SA Hip Hop",
        songAmount: 240
    },
    {
        image: "../../public/assets/images/logo.png",
        title: "Soul",
        songAmount: 30
    },
    {
        image: "../../public/assets/images/logo.png",
        title: "Amapiano",
        songAmount: 440
    }
    ,
    {
        image: "../../public/assets/images/logo.png",
        title: "Amapiano",
        songAmount: 440
    }
    ,
    {
        image: "../../public/assets/images/logo.png",
        title: "Amapiano",
        songAmount: 440
    },
    {
        image: "../../public/assets/images/logo.png",
        title: "Amapiano",
        songAmount: 440
    }
];*/

export class Playlistsfeed extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          playlists: this.props.playlists,
          errorMessage: "",
        };
    }

    render(){
        const {playlists, errorMessage} = this.state;
        //console.log("myPl" , playlists);
        return(
            

            <div className={styles.feed}>
                <div className={styles.playlists}>
                    <h3 className={styles.header}>Your Playlists</h3>
                    <div className={`${styles.playlistsContainer} row`}>
                        {playlists.map((playlist, index) => (
                            <div className="col-12 col-md-6 col-lg-2" key={index}>
                                <PlayListPreview image="../../public/assets/images/logo.png" title={playlist.playlistName} songAmount={playlist.songs.length} playlistId = {playlist._id} />
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