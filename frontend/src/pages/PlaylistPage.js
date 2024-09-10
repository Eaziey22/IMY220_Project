import React from "react";
import { SideNavBar } from "../components/SideNav";
import { UpperBar } from "../components/UpperBar";

export class PlaylistPage extends React.Component{
    render(){
        return(
            <div>
                <UpperBar/>
                <SideNavBar/>
                <h1>Playlist Page</h1>
            </div>
        );
    };
}