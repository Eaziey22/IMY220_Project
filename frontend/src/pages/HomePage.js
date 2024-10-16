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
        };
    }

    async componentDidMount() {
        this.fetchUserPlaylists();
    }

    fetchUserPlaylists = async () =>{

        const userId = localStorage.getItem('userId');

        try{

            const response = await fetch(`/playlists/getUserPlaylists/${userId}`);

            if(response.ok){
                const data = await response.json();
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

    render(){
        const {playlistsData, loading, errorMessage } = this.state;

        return(
            <div style={{ display: 'flex',width: '1270px', height: 'auto', flexDirection: 'column', marginLeft: '250px', marginTop: '110px', padding:0, backgroundColor: '#ECF6F6' }}>
                <UpperBar />
                <div style={{ display: 'flex', flex: 1 }}>
                    <SideNavBar />
                    <div style={{ flex: 1, padding: '20px' }}>
                        {playlistsData? <Feed playlists = {playlistsData} songsOfWeekData = {songsOfWeekData} recentMusicData = {recentMusicData} />: <div></div>}
                    </div>
                </div>
            </div> 
        );
    };
}