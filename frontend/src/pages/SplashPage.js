import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../public/assets/images/logo.png'
import * as styles from '../styles/SplashPage.module.css';

export class SplashPage extends React.Component{
    
    render(){
        console.log(styles);
        return(
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} alt="tunetrail logo" src={Logo}></img>
                </div>

                <div className="d-flex flex-column align-items-center mt-4">
                    <Link to='/login'>
                        <button className={`${styles.btn} btn mb-2`}>
                            Log In
                        </button>
                    </Link>
                    
                    <Link to='/signUp'>
                        <button className={`${styles.btn} btn `}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        );
    };
}