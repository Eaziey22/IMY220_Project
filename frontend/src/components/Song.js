import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import * as styles from '../styles/song.module.css'

export class Song extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            showAddForm: false
        };
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            showMenu: !prevState.showMenu
        }));
    }

    toggleAddForm = () => {
        this.setState({showMenu:false});
        this.setState(prevState => ({ showAddForm: !prevState.showAddForm }));
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.toggleAddForm(); 
      };
 
    render(){

        const {image, name} = this.props;
        const { showMenu, showAddForm } = this.state;

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
                <div className={`${styles.addSongContainer} col-1 d-flex justify-content-end align-items-center`} onClick={this.toggleMenu}> 
                    <FontAwesomeIcon icon={faEllipsisV} />
                </div>
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
                      <div className={`${styles.playlistList}`}>
                        <div className={`${styles.playlistItem} row align-items-center`}>
                            <div className="col d-flex align-items-center" style={{marginBottom: '10px'}}>
                              <input 
                                type="checkbox" 
                                className={styles.formCheckInput}
                                id="playlist" 
                                name="playlist"
                              />
                              <label htmlFor="playlist" className={`${styles.playlistLabel}`} style={{marginLeft:'10px'}}>SA Hip Hop</label>
                            </div>
                        </div>
                      </div>
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