import React from "react";
import { SideNavBar } from "../components/SideNav";
import { UpperBar } from "../components/UpperBar";
import { Playlistsfeed } from "../components/Playlistsfeed";

export class PlaylistsPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          playlistsData: null,
          loading: true,
          errorMessage: "",
        };
      }

      async componentDidMount() {
        //this.fetchUserPlaylists();
        this.fetchAllPlaylists();
      }

      /*fetchUserPlaylists = async () =>{

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
      }*/

      fetchAllPlaylists = async () =>{

         

        try{

            const response = await fetch(`/playlists/getPlaylists`);
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

    render(){
        const {playlistsData, loading, errorMessage } = this.state;
        
        return(
            <div style={{ display: 'flex',width: '1270px', height: '100vh', flexDirection: 'column', marginLeft: '250px', marginTop: '110px', padding:0, backgroundColor: '#ECF6F6' }}>
                <UpperBar />
                
                <div style={{ display: 'flex', flex: 1 }}>
                    <SideNavBar />
                    <div style={{ flex: 1, padding: '20px' }}>
                        {playlistsData? <Playlistsfeed playlists = {playlistsData}/>: <div></div> }
                    </div>
                </div>
            </div>
        );
    };
}