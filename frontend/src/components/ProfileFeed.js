import React from "react";
import * as styles from '../styles/ProfileFeed.module.css'
import { Song } from "./Song";
import { PlayListPreview } from "./PlaylistsPreview";
import { CreatePlaylist } from "./createPlaylist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faEllipsisV, faTimes } from '@fortawesome/free-solid-svg-icons';
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
            errorMessage: '',
            playlistsData: null,
            songData: null,
            friends: this.props.friends,
            isUserProfile: true,
            showFriends: false,
            
        }; 
    }

    isUser(userId){

        if(userId !== localStorage.getItem('userId')){
            
            return false;
        }

        return true;
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            showMenu: !prevState.showMenu
        }));
    }

    toggleEditForm = () => {
        //this.setState({showMenu:false});
        this.setState(prevState => ({ showEditForm: !prevState.showEditForm }));
    };
    
      handleInputChange = (e) => {

        const newUserData = {...this.state.userData, username: e.target.value};
        this.setState({ userData: newUserData, username: e.target.value});

        

    };

    toggleFriendsMenu = () => {
        console.log(this.state.showFriends);
        this.setState(prevState => ({
            showFriends: !prevState.showFriends
        }));
    }

    closeMenu = () =>{

        const sf = this.state.showFriends;
        if(sf){
            this.toggleFriendsMenu();
        }

        const se = this.state.showEditForm;
        if(se){
            this.toggleEditForm();
        }

        const sm= this.state.showMenu;
        if(sm){
            this.toggleMenu();
        }
        
    }

    closeMenu2 = () =>{

        const sm= this.state.showMenu;
        if(sm){
            this.toggleMenu();
        }
    }

    handleBothActions = () => {
        this.toggleEditForm();
        this.closeMenu2();
    }
    
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

    async componentDidMount() {
        this.setState({isUserProfile: this.isUser(this.props.paramsId) });
        this.fetchUserPlaylists();
        this.fetchUserSongs();
    }

    fetchUserPlaylists = async () =>{

        const userId = localStorage.getItem('userId');

        try{

            const response = await fetch(`/playlists/getUserPlaylists/${userId}`);

            if(response.ok){
                const data = await response.json();
                this.setState({ playlistsData: data.data.playlists, loading: false, errorMessage: '' });
                
            }
            else{
                this.setState({errorMessage: data.message || 'Failed to load playlists'});
            }
            

        }
        catch(err){
            console.error('Error fetching playlists:', err);
            this.setState({ errorMessage: 'An error occurred while fetching playlists' });
        }
    }

    fetchUserSongs = async() =>{

        const userId = localStorage.getItem("userId");

        try{
            const response = await fetch(`/songs/getUserSongs/${userId}`);

            if(response.ok){
                const data = await response.json();
                this.setState({ songData: data.data.songs, loading: false, errorMessage: '' } , () =>{
                    console.log(this.state.songData);
                });
                
            }
            else{
                this.setState({errorMessage: data.message || 'Failed to load songs'});
            }
        }
        catch(err){
            console.error('Error fetching playlists:', err);
            this.setState({ errorMessage: 'An error occurred while fetching songs' });
        }
    }

    render(){

        const { showMenu,showEditForm, userData, username, userPicture, playlistsData, songData, friends, isUserProfile, showFriends } = this.state;
        
        const userName = username;


        //const userName = userData? userData.username: "Loading...";

        return (
            <div className={styles.feed}  >
                <h3 className={styles.header}>Profile</h3>
                <div className={styles.profile} >
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
                            <div className={`${styles.playlistFriendsContainer}`}>
                                <p>{playlistsData ? playlistsData.length : 0} Playlists</p>
                                <p onClick={this.toggleFriendsMenu} className = {styles.friendsText}>{friends.length} friends</p>
                            </div>
                            {!isUserProfile? <button className={`${styles.followButton} btn`}>Follow</button>: <div></div>}
                        </div>
                    
                        <div className={`${styles.menuContainer}`} >
                            <button className={styles.menuButton} onClick={this.toggleMenu}>
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            {showMenu && (
                                
                                <div className={styles.menu} >
                                    <ul>
                                        <li onClick={this.handleBothActions} >Edit Profile</li>
                                        <li>Copy Profile Link</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    {showEditForm && (
                      <div className={styles.editFormOverlay} onClick={this.closeMenu} >
                        <div className={styles.editFormContainer} onClick={e => e.stopPropagation()}>
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
                {showFriends && (
                    <div className={styles.friendsMenuOverlay} onClick={this.closeMenu}>
                        <div className={styles.friendsMenu} onClick={e => e.stopPropagation()}>
                            <button className={styles.closeFriendsMenuButton} onClick={this.toggleFriendsMenu} >
                                <FontAwesomeIcon icon={faTimes}  />
                            </button>
                            <div className={styles.friendsListContainer}>
                                <h5>Your Friends</h5>
                                <ul>
                                    {friends && friends.length > 0 ? (
                                      friends.map((friend, index) => (
                                        <li key={index}>{index + 1}.{friend.username}</li>
                                      ))
                                    ) : (
                                      <li>You have no friends yet</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                 )}

                 
                <div className={styles.playlists}>
                    <h3 className={styles.header}>Your Playlists</h3>
                    {playlistsData? <div className={`${styles.playlistsContainer} row`}>
                        {playlistsData.slice(0, 5).map((playlist, index) => (
                            <div className="col-12 col-md-6 col-lg-2" key={index}>
                                <PlayListPreview image='' title={playlist.playlistName} songAmount={playlist.songs.length} playlistId = {playlist._id} />
                            </div>
                        ))}
                        <div className="col-12 col-md-6 col-lg-3">
                            <CreatePlaylist />
                        </div>
                    </div>: <div></div>}
                </div>

                <div className={styles.songsOfTheWeek}>
                    <h3 className={styles.header}>Your Songs</h3>
                    {songData? <div className={`${styles.songsOfTheWeekContainer} row`}>
                        {songData.map((music, index) => (
                            <div className="col-12 col-md-6 col-lg-3" key={index}>
                                <Song image="" name={music.name} />
                            </div>
                        ))}
                        <div className="col-12 col-md-6 col-lg-3">
                            <AddSong/>
                        </div>
                    </div>:<div></div>}
                </div>

            </div>
        );
    }
}