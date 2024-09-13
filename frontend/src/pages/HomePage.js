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

const playlists = [
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
];

export class HomePage extends React.Component{
    render(){
        
        return(
            <div style={{ display: 'flex',width: '1270px', height: 'auto', flexDirection: 'column', marginLeft: '250px', marginTop: '110px', padding:0, backgroundColor: '#ECF6F6' }}>
                <UpperBar />
                <div style={{ display: 'flex', flex: 1 }}>
                    <SideNavBar />
                    <div style={{ flex: 1, padding: '20px' }}>
                        <Feed playlists = {playlists} songsOfWeekData = {songsOfWeekData} recentMusicData = {recentMusicData} />
                    </div>
                </div>
            </div> 
        );
    };
}