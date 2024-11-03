import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faUserCircle, faEllipsisV, faHeart } from "@fortawesome/free-solid-svg-icons";
import * as styles from '../styles/playlistFeed.module.css';
import { Navigate } from "react-router-dom";

export class PlaylistFeed extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            showEditForm: false,
            playlistData : this.props.playlist,
            playlistName: this.props.playlist.playlistName,
            coverImage: this.props.playlist.coverImage,
            playlistSongs: [],
            userData: null,
            showRemovePrompt: false,
            errorMessage: '',
            songId: '',
            genres: ['Pop', 'Rock', 'Hip Hop', 'Jazz', 'Classical', 'Country'],
            category: '', 
            description: '', 
            hashtags: '',
            showConfirmDelete: false,
            goToHome: false

        };
    }

  async componentDidMount() {
    //var playlistId = this.props.params.pId;
    //this.fetchPlaylistById(playlistId);
    //withPlaylistProps();
    console.log("pId:", this.state.playlistData._id);

    this.fetchPlaylistSongs(this.state.playlistData._id);
    this.fetchUserData(this.state.playlistData.ownerId);

     
  }

  fetchPlaylistSongs = async (playlistId) => {

    const pId = playlistId;

    try{
  
      const response = await fetch(`/playlist/getPlaylistSongs/${pId}`);

      if(response.ok){
          const data = await response.json();
          this.setState({ playlistSongs: data.data.songs, loading: false, errorMessage: '' });
          
      }
      else{
          this.setState({errorMessage: data.message || 'Failed to load playlist songs'});
      }
      

    }
    catch(err){
        console.error('Error fetching playlist songs:', err);
        this.setState({ errorMessage: 'An error occurred while fetching playlist songs' });
    }

    
  }


  async fetchUserData(uId){

    const userId = uId;

    try{
            
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
          
      }
      else{
          
          this.setState({ errorMessage: udata.message || 'could not get user profile' , loading: false});
      }
    }
    catch(err){
        console.error('Error fetching playlist owner:', err);
        this.setState({ errorMessage: 'An error occurred while fetching playlist owner' });
    }

  }

  removeSongFromPlaylist = async(songId) =>{

    const playlistId = this.props.playlist._id;

    //console.log("p: ", playlistId, songId);

    try{
      
      const response = await fetch(`/playlists/removeSong/${playlistId}/songs/${songId}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if(response.ok){
        console.log("song removed from playlist successfully.");
        this.fetchPlaylistSongs(this.state.playlistData._id);
        //alert("song removed from playlist successfully.")
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

  

    toggleMenu = () => {
        this.setState(prevState => ({
            showMenu: !prevState.showMenu
        }));
    }

    toggleEditForm = () => {
      this.setState({showMenu:false});
      this.setState(prevState => ({ showEditForm: !prevState.showEditForm }));
    };

    toggleConfirmDeleteForm = () =>{
      this.setState({showMenu:false});
      this.setState(prevState => ({ showConfirmDelete: !prevState.showConfirmDelete }));
    }

    handleInputChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };
    
    handleImageChange = (e) => {
      this.setState({ coverImage: e.target.files[0] });
    };
    
    handleFormSubmit  = async (e) => {
      e.preventDefault();

      const { playlistName, coverImage, category, description, hashtags } = this.state;
      const playlistId = this.props.playlist._id;

      const formData = new FormData();
      formData.append('playlistName', playlistName);
      formData.append('coverImage', coverImage);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('hashtags', hashtags);

      try {

        const response = await fetch(`/playlists/updatePlaylist/${playlistId}`, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {

            const updatedPlaylist = await response.json();

            console.log("updatedPlaylist222222222222222:", updatedPlaylist);

            this.setState({
                playlistData: updatedPlaylist.data.playlistData,
                playlistName: updatedPlaylist.data.playlistData.playlistName,
                coverImage: updatedPlaylist.data.playlistData.coverImage,
                playlistSongs: updatedPlaylist.data.playlistData.songs,
                category: updatedPlaylist.data.playlistData.category, 
                description: updatedPlaylist.data.playlistData.description, 
                hashtags: updatedPlaylist.data.playlistData.hashtags,
                showEditForm: false, 
                errorMessage: ''
            });
            console.log("Playlist updated successfully:", updatedPlaylist.data.playlistData);
        } else {
            const data = await response.json();
            this.setState({ errorMessage: data.message || 'Failed to update playlist' });
        }
      } catch (err) {
          console.error('Error updating playlist:', err);
          this.setState({ errorMessage: 'An error occurred while updating the playlist' });
      }


    }; 


    toggleRemovePrompt = (songId) =>{
      this.setState(prevState => ({
        showRemovePrompt: !prevState.showRemovePrompt,
        songId: prevState.showRemovePrompt ? '' : songId,
      }));

      /*if(this.state.showRemovePrompt){
        this.setState({songId : songId});
      }
      else{
        this.setState({songId : ''});
      }*/
      
    }

    handleRemoveSong = async() =>{

      const {songId} = this.state;
      console.log(songId);
      //this.setState({songId: songId});
      await this.removeSongFromPlaylist(songId);
      this.toggleRemovePrompt();
    }

    deletePlaylist = async (ownerId ,playlistId) => {

      
      try{
  
        const response = await fetch(`/playlists/deletePlaylist/${ownerId}/${playlistId}`, {
          method: 'DELETE', 
        });
  
        if(response.ok){
            const data = await response.json();
            console.log(data, 'playlist(s) deleted');
            this.setState({errorMessage: '', showConfirmDelete: false, goToHome: true});
        }
        else{
            const data = await response.json();
            this.setState({errorMessage: data.message || 'Failed to load playlist songs'});
        }
        
  
      }
      catch(err){
          console.error('Error fetching playlist songs:', err);
          this.setState({ errorMessage: 'An error occurred while fetching playlist songs' });
      }
  }

    render(){

        const { showMenu,showEditForm,playlistData, playlistName, coverImage,playlistSongs, userData, showRemovePrompt, category, genres, description, hashtags, showConfirmDelete, goToHome} = this.state;

        if (goToHome ) {
          
          return <Navigate to="/home" />; 
          
        }
        
        return(
            <div className={styles.feed}>
                <div className={styles.playlist}>
                    <div className={`${styles.playlistContainer} row`}>
                        <div className={`${styles.playlistPictureContainer} col-12 col-md-6 col-lg-3`}>
                            {coverImage ? (
                                  <img src={coverImage} alt="coverImage" className={styles.playlistImage} />
                                ) : (
                                  <FontAwesomeIcon icon={faMusic} color="#37D0D6" className={styles.icon} />
                                )}
                        </div>
                        <div className={` ${styles.playlistInfo} col-12 col-md-6 col-lg-3`}>
                            <h3>{playlistName}</h3>
                            {userData?<p><FontAwesomeIcon icon={faUserCircle} color="#37D0D6" className={styles.userIcon} />{userData.username} - {playlistData.songs.length} songs</p>
                            : <p><FontAwesomeIcon icon={faUserCircle} color="#37D0D6" className={styles.userIcon} />{playlistData.songs.length} songs</p> }
                        </div>
                        <div className={`${styles.menuContainer}`}>
                            <button className={styles.menuButton} onClick={this.toggleMenu}>
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            {showMenu && (
                                <div className={styles.menu}>
                                    <ul>
                                        <li onClick={this.toggleEditForm}>Edit Playlist</li>
                                        <li onClick={this.toggleConfirmDeleteForm}>Delete playlist</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        {showConfirmDelete && (
                          <div className={styles.confirmDeletePrompt}>
                              <p>Are you sure you want to delete the playlist "{playlistName}"?</p>
                              {playlistData?<button onClick={() => this.deletePlaylist(playlistData.ownerId, playlistData._id)}>Yes, delete</button>: <div></div>}
                              <button onClick={this.toggleConfirmDeleteForm}>Cancel</button>
                          </div>
                       )}
                    </div>
                    {showEditForm && (
                      <div className={styles.editFormOverlay}>
                        <div className={styles.editFormContainer}>
                          <h2>Edit Playlist</h2>
                          <form onSubmit={this.handleFormSubmit}>
                            <div className={styles.formGroup}>
                              <label htmlFor="playlistName">Name</label>
                              <input
                                type="text"
                                id="playlistName"
                                name = "playlistName"
                                value={playlistName}
                                onChange={this.handleInputChange}
                                className={`${styles.formControl} form-control`}
                              />
                            </div>
                            <div className={styles.formGroup}>
                              <label htmlFor="category">Category:</label>
                              <select
                                  id="category"
                                  name="category"
                                  className={`${styles.formControl} form-control`}
                                  value={category}
                                  onChange={this.handleInputChange}
                                  
                              >
                                  <option value="">Select Genre</option>
                                  {genres.map((genre) => (
                                      <option key={genre} value={genre}>{genre}</option>
                                  ))}
                              </select>
                            </div>
                            <div className={styles.formGroup}>
                              <label htmlFor="description">Description:</label>
                              <textarea
                                  id="description"
                                  name="description"
                                  className={`${styles.formControl} form-control`}
                                  value={description}
                                  onChange={this.handleInputChange}

                              />
                            </div>
                            <div className={styles.formGroup}>
                              <label htmlFor="coverImage">Cover Image</label>
                              <input
                                type="file"
                                id="coverImage"
                                name="coverImage"
                                className={`${styles.formControl} form-control`}
                                onChange={this.handleImageChange}
                              />
                            </div>
                            <div className={styles.formGroup}>
                              <label htmlFor="hashtags">Hashtags (Optional):</label>
                              <input
                                  type="text"
                                  id="hashtags"
                                  name="hashtags"
                                  className={`${styles.formControl} form-control`}
                                  value={hashtags}
                                  onChange={this.handleInputChange}
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

                <div className={styles.playlistSongs}>
                  <h3 className={styles.header}>Songs</h3>
                  <div className={styles.playlistSongsContainer}>
                    <div className={styles.searchContainer}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        style={{ padding: '5px 10px', width: '70%' }}
                      />
                    </div>
                    <div className={styles.tableContainer}>
                      <table className={`${styles.table} table}`}>
                        <thead className="thead-dark">
                          <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Album Name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {playlistSongs.map((song, index) => (
                            <tr key={song._id}>
                              <td>{index + 1}</td>
                              <td>{song.name}</td>
                              <td>{song.artistName}</td>
                              <td>{song.album}</td>
                              <td>
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  size="1x"
                                  color="#ff0000"
                                  className={styles.heartIcon}
                                  onClick={() => this.toggleRemovePrompt(song._id)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                        
                    {showRemovePrompt && (
                      <>
                        
                        <div className={styles.backdrop} onClick={() => this.setState({ showRemovePrompt: false })} />
                    
                        <div className={styles.removePrompt}>
                          <h4>Do you want to remove this song from the playlist?</h4>
                          <div className={styles.promptButtons}>
                            <button onClick={() => this.handleRemoveSong()} className={styles.confirmButton}>
                              Yes
                            </button>
                            <button onClick={() => this.setState({ showRemovePrompt: false })} className={styles.cancelButton}>
                              No
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                

                {/*<div className={styles.songsOfTheWeek}>
                    <h3 className={styles.header}>Your Songs</h3>
                    <div className={`${styles.songsOfTheWeekContainer} row`}>
                        {songsOfWeekData.map((music, index) => (
                            <div className="col-12 col-md-6 col-lg-3" key={index}>
                                <Song image={music.image} name={music.name} />
                            </div>
                        ))}
                    </div>
                </div>*/}
            </div>

        );
    }
}


