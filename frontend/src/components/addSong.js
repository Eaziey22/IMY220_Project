import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as styles from '../styles/addSong.module.css'

export class AddSong extends React.Component{

    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef(); 
    }

    handleAddSongClick = () => {
        this.fileInputRef.current.click(); 
    }

    handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Handle file upload or processing here
            console.log("Selected file:", file);
        }
    }

    render(){

        return(
            <div className={`${styles.addSongContainer}`} onClick={this.handleAddSongClick}>
                <div className={`${styles.titleContainer}`}>
                    <p className={styles.title}>addSong<span><FontAwesomeIcon icon={faPlus} color="white"/></span></p>
                </div>
                <input
                    type="file"
                    ref={this.fileInputRef}
                    onChange={this.handleFileChange}
                    style={{ display: 'none' }} 
                />
            </div>
        );
    }
}