import React from "react";
import * as styles from '../styles/ProfileFeed.module.css'
import { Song } from "./Song";
import { PlayListPreview } from "./PlaylistsPreview";
import { CreatePlaylist } from "./createPlaylist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { AddSong } from "./addSong";

const songsOfWeekData = [
    {
        image: "../../public/assets/images/logo.png",
        name: "Song 1.1"
    },
    {
        image: "path/to/image2.jpg",
        name: "Song 1.2"
    },
    {
        image: "path/to/image3.jpg",
        name: "Song 1.3"
    },
    {
        image: "path/to/image3.jpg",
        name: "Song 1.4"
    },
    {
        image: "path/to/image3.jpg",
        name: "Song 1.5"
    }
];

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
];

export class ProfileFeed extends React.Component{

    
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            showEditForm: false,
            userData: this.props.userData,
            username: this.props.userData.username,
            userPicture: null,
            errorMessage: ''
        }; 
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            showMenu: !prevState.showMenu
        }));
    }

    toggleEditForm = () => {
        this.setState({showMenu:false});
        this.setState(prevState => ({ showEditForm: !prevState.showEditForm }));
      };
    
      handleInputChange = (e) => {

        const newUserData = {...this.state.userData, username: e.target.value};
        this.setState({ userData: newUserData, username: e.target.value});

        

      };
    
      handleFileChange = (e) => {
        this.setState({ userPicture: URL.createObjectURL(e.target.files[0]) });
      };
    
      handleFormSubmit = async (e) => {
        e.preventDefault();

        const updatedUserData = this.state.userData;


        try{

            const response = await fetch(`/updateUser/${localStorage.userId}`, {
                method : "PUT",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(updatedUserData)
            });

            result = await response.json();

            if(result.status === "error"){
                this.setState({errorMessage: result.message });
            }
            
            if(result.status === "success"){
                console.log(result.message);
            }


        }
        catch(error){
            console.error("Error updating user:", error);
            this.setState({ errorMessage: "Error updating user" });
        }

        this.toggleEditForm(); 
      };

    render(){

        const { showMenu,showEditForm, userData, username, userPicture } = this.state;
        
        const userName = username;

        //const userName = userData? userData.username: "Loading...";

        return (
            <div className={styles.feed}>
                <h3 className={styles.header}>Profile</h3>
                <div className={styles.profile}>
                    <div className={`${styles.profileContainer} row`}>
                        <div className={`${styles.profilePictureContainer} col-12 col-md-6 col-lg-3`}>
                            {userPicture ? (
                                  <img src={userPicture} alt="Profile" className={styles.profileImage} />
                                ) : (
                                  <FontAwesomeIcon icon={faUserCircle} color="#37D0D6" className={styles.icon} />
                                )}
                        </div>
                        <div className={` ${styles.profileInfo} col-12 col-md-6 col-lg-3`}>
                            <h3>{userName}</h3>
                            <p>{playlists.length} Playlists</p>
                        </div>
                        <div className={`${styles.menuContainer}`}>
                            <button className={styles.menuButton} onClick={this.toggleMenu}>
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            {showMenu && (
                                <div className={styles.menu}>
                                    <ul>
                                        <li onClick={this.toggleEditForm}>Edit Profile</li>
                                        <li>Copy Profile Link</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    {showEditForm && (
                      <div className={styles.editFormOverlay}>
                        <div className={styles.editFormContainer}>
                          <h2>Edit Profile</h2>
                          <form onSubmit={this.handleFormSubmit}>
                            <div className={styles.formGroup}>
                              <label htmlFor="userName">Name</label>
                              <input
                                type="text"
                                id="userName"
                                value={userName}
                                onChange={this.handleInputChange}
                                className={`${styles.formControl} form-control`}
                              />
                            </div>
                            <div className={styles.formGroup}>
                              <label htmlFor="userPicture">Profile Picture</label>
                              <input
                                type="file"
                                id="userPicture"
                                onChange={this.handleFileChange}
                                className={`${styles.formControl} form-control`}
                              />
                            </div>
                            <div className={styles.formActions}>
                              <button type="submit" className={styles.saveButton}>
                                Save
                              </button>
                              <button type="button" onClick={this.toggleEditForm} className={styles.cancelButton}>
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                </div>

                 
                <div className={styles.playlists}>
                    <h3 className={styles.header}>Your Playlists</h3>
                    <div className={`${styles.playlistsContainer} row`}>
                        {playlists.slice(0, 5).map((playlist, index) => (
                            <div className="col-12 col-md-6 col-lg-2" key={index}>
                                <PlayListPreview image={playlist.image} title={playlist.title} songAmount={playlist.songAmount} />
                            </div>
                        ))}
                        <div className="col-12 col-md-6 col-lg-3">
                            <CreatePlaylist />
                        </div>
                    </div>
                </div>

                <div className={styles.songsOfTheWeek}>
                    <h3 className={styles.header}>Your Songs</h3>
                    <div className={`${styles.songsOfTheWeekContainer} row`}>
                        {songsOfWeekData.map((music, index) => (
                            <div className="col-12 col-md-6 col-lg-3" key={index}>
                                <Song image={music.image} name={music.name} />
                            </div>
                        ))}
                        <div className="col-12 col-md-6 col-lg-3">
                            <AddSong/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}