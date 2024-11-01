import React from "react";
import * as styles from '../styles/ProfileFeed.module.css'
import { Song } from "./Song";
import { PlayListPreview } from "./PlaylistsPreview";
import { CreatePlaylist } from "./createPlaylist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faEllipsisV, faTimes, faMusic } from '@fortawesome/free-solid-svg-icons';
import { AddSong } from "./addSong";
import { Navigate } from "react-router-dom";


export class ProfileFeed extends React.Component{

    
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
            showEditForm: false,
            userData: null,
            profilePicture: null,
            errorMessage: '',
            playlistsData: null,
            songData: null,
            friends: null,
            isUserProfile: true,
            showFriends: false,
            goToFriendProfile: false,
            friendId: null,
            paramsId: this.props.paramsId,
            username: '',
            isUserFriend: false,
            
            
        }
    }

    isUser(userId){

        if(userId !== localStorage.getItem('userId')){
            
            return false;
        }

        return true;
    }

    isFriend(friendId, friends) {
        console.log("isFriend: ", friends.some(friendID => friendID === friendId));
        return friends.some(friendID => friendID === friendId);
    }

    toggleIsFriend = () =>{

        //this.addFriend(this.props.paramsId, this.props.paramsId);
        
        this.setState(prevState => ({
            isUserFriend: !prevState.isUserFriend
        }));

        
    }

    goToFriendProfile= (event, friendId) =>{
        event.preventDefault();

        this.setState({ goToFriendProfile: true, friendId }, () => {
            this.setState({isUserProfile: this.isUser(friendId) });
            this.fetchUserProfile(friendId); 
            this.setState({ goToFriendProfile: false }); 
            this.closeMenu();
        });
        
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
        //console.log(this.state.showFriends);
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
        const image = e.target.files[0];
        this.setState(prevState => ({
            userData: {
                ...prevState.userData,
                profilePicture: image
            }
        }));
    };
    
    handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        const updatedUserData = this.state.userData;

        formData.append("username", updatedUserData.username);
        //formData.append("email", updatedUserData.email);

        if(updatedUserData.profilePicture){
            formData.append("profilePicture", updatedUserData.profilePicture);
        }


        try{

            const response = await fetch(`/updateUser/${this.props.paramsId}`, {
                method : "PUT",
                body: formData
            });

            const result = await response.json();

            if(result.status === "error"){
                this.setState({errorMessage: result.message });
            }
            
            if(result.status === "success"){
                console.log(result.message);
            }

            this.fetchUserProfile(this.props.paramsId);

        }
        catch(error){
            console.error("Error updating user:", error);
            this.setState({ errorMessage: "Error updating user" });
        }

        this.toggleEditForm(); 
    };

    async componentDidMount() {
        this.setState({isUserProfile: this.isUser(this.props.paramsId) });
        
        await this.fetchUserProfile(this.props.paramsId);

        
    }


    fetchUserProfile = async(uId) =>{

        try{
            
            // userId = this.props.paramsId;
            const userId = uId;
            const response = await fetch(`/getUser/${userId}`,{
            
                method: 'GET',
                headers: {
                    "content-type" : "application/json"
                }
            });

            const udata = await response.json();

            

            if(udata.status === "success"){
                
                this.setState({userData: udata.data, loading: false}, () => {
                    console.log("State updated:", this.state.userData);
                });

                this.setState({username: udata.data.username});
                this.setState({profilePicture: udata.data.profilePicture});
                
            }
            else{
                
                this.setState({ errorMessage: udata.message || 'could not get user profile' , loading: false});
            }

            this.fetchUserPlaylists(userId);
            this.fetchUserFriends(userId);
            this.fetchUserSongs(userId);
            this.setState({ isUserFriend: this.isFriend(this.props.paramsId, udata.data.friends)});

        }
        catch(error){
            console.log('Error: ', error);
            this.setState({errorMessage: "could not get user profile", loading: false});
        }
    }

    fetchUserPlaylists = async (uId) =>{

        //const userId = localStorage.getItem('userId');
        const userId = uId;

        try{

            const response = await fetch(`/playlists/getUserPlaylists/${userId}`);

            if(response.ok){
                const data = await response.json();
                const sortedPlaylists = data.data.playlists.sort((a,b) => new Date(b.dateCreated) - new Date(a.dateCreated));
                this.setState({ playlistsData: sortedPlaylists, loading: false, errorMessage: '' });
                
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

    fetchUserSongs = async(uId) =>{

        //const userId = localStorage.getItem('userId');
        const userId = uId;

        try{
            const response = await fetch(`/songs/getUserSongs/${userId}`);

            if(response.ok){
                const data = await response.json();
                const sortedSongs = data.data.songs.sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                this.setState({ songData: sortedSongs, loading: false, errorMessage: '' } , () =>{
                    console.log("songData:", this.state.songData);
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

    fetchUserFriends = async (uId) =>{

        const userId = uId;

        try{

            const response = await fetch(`/user/getFriends/${userId}`);

            if(response.ok){
                const data = await response.json();

                this.setState({friends: data.data.friends});
            }
            else{
                const data = await response.json();
                this.setState({errorMessage: data.message || 'Failed to retrieve friends'});
            }
        }
        catch(err){

            console.error('Error fetching friends:', err);
            this.setState({ errorMessage: 'An error occurred while retrieving friends' });

        }
    }

    addFriend = async(uId, friendId) =>{

        //console.log("fId:", friendId);
        
        try{

            const response = await fetch(`/user/${uId}/addFriend/${friendId}`, {
                method : "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(response.ok){
                const data = await response.json();

                const updatedFriends = data.data.user.friends;
    
                /*this.setState({
                    userData: data.data.user,
                    isUserFriend: this.isFriend(friendId, updatedFriends)
                });*/
            
                //console.log(data.data.user);
                await this.fetchUserProfile(data.data.friend._id);

                this.setState({
                    isUserFriend: this.isFriend(friendId, updatedFriends)
                });
            }
            else{
                const data = await response.json();
                this.setState({errorMessage: data.message || 'Failed to retrieve friends'});

                
            }
        }
        catch(err){

            console.error('Error fetching friends:', err);
            this.setState({ errorMessage: 'An error occurred while retrieving friends' });

        }
    }

    removeFriend = async(uId, friendId) =>{

        console.log("hh: ", uId, ":", friendId);

        try{

            const response = await fetch(`/user/${uId}/removeFriend/${friendId}`, {
                method : "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(response.ok){
                const data = await response.json();

                const updatedFriends = data.data.user.friends;
    
                /*this.setState({
                    userData: data.data.user,
                    isUserFriend: this.isFriend(friendId, updatedFriends)
                });*/
            
                //console.log(data.data.user);
                await this.fetchUserProfile(data.data.friend._id);

                this.setState({
                    isUserFriend: this.isFriend(friendId, updatedFriends)
                });

                //return data.status;
            }
            else{
                const data = await response.json();
                this.setState({errorMessage: data.message || 'Failed to retrieve friends'});

                
            }
        }
        catch(err){

            console.error('Error fetching friends:', err);
            this.setState({ errorMessage: 'An error occurred while retrieving friends' });

        }
    }

    render(){

        const { showMenu,showEditForm, userData, profilePicture, playlistsData, songData, friends, isUserProfile, showFriends, goToFriendProfile, friendId, username, paramsId, isUserFriend } = this.state;
        
        const userName = username;

        console.log("pId:",paramsId);

        

        if (goToFriendProfile) {
            var profileRoute = `/profile/${friendId}`
            return <Navigate to= {profileRoute} />; 
        }

        //console.log("uData:", userData);


        //const userName = userData? userData.username: "Loading...";

        return (
            <div className={styles.feed}  >
                <h3 className={styles.header}>Profile</h3>
                <div className={styles.profile} >
                    {userData? <div className={`${styles.profileContainer} row`}>
                        <div className={`${styles.profilePictureContainer} col-12 col-md-6 col-lg-3`}>
                            {profilePicture ? (
                                  <img src={profilePicture} alt="Profile" className={styles.profileImage} />
                                ) : (
                                  <FontAwesomeIcon icon={faUserCircle} color="#37D0D6" className={styles.icon} />
                                )}
                        </div>
                        <div className={` ${styles.profileInfo} col-12 col-md-6 col-lg-3`}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ marginRight: '10px' }}>{userData.username}</h3>
                                {isUserFriend && <p style={{ color: 'green' }}>friends</p>}
                            </div>
                            <div className={`${styles.playlistFriendsContainer}`}>
                                <p>{playlistsData ? playlistsData.length : 0} Playlists</p>
                                {isUserFriend || isUserProfile? <p onClick={this.toggleFriendsMenu} className = {styles.friendsText}>{friends ? friends.length : 0} friends</p>
                                : <p className = {styles.notfriendsText}>{friends ? friends.length : 0} friends</p>}
                            </div>
                            {
                                !isUserProfile ? (
                                    isUserFriend ? (
                                        <button className={`${styles.followButton} btn`} onClick={() => this.removeFriend(localStorage.getItem("userId"), paramsId)}>Unfollow</button>
                                    ) : (
                                        <button className={`${styles.followButton} btn`} onClick={() => this.addFriend(localStorage.getItem("userId"), this.props.paramsId )}>Follow</button>
                                    )
                                ) : null
                            }
                        </div>
                    
                        <div className={`${styles.menuContainer}`} >
                        {isUserProfile?<button className={styles.menuButton} onClick={this.toggleMenu}>
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>:<div></div>}
                            {showMenu && (
                                
                                <div className={styles.menu} >
                                    <ul>
                                        <li onClick={this.handleBothActions} >Edit Profile</li>
                                        <li>Copy Profile Link</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>: <div>no data</div>}
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
                              <label htmlFor="profilePicture">Profile Picture</label>
                              <input
                                type="file"
                                id="profilePicture"
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
                                        <li key={index} onClick={(event) => this.goToFriendProfile(event, friend._id)}>{index + 1}.{friend.username}</li>
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
                    <h3 className={styles.header}>Playlists</h3>
                    {playlistsData? <div className={`${styles.playlistsContainer} row`}>
                        {playlistsData.slice(0, 5).map((playlist, index) => (
                            <div className="col-12 col-md-6 col-lg-2" key={index}>
                                <PlayListPreview image='' title={playlist.playlistName} songAmount={playlist.songs.length} playlistId = {playlist._id} />
                            </div>
                        ))}
                        {isUserProfile?<div className="col-12 col-md-6 col-lg-3">
                            <CreatePlaylist />
                        </div>:<div className=" d-flex justify-content-center align-items-center">
                            <FontAwesomeIcon icon={faMusic} size="8x" color="white" />
                        </div>}
                    </div>: <div></div>}
                </div>

                <div className={styles.songsOfTheWeek}>
                    <h3 className={styles.header}>Songs</h3>
                    {songData? <div className={`${styles.songsOfTheWeekContainer} row`}>
                        {songData.map((music, index) => (
                            <div className="col-12 col-md-6 col-lg-3" key={index}>
                                <Song image="" name={music.name} isUserProfile={isUserProfile} songId= {music._id}/>
                            </div>
                        ))}
                        {isUserProfile?<div className="col-12 col-md-6 col-lg-3">
                            <AddSong/>
                        </div>: <div className="col-12 col-md-6 col-lg-3"></div>}
                    </div>:<div></div>}
                </div>

            </div>
        );
    }
}