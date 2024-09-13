import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import * as styles from '../styles/login.module.css';
import Logo from '../../public/assets/images/logo_no_background.png';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        emailAddress: '',
        password: '',
        rememberMe: false,
        formErrors: { emailAddress: '', password: '' },
        emailValid: false,
        passwordValid: false,
        formValid: false,
        redirectToHome: false
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    

    switch (fieldName) {
        case 'emailAddress':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.emailAddress = emailValid ? '' : 'please enter a valid email';
            break;
        case 'password':
            passwordValid = value.length >= 8;
            fieldValidationErrors.password = passwordValid ? '' : 'password must be atleast 8 characters long';
            break;
        default:
            break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);

  }

  validateForm() {
    this.setState({
        formValid: this.state.emailValid && this.state.passwordValid
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.formValid) {
        
      this.setState({redirectToHome : true});
        console.log('Form is valid. Submitting...');
    } else {
        console.log('Form is invalid. Cannot submit.');
    }
  };

  render() {
    if (this.state.redirectToHome) {
      return <Navigate to="/home" />; 
    }

    return (
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          {/*<div className={styles.loginLogoContainer}>
            <img className={styles.logo} alt="tunetrail logo" src={Logo} />
          </div>*/}
          <div className={styles.loginHeaderContainer}>
            <h2>Login</h2>
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="emailAddress">Email Address:</label>
            <input
              type="text"
              className="form-control"
              id="emailAddress"
              name="emailAddress"
              required
              value={this.state.emailAddress}
              onChange={this.handleInputChange}
              placeholder='Email Address'
            />
            <span className={`${styles.error} ${this.state.formErrors.emailAddress ? 'visible' : ''}`} style={{margin: '10px'}}>{this.state.formErrors.emailAddress}</span>
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className={` ${styles.formControl} form-control`}
              id="password"
              name="password"
              required
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder='Password'
            />
            <span className={`${styles.error} ${this.state.formErrors.password ? 'visible' : ''}`} style={{margin: '10px'}}>{this.state.formErrors.password}</span>
          </div>
          <div className="row align-items-center">
            <div className="col-auto">
              <div className={styles.formgroup}>
                <input 
                  type="checkbox" 
                  className={styles.formCheckInput} 
                  id="rememberMe" 
                  name="rememberMe"
                  checked={this.state.rememberMe}
                  onChange={(e) => this.setState({ rememberMe: e.target.checked })} />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
            </div>
            <div className="col-auto">
              <Link to="" className={styles.link} ><p style={{marginLeft: '150px'}}>Forgot Password?</p></Link>
            </div>
          </div>
          <button type="submit" className={`${styles.btn} btn`} disabled={!this.state.formValid}>Login</button>
          <hr />
          <div>
            <p>Don't have an account? <Link to="/signUp" className={styles.link}>Sign Up</Link></p>
          </div>
        </form>
      </div>
    );
  }
}

