import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import * as styles from '../styles/song.module.css'

export class Song extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            showAddForm: false,
            isUserProfile: true, 
            playlistsData: null,
            errorMessage: '',
            selectedPlaylists: [],
            songId: this.props.songId
        };
    }

    async componentDidMount(){
      await this.fetchUserPlaylists(localStorage.getItem('userId'));
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            showMenu: !prevState.showMenu
        }));
    }

    toggleAddForm = () => {
        this.setState({showMenu:false});
        //this.fetchUserPlaylists(localStorage.getItem("userId"));
        this.setState(prevState => ({ showAddForm: !prevState.showAddForm }));
    };

    handleFormSubmit = async (e) => {
      e.preventDefault();

      const { selectedPlaylists, songId } = this.state; // Ensure songId is set or retrieved
      const {onSongAdded } = this.props;

      console.log("songId: ", songId );
      if (selectedPlaylists.length === 0) {
          alert("Please select at least one playlist.");
          return;
      }
      
      try {
        
        await Promise.all(
            selectedPlaylists.map(playlistId => this.addSongToplaylist(playlistId, songId))
        );

        

        console.log("Song added to all selected playlists successfully.");

        await onSongAdded();
        
        
        this.setState({
            selectedPlaylists: [],
            showAddForm: false,
        });

        

      } catch (error) {
          console.error("Error adding song to playlists:", error);
          this.setState({ errorMessage: "Failed to add song to one or more playlists" });
      }

      
    };

    fetchUserPlaylists = async (uId) =>{

      //const userId = localStorage.getItem('userId');
      const userId = uId;

      try{

          const response = await fetch(`/playlists/getUserPlaylists/${userId}`);

          if(response.ok){
              const data = await response.json();
              //console.log("dt: " , data)
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

  
  addSongToplaylist = async (playlistId, songId) =>{

    try{
      const response = await fetch(`/playlists/addSong/${playlistId}/songs/${songId}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if(response.ok){
        console.log("song added to playlist successfully.");
      }
      else{
        this.setState({errorMessage: data.message || 'Failed to add song to playlist'});
      }
    }
    catch(err){
      console.error('Error adding song to playlists:', err);
          this.setState({ errorMessage: 'An error occurred while adding song to playlists' });
    }

  }

  handleCheckboxChange = (playlistId) => {
    this.setState((prevState) => {
        const { selectedPlaylists } = prevState;
        if (selectedPlaylists.includes(playlistId)) {
            
            return { selectedPlaylists: selectedPlaylists.filter(id => id !== playlistId) };
        } else {
            
            return { selectedPlaylists: [...selectedPlaylists, playlistId] };
        }
    });
};


    render(){

        let {image, name, isUserProfile} = this.props;
        const { showMenu, showAddForm, playlistsData } = this.state;

        console.log(isUserProfile);
        if(isUserProfile === undefined){
          isUserProfile = true;
        }

        return(
            <div>

            
            <div className={`${styles.musicContainer} row`}>
                <div className={`${styles.imageContainer} col-4 d-flex align-items-center`}>
                    <img className={styles.image} src={image} />
                </div>
                <div className={`${styles.titleContainer} col-5 d-flex align-items-center`}>
                    <p className={styles.title}>{name}</p>
                </div>
                <div className={`${styles.playIconContainer} col-2 d-flex justify-content-end align-items-center`}>
                    <button className="btn btn-dark rounded-circle">
                        <FontAwesomeIcon icon={faPlay} />
                    </button>

                </div> 
                {isUserProfile?<div className={`${styles.addSongContainer} col-1 d-flex justify-content-end align-items-center`} onClick={this.toggleMenu}> 
                    <FontAwesomeIcon icon={faEllipsisV} />
                </div>:<div></div>}
                {showMenu && (
                    <div className={styles.menu}>
                                <ul>
                                    <li onClick={this.toggleAddForm}>Add to Playlist</li>
                                </ul>
                    </div>
                )}
            </div>
            {showAddForm && (
                <div className={styles.addFormOverlay}>
                  <div className={styles.addFormContainer}>
                    <h2>Add Song to Playlist</h2>
                    <form onSubmit={this.handleFormSubmit}>
                      <div className={styles.formGroup}>
                        <label htmlFor="searchPlaylist">Search:</label>
                        <input
                          type="text"
                          id="searchPlaylist"
                          className={`${styles.formControl} form-control`}
                        />
                      </div>

                      {playlistsData && playlistsData.length > 0 ?(
                        <div className={`${styles.playlistList}`}>
                        {playlistsData.map((playlist, index) => (
                            <div key = {index} className={`${styles.playlistItem} row align-items-center `}>
                        
                          <div className="col d-flex align-items-center" style={{marginBottom: '10px'}}>
                              <input 
                                type="checkbox" 
                                className={styles.formCheckInput}
                                id={`playlist-${index}`}  
                                name="playlist"
                                onChange={() => this.handleCheckboxChange(playlist._id)}
                              />
                              <label htmlFor={`playlist-${index}`} className={`${styles.playlistLabel}`} style={{marginLeft:'10px'}}>{playlist.playlistName}</label>
                            </div>
                        </div>))}
                      </div>): (<div>You have No playlists</div>)}

                      <div className={styles.formActions}>
                        <button type="submit" className={styles.saveButton}>
                          Save
                        </button>
                        <button type="button" onClick={this.toggleAddForm} className={styles.cancelButton}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              </div>

        );

        
    }
}