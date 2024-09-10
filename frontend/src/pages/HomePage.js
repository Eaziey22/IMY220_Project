import React from "react";
import { SideNavBar } from "../components/SideNav";
import { UpperBar } from "../components/UpperBar";

export class HomePage extends React.Component{
    render(){
        return(
            <div>
                <UpperBar/>
                <SideNavBar/>
                <h1>Home Page</h1>
            </div>
        );
    };
}