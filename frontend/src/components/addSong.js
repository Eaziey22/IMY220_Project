import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as styles from '../styles/addSong.module.css'

export class AddSong extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            songTitle: '',
            artist: '',
            genre: '',
            album: '',
            ownerId: localStorage.getItem('userId'),
            date: new Date(),
            file: null,
            successMessage: '',
            errorMessage: ''
        };
        this.fileInputRef = React.createRef(); 
    }

    toggleFormVisibility = () => {
        this.setState((prevState) => ({ showForm: !prevState.showForm }));
    }

    /*
    handleAddSongClick = () => {
        this.fileInputRef.current.click(); 
    }*/

    handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Selected file:", file);
            this.setState({ file: file });
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { songTitle, artist, file, genre,album,ownerId,date, } = this.state;

        if (songTitle && artist && file && genre && ownerId && date) {
            console.log("Song Title:", songTitle);
            console.log("Artist:", artist);
            console.log("Genre:", genre);
            console.log("Album:", album);
            console.log("OnwerId:", ownerId);
            console.log("date:", date);
            console.log("Selected file:", file);
            this.addSong(songTitle, artist, genre, album, ownerId, date, file);
            this.props.fetchUserSongs();
            this.setState({ showForm: false, songTitle: '', artist: '', genre: '',album: '',ownerId: localStorage.getItem('userId'),date: new Date, file: null });
        } else {
            alert("Please fill out all fields.");
        }
    }

    async addSong(songTitle, artist, genre,album,ownerId,date, file){

        try {

            const formData = new FormData();
            formData.append("name", songTitle);
            formData.append("artistName", artist);
            formData.append("genre", genre);
            formData.append("album", album);
            formData.append("ownerId", ownerId);
            formData.append("dateAdded", date);
            formData.append("file", file);

            console.log("info: ",ownerId,": " ,file );
    
            const response = await fetch('/songs/addSong', {
                method: 'POST',
                body: formData 
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Song added successfully:', data);
                this.setState({ successMessage: 'Song added successfully', errorMessage: '' });
                
                return data;
            } else {

                console.log('Failed to add song:', data.message);
                this.setState({ errorMessage: 'Failed to add song', successMessage: '' });
            }
        } catch (error) {
            console.log('Error adding song:', error);
            this.setState({ errorMessage: 'An error occurred while adding the song', successMessage: '' });
        }

    }

    render(){

        const { showForm, songTitle, artist, genre,album,ownerId,date } = this.state;

        

        return(
            <div className={`${styles.addSongContainer}`}>
                <div className={`${styles.titleContainer}`} onClick={this.toggleFormVisibility}>
                    <p className={styles.title}>
                        Add Song <span><FontAwesomeIcon icon={faPlus} color="white" /></span>
                    </p>
                </div>
                {showForm && (
                    <div className={`${styles.addSongFormOverlay}`} onClick={(e) => e.stopPropagation()}>
                        <div className={`${styles.addSongFormContainer}`}>
                            <h2>Add New Song</h2>
                            <form onSubmit={this.handleSubmit} className={`${styles.formGroup}`}>
                                <div className="mb-3">
                                    <label htmlFor="songTitle" className="form-label">Song Title:</label>
                                    <input
                                        type="text"
                                        id="songTitle"
                                        name="songTitle"
                                        className={`${styles.formControl} form-control`}
                                        value={songTitle}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="artist" className="form-label">Artist:</label>
                                    <input
                                        type="text"
                                        id="artist"
                                        name="artist"
                                        className={`${styles.formControl} form-control`}
                                        value={artist}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="album" className="form-label">Album:</label>
                                    <input
                                        type="text"
                                        id="album"
                                        name="album"
                                        className={`${styles.formControl} form-control`}
                                        value={album}
                                        onChange={this.handleInputChange}
                                        defaultValue={""}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="genre" className="form-label">Genre:</label>
                                    <select
                                        id="genre"
                                        name="genre"
                                        className={`${styles.formControl} form-control`}
                                        value={genre}
                                        onChange={this.handleInputChange}
                                        required
                                    >
                                        <option value="" disabled>Select Genre</option>
                                        <option value="Rock">Rock</option>
                                        <option value="Pop">Pop</option>
                                        <option value="Jazz">Jazz</option>
                                        <option value="Hip-Hop">Hip-Hop</option>
                                        <option value="RnB">RnB</option>
                                        <option value="Amapiano">Amapiano</option>
                                        <option value="Afro-Pop">Afro-Pop</option>
                                        <option value="Classical">Classical</option>
                                        <option value="Electronic">Electronic</option>
                                        <option value="Country">Country</option>
                                        <option value="Blues">Blues</option>
                                        <option value="Reggae">Reggae</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="file" className="form-label">Song File:</label>
                                    <input
                                        type="file"
                                        id="file"
                                        className={`${styles.formControl} form-control`}
                                        ref={this.fileInputRef}
                                        onChange={this.handleFileChange}
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary me-2">
                                        Save
                                    </button>
                                    <button type="button" onClick={this.toggleFormVisibility} className="btn btn-secondary">
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