import React from "react";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from '../styles/PlaylistPreview.module.css'
import { Card, Button } from 'react-bootstrap';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faMusic } from "@fortawesome/free-solid-svg-icons";
//import Logo from '../../public/assets/images/logo_no_background.png';

export class PlayListPreview extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            goToPlaylist: false,
            playlistData: null,
            
            isLikedPlaylist: this.props.isLikedPlaylist
        }; 
    }

    /*async onComponentDidMount(){
        this.isPlaylistLiked(this.props.playlist._id);
    }*/


    goToPlaylist = (event) =>{
        event.preventDefault();
        this.setState({goToPlaylist : true});
    }

    addToLikedPlaylists = async (event) =>{
        event.stopPropagation(); 

        const { playlistId } = this.props;
        const userId = localStorage.getItem('userId');

        try {
            const response = await fetch(`/user/${userId}/like/${playlistId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                
                this.setState((prevState) => ({ isLikedPlaylist: !prevState.isLikedPlaylist }));
            } else {
                console.error("Failed to update liked playlist status");
            }
        } catch (error) {
            console.error("Error liking playlist:", error);
        }
    }

    removeFromLikedPlaylists = async (event)=>{
        event.stopPropagation(); 

        const { playlistId } = this.props;
        const userId = localStorage.getItem('userId');

        try {
            const response = await fetch(`/user/${userId}/unlike/${playlistId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                
                this.setState((prevState) => ({ isLikedPlaylist: !prevState.isLikedPlaylist }));
            } else {
                console.error("Failed to update liked playlist status");
            }
        } catch (error) {
            console.error("Error unliking playlist:", error);
        }
    }

    /*toggleLike = async (event) => {
        event.stopPropagation();

        this.setState(prevState => ({ liked: !prevState.liked }));
    }*/

    render(){

        const { image, title, songAmount, playlistId, username, ownerId} = this.props;
        
        

        const currentUserId = localStorage.getItem('userId');

        if (this.state.goToPlaylist) {
            var playlistRoute = `/playlist/${playlistId}`
            return <Navigate to= {playlistRoute} />; 
        }


        return(

            
            <div className={`${styles.playlistContainer}`} onClick={this.goToPlaylist}>
                <div className={`${styles.imageContainer}`}>
                    {image?(
                        <img className={styles.image} src={image} />
                    ): (
                        <FontAwesomeIcon icon={faMusic} color="#37D0D6" className={styles.icon} />
                    )}
                    {ownerId !== currentUserId && (
                        <FontAwesomeIcon
                            icon={this.state.isLikedPlaylist ? solidHeart : regularHeart}
                            size="2x"
                            className={this.state.isLikedPlaylist ? styles.heartIconActive : styles.heartIcon}
                            onClick={this.state.isLikedPlaylist ? this.removeFromLikedPlaylists : this.addToLikedPlaylists}
                        />)}
                </div>
                <div className={`${styles.titleContainer}`}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.username}>by {username}</p>
                </div>
            </div>
        );
    }
}