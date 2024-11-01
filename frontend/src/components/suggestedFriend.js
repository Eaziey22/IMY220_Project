import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import * as styles from '../styles/suggestedFriend.module.css';
import { Navigate } from "react-router-dom";

export class SuggestedFriend extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            SuggestedFriend : this.props.friend,
            goToFriendProfile: false,
            friendId: '',
        };
    }

    goToFriendProfile= (event, friendId) =>{
        event.preventDefault();

        this.setState({ goToFriendProfile: true, friendId });
        
    }

    

    render(){

        const { SuggestedFriend, goToFriendProfile, friendId } = this.state;

        if (goToFriendProfile) {
            var profileRoute = `/profile/${friendId}`
            return <Navigate to= {profileRoute} />; 
        }

        return (
            <div className={`${styles.userContainer}`} onClick={(event) => this.goToFriendProfile(event, SuggestedFriend._id)} >
                <div className={`${styles.circle}`}>
                    <div className={styles.iconContainer}>
                        <FontAwesomeIcon icon={faUserCircle} size="4x" color='#37D0D6' />
                    </div>
                </div>
                <div>
                    <p>{SuggestedFriend.username}</p>
                </div>
            </div>
        );
            
        
    }
}