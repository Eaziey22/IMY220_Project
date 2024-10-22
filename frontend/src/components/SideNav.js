import React from 'react';
//import './SideNavBar.css'; // Import a CSS file for styling (optional)
import Logo from '../../public/assets/images/logo_no_background.png';
import { Link , NavLink} from 'react-router-dom';
import * as styles from '../styles/SideNav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faMusic, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-icons/font/bootstrap-icons.css';

export class SideNavBar extends React.Component {
    
    render(){
        const userId = localStorage.getItem("userId");
        const profileRoute = `/profile/${userId}`
        return (
            <div className={styles.sideNav}>
                <Link to="/home" style={{ textDecoration: 'none' }}>
                        <div className={`${ styles.logoContainer } d-flex align-items-center` }>
                            <img className={styles.logo} alt="tunetrail logo" src={Logo} />
                            <p className={`${styles.logoName} mb-0 ml-2`}>Tunetrail</p>
                        </div>
                </Link>
                <ul className={styles.navLinks}>
                    <li className={styles.navItem}>
                        <NavLink to="/home" style = {({isActive}) => {return {backgroundColor: isActive? '#37D0D6': '', color: isActive? 'white' : '' }}} >
                            <FontAwesomeIcon icon={faHome} className={styles.icon} /> Home
                        </NavLink>
                    </li>
                    
                    <li className={styles.navItem}>
                        <NavLink to="/playlists" style = {({isActive}) => {return {backgroundColor: isActive? '#37D0D6': '', color: isActive? 'white' : '' }}} >
                            <FontAwesomeIcon icon={faMusic} className={styles.icon} />Playlists
                        </NavLink>
                    </li>

                    <li className={styles.navItem} >
                        <NavLink to={profileRoute} style = {({isActive}) => {return {backgroundColor: isActive? '#37D0D6': '', color: isActive? 'white' : '' }}} >
                            <FontAwesomeIcon icon={faUserCircle} className={styles.icon} />Profile
                        </NavLink>
                    </li>
                </ul>
            </div>
        );}
}

