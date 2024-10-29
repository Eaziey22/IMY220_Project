import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as styles from '../styles/createPlaylist.module.css'
import { Navigate } from "react-router-dom";

export class CreatePlaylist extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            goToPlaylist: false,
            showCreateForm: false,
            successMessage: '',
            errorMessage: '',
            playlistId: '',
            playlistName: 'new Playlist',
            ownerId: localStorage.getItem('userId'),
            songs: []
        };
    }

    goToPlaylist = (playlistId) =>{
        //event.preventDefault();
        this.setState({goToPlaylist : true});
        this.setState({playlistId: playlistId});
    }

    toggleCreateForm = () => {
        this.setState(prevState => ({ showCreateForm: !prevState.showCreateForm }));
    };

    handleInputChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const { playlistName, ownerId, songs, playlistId } = this.state;

        if (playlistName && ownerId) {
            console.log("Playlist Name:", playlistName);
            console.log("OwnerId:", ownerId);
            console.log("songs:", songs);
            console.log("Playlist Id:", playlistId);

            const data= await this.createPlaylist(playlistName, ownerId, songs);
            console.log("PiD: ", data.data.playlist._id);
            
            this.setState({ showCreateForm: false, playlistId: '', playlistName: 'new playlist',ownerId: localStorage.getItem('userId') });
            this.goToPlaylist(data.data.playlist._id);
        } else {
            alert("Please fill out the name of your playlist.");
        }

        this.toggleCreateForm(); 
        
    };

    createPlaylist = async(playlistName, ownerId, songs) =>{
      try {


        console.log("info: ",ownerId,": " ,playlistName );

        const response = await fetch('/playlists/createPlaylist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
              playlistName,
              ownerId,
              songs, 
          }), 
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Playlist created successfully:', data);
            this.setState({ successMessage: 'playlist created successfully', errorMessage: '', playlistId: data.data.playlist._id  });
            
            return data;
        } else {

            console.log('Failed to create playlist:', data.message);
            this.setState({ errorMessage: 'Failed to create playlist', successMessage: '', playlistId: '' });
        }
      } catch (error) {
        console.log('Error creating playlist:', error);
        this.setState({ errorMessage: 'An error occurred while creating the playlist', successMessage: '', playlistId: '' });
      }
    }

    render(){

        const {goToPlaylist, showCreateForm, playlistId, playlistName} = this.state;

        if (goToPlaylist ) {
          const playlistRoute = `/playlist/${playlistId}`
          this.setState({playlistId: ''});
          return <Navigate to={playlistRoute} />; 
          
        }

        return(
            <div className={`${styles.createPlaylistContainer}`} onClick={this.toggleCreateForm}>
                <div className={`${styles.iconContainer}`}>
                        <FontAwesomeIcon className={styles.bigIcon} icon={faPlus} />
                </div>
                <div className={`${styles.titleContainer}`}>
                    <p className={styles.title}>New Playlist <span><FontAwesomeIcon icon={faPlus} color="white"/></span></p>
                </div>
                {showCreateForm && (
                <div className={styles.createFormOverlay} onClick={(e) => e.stopPropagation()}>
                  <div className={styles.createFormContainer}>
                    <h2>Create Playlist</h2>
                    <form onSubmit={this.handleFormSubmit}>
                      <div className={styles.formGroup}>
                        <label htmlFor="playlistName">Playlist Name:</label>
                        <input
                          type="text"
                          id="playlistName"
                          name="playlistName"
                          className={`${styles.formControl} form-control`}
                          value={playlistName}
                          onChange={this.handleInputChange}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className={styles.formActions}>
                        <button type="submit" className={styles.saveButton} onClick={(e) => e.stopPropagation()}>
                          Save
                        </button>
                        <button type="button" onClick={this.toggleCreateForm} className={styles.cancelButton}>
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