import React from "react";
import { UpperBar } from "../components/UpperBar";
import { SideNavBar } from "../components/SideNav";
import { ProfileFeed } from "../components/profileFeed";

export class ProfilePage extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            userData: null,
            loading: true,
            error: null
        };
    }

    

    async componentDidMount() {

        try{
            const userId = localStorage.getItem('userId');
            const response = await fetch(`/getUser/${userId}`,{
            
                method: 'GET',
                headers: {
                    "content-type" : "application/json"
                }
            });

            const udata = await response.json();

            

            if(udata.status === "success"){
                
                this.setState({userData: udata.data, loading: false}, () => {
                    console.log("State updated:", this.state.userData);
                });
                
            }
            else{
                
                this.setState({ errorMessage: udata.message || 'could not get user profile' , loading: false});
            }

        }
        catch(error){
            console.log('Error: ', error);
            this.setState({error: "could not get user profile", loading: false});
        }
    }

    render(){
        const {userData, loading, error } = this.state;

        
        return(
            <div style={{ display: 'flex',width: '1270px', height: 'auto', flexDirection: 'column', marginLeft: '250px', marginTop: '110px', padding:0, backgroundColor: '#ECF6F6' }}>
                <UpperBar />
                <div style={{ display: 'flex', flex: 1 }}>
                    <SideNavBar />
                    <div style={{ flex: 1, padding: '20px' }}>
                        {userData ? <ProfileFeed userData = {userData}/>: <div>No user data available</div>}
                    </div>
                </div>
            </div>
        );
    }
}