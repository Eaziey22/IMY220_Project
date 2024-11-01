import React from "react";
import { SideNavBar } from "../components/SideNav";
import { UpperBar } from "../components/UpperBar";
import { Feed } from "../components/Feed";

const recentMusicData = [
    {
        image: "../../public/assets/images/logo.png",
        name: "Song 1"
    },
    {
        image: "path/to/image2.jpg",
        name: "Song 2"
    },
    {
        image: "path/to/image3.jpg",
        name: "Song 3"
    },
    {
        image: "path/to/image3.jpg",
        name: "Song 4"
    }
];

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

/*const playlists = [
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
];*/

export class HomePage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          playlistsData: null,
          loading: true,
          errorMessage: "",
          songData: null
        };
    }

    async componentDidMount() {
        this.fetchUserPlaylists();
        this.fetchUserSongs();
    }

    fetchUserPlaylists = async () =>{

        const userId = localStorage.getItem('userId');

        try{

            const response = await fetch(`/playlists/getUserPlaylists/${userId}`);
            const data = await response.json();
            if(response.ok){
                
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

    fetchUserSongs = async() =>{

        const userId = localStorage.getItem("userId");

        try{
            const response = await fetch(`/songs/getUserSongs/${userId}`);
            const data = await response.json();

            if(response.ok){
                
                const sortedSongs = data.data.songs.sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                this.setState({ songData: sortedSongs, loading: false, errorMessage: '' } , () =>{
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
        const {playlistsData, loading, errorMessage, songData } = this.state;

        //console.log("songs: ", songData);
        return(
            <div style={{ display: 'flex',width: '1270px', height: 'auto', flexDirection: 'column', marginLeft: '250px', marginTop: '110px', padding:0, backgroundColor: '#ECF6F6' }}>
                <UpperBar />
                <div style={{ display: 'flex', flex: 1 }}>
                    <SideNavBar />
                    <div style={{ flex: 1, padding: '20px' }}>
                        {playlistsData && songData? <Feed playlists = {playlistsData} userSongs = {songData} recentMusicData = {recentMusicData} fetchUserSongs={this.fetchUserSongs} fetchUserPlaylists = {this.fetchUserPlaylists} />: <div></div>}
                    </div>
                </div>
            </div> 
        );
    };
}