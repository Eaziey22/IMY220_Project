import React from "react";
import { SideNavBar } from "../components/SideNav";
import { UpperBar } from "../components/UpperBar";
import { Playlists } from "../components/Playlistsfeed";

export class PlaylistsPage extends React.Component{
    render(){
        return(
            <div style={{ display: 'flex',width: '1270px', height: '100vh', flexDirection: 'column', marginLeft: '250px', marginTop: '110px', padding:0, backgroundColor: '#ECF6F6' }}>
                <UpperBar />
                <div style={{ display: 'flex', flex: 1 }}>
                    <SideNavBar />
                    <div style={{ flex: 1, padding: '20px' }}>
                        <Playlists/>
                    </div>
                </div>
            </div>
        );
    };
}