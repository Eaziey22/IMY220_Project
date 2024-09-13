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
            showCreateForm: false
        };
    }

    goToPlaylist = (event) =>{
        event.preventDefault();
        this.setState({goToPlaylist : true});
    }

    toggleCreateForm = () => {
        this.setState(prevState => ({ showCreateForm: !prevState.showCreateForm }));
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.toggleCreateForm(); 
        this.goToPlaylist(e);
    };

    render(){

        const {goToPlaylist, showCreateForm} = this.state;
        if (goToPlaylist) {
            return <Navigate to="/playlist" />; 
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
                          className={`${styles.formControl} form-control`}
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