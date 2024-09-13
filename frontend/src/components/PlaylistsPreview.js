import React from "react";
import { Navigate } from "react-router-dom";
/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';*/
import * as styles from '../styles/PlaylistPreview.module.css'

export class PlayListPreview extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            goToPlaylist: false
        };
    }

    goToPlaylist = (event) =>{
        event.preventDefault();
        this.setState({goToPlaylist : true});
    }

    render(){

        const {image, title, songAmount} = this.props;

        if (this.state.goToPlaylist) {
            return <Navigate to="/playlist" />; 
        }

        return(

            
            <div className={`${styles.playlistContainer}`} onClick={this.goToPlaylist}>
                <div className={`${styles.imageContainer}`}>
                    <img className={styles.image} src={image} />
                </div>
                <div className={`${styles.titleContainer}`}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.amount}>{songAmount} songs</p>
                </div>
            </div>
        );
    }
}