import React from "react";
import { SideNavBar } from "../components/SideNav";
import { UpperBar } from "../components/UpperBar";
import { PlaylistFeed } from "../components/PlaylistFeed";
import { useParams } from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class OnePlaylist extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            playlistData: null
        };
    }
    
    componentDidMount(){
        var playlistId = this.props.params.pId;
        this.fetchPlaylistById(playlistId);
    }

    fetchPlaylistById = async (playlistId) =>{

        const pId = playlistId;
  
        try{
  
            const response = await fetch(`/playlists/getPlaylist/${pId}`);
  
            if(response.ok){
                const data = await response.json();

                //console.log("Dattaaaa:" ,data.data. playlist);
                this.setState({ playlistData: data.data.playlist, loading: false, errorMessage: '' });
                
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
        /*const { pId } = useParams();
        console.log(pId);*/

        const {playlistData} = this.state;

        console.log("")

        return(
            <div style={{ display: 'flex',width: '1270px', height: 'auto', flexDirection: 'column', marginLeft: '250px', marginTop: '110px', padding:0, backgroundColor: '#ECF6F6' }}>
                <UpperBar />
                <div style={{ display: 'flex', flex: 1 }}>
                    <SideNavBar />
                    <div style={{ flex: 1, padding: '20px' }}>
                        {playlistData? <PlaylistFeed playlist = {playlistData}/>:<p></p>}
                    </div>
                </div>
            </div>
        );
    };
}

export default withParams(OnePlaylist);