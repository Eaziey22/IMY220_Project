import React from "react";
import * as styles from '../styles/Feed.module.css'
import { Song } from "./Song";
import { PlayListPreview } from "./PlaylistsPreview";
import { CreatePlaylist } from "./createPlaylist";
import { AddSong } from "./addSong";
import { SuggestedFriend } from "./suggestedFriend";


export class Feed extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            playlists: this.props.playlists,
            userSongs: this.props.userSongs,
            likedPlaylists: this.props.likedPlaylists,
            suggestedFriendsData: null, 
            likedStatus: []
        };
    }

    async componentDidMount(){
        await this.fetchSuggestedFriends(localStorage.getItem('userId'));
        await this.fetchPlaylists();
        this.updateLikedStatus();
        
    }

    fetchPlaylists = async () => {
        //const { fetchUserPlaylists } = this.props; 
        const updatedPlaylists = await this.props.fetchUserPlaylists(); 
        //console.log("up: ",updatedPlaylists);
        this.setState({ playlists: updatedPlaylists }, this.updateLikedStatus);
    };

    isPlaylistLiked = (playlistId) => {
        const { likedPlaylists } = this.state;
        return likedPlaylists.some(likedPlaylistId => likedPlaylistId === playlistId);
    };
    

    updateLikedStatus = async () => {
        const { playlists } = this.state;
        const likedStatus = await Promise.all(
            playlists.map(playlist => this.isPlaylistLiked(playlist._id))
        );
    
        
        this.setState({ likedStatus });
    };



    handleSongAddition = async () => {
        
        await this.fetchPlaylists();
    };

    fetchSuggestedFriends = async (userId) =>{

        try{
            const response = await fetch(`/user/getSuggestedFriends/${userId}`);

            if(response.ok){
                const data = await response.json();
                this.setState({ suggestedFriendsData: data.data.suggestedFriends, loading: false, errorMessage: '' } , () =>{
                    console.log(this.state.suggestedFriendsData);
                });
                
            }
            else{
                this.setState({errorMessage: data.message || 'Failed to get suggested friends'});
            }
        }
        catch(err){
            console.error('Error fetching suggested friends:', err);
            this.setState({ errorMessage: 'An error occurred while fetching suggested friends' });
        }
    }

    render(){
        
        const {playlists, userSongs,suggestedFriendsData, likedStatus } = this.state;

        
        const {fetchUserSongs} = this.props;

        return (


            <div className={styles.feed}>

                <div className={styles.songsOfTheWeek}>
                    <h3 className={styles.header}>suggested friends</h3>
                     <div className={`${styles.songsOfTheWeekContainer} row`}>
                        {suggestedFriendsData? 
                            (suggestedFriendsData.slice(0,8).map((friend, index) => (
                                <div className="col-12 col-md-6 col-lg-3" key={index}>

                                   <SuggestedFriend  friend = {friend}/>
                                </div>
                        ))):( <div></div>)}
                        
                    </div>
                </div>
                
                <div className={styles.songsOfTheWeek}>
                    <h3 className={styles.header}>Your Songs</h3>
                     <div className={`${styles.songsOfTheWeekContainer} row`}>
                        {userSongs.slice(0,7).map((music, index) => (
                            <div className="col-12 col-md-6 col-lg-3" key={index}>
                                
                                {userSongs?<Song onHandleSubmit = {this.fetchUserSongs} image="" name={music.name} songId = {music._id} onSongAdded={this.handleSongAddition}/>: <div></div>}
                            </div>
                        ))}
                        <div className="col-12 col-md-6 col-lg-3">
                            <AddSong fetchUserSongs={fetchUserSongs}/>
                        </div>
                    </div>
                    
                </div>
                <div className={styles.playlists}>
                    <h3 className={styles.header}>Your Playlists</h3>
                    <div className={`${styles.playlistsContainer} row`}>
                        {playlists.slice(0, 4).map((playlist, index) => (
                            <div className="col-12 col-md-6 col-lg-2" key={index}>
                                <PlayListPreview 
                                image={playlist.coverImage} 
                                title={playlist.playlistName}
                                songAmount={playlist.songs.length}
                                playlistId={playlist._id}
                                username={playlist.username}
                                ownerId={playlist.ownerId}
                                isLikedPlaylist = {likedStatus[index]}/>
                            </div>
                        ))}
                        <div className="col-12 col-md-6 col-lg-3">
                            <CreatePlaylist />
                        </div>
                    </div>
                </div>
                <div className={styles.playlists}>
                    <h3 className={styles.header}>Your friends Playlists</h3>
                    <div className={`${styles.playlistsContainer} row`}>
                        {playlists.slice(0, 5).map((playlist, index) => (
                            <div className="col-12 col-md-6 col-lg-2" key={index}>
                                <PlayListPreview image='' title={playlist.playlistName} songAmount={playlist.songs.length} playlistId = {playlist._id}/>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        );
    }
}