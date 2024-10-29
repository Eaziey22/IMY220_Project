import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import * as styles from '../styles/UpperBar.module.css';
import { Navigate } from 'react-router-dom';

export class UpperBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            redirectTo: null,
        };
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            showMenu: !prevState.showMenu
        }));
    }

    goToProfile = () =>{
        console.log("going to profile");
        const profileRoute = `/profile/${localStorage.getItem("userId")}`;
    this.setState({redirectTo: profileRoute,showMenu: false});
    }

    logOut = () =>{
        console.log("logging out");
        localStorage.removeItem('userId');
        this.setState({ redirectTo: '/',showMenu: false});
    }

    render() {

        const { showMenu, redirectTo } = this.state;

        if (redirectTo) {
            return <Navigate to={redirectTo} />;
        }

        return (
                <div className={styles.upperBar} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px' }}>
                    <div style={{ flex: 1 }}>
                        {/*<FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} color='#37D0D6' />*/}
                        <input type="text" className="form-control" placeholder="Search..." style={{ padding: '5px 10px', width: '50%' }} />
                    </div>
                    <div className={`${styles.menuContainer}`} >
                        <div className={styles.iconContainer} onClick={this.toggleMenu}>
                            <FontAwesomeIcon icon={faUserCircle} size="3x" color='#37D0D6' />
                        </div>
                        {showMenu && (
                            <div className={styles.menu}>
                                <ul>
                                        <li onClick={this.goToProfile}>Profile</li>
                                        <li onClick={this.logOut}>Log Out</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            );
    }
}