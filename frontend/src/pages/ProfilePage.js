import React from "react";
import { UpperBar } from "../components/UpperBar";
import { SideNavBar } from "../components/SideNav";
import { ProfileFeed } from "../components/profileFeed";

export class ProfilePage extends React.Component{

    render(){
        return(
            <div style={{ display: 'flex',width: '1270px', height: 'auto', flexDirection: 'column', marginLeft: '250px', marginTop: '110px', padding:0, backgroundColor: '#ECF6F6' }}>
                <UpperBar />
                <div style={{ display: 'flex', flex: 1 }}>
                    <SideNavBar />
                    <div style={{ flex: 1, padding: '20px' }}>
                        <ProfileFeed/>
                    </div>
                </div>
            </div>
        );
    }
}