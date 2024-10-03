import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../../public/assets/images/logo_no_background.png'
import * as styles from "../styles/signUp.module.css"

export class SignUp extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        username: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
        formErrors: { username: '' ,emailAddress: '', password: '', confirmPassword: '' },
        usernameValid: false,
        emailValid: false,
        passwordValid: false,
        confirmPasswordValid: false,
        formValid: false,
        redirectToHome: false,
        errorMessage: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confirmPasswordValid = this.state.confirmPasswordValid;

    switch (fieldName) {
        case 'username':
          usernameValid = value.length >= 4;
          fieldValidationErrors.username = usernameValid ? '' : 'username must be atleast 4 characters long';
          break;
        case 'emailAddress':
            emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            fieldValidationErrors.emailAddress = emailValid ? '' : 'please enter a valid email';
            break;
        case 'password':
            passwordValid = value.length >= 8;
            fieldValidationErrors.password = passwordValid ? '' : 'password must be atleast 8 characters long';
            break;
        case 'confirmPassword':
            confirmPasswordValid = value === this.state.password;
            fieldValidationErrors.confirmPassword = confirmPasswordValid ? '' : 'passwords do not match';
            break;
        default:
            break;
    }

    this.setState({
        formErrors: fieldValidationErrors,
        usernameValid: usernameValid,
        emailValid: emailValid,
        passwordValid: passwordValid,
        confirmPasswordValid: confirmPasswordValid
    }, this.validateForm);

  }

  validateForm() {
    this.setState({
        formValid: this.state.usernameValid && this.state.emailValid && this.state.passwordValid && this.state.confirmPasswordValid
    });
  }
/*
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.formValid) {
        
      this.setState({redirectToHome : true});
        console.log('Form is valid. Submitting...');
    } else {
        console.log('Form is invalid. Cannot submit.');
    }
  };*/

  handleSubmit = async (event) => {
    event.preventDefault();

    if(this.state.formValid){
      try{
        const response = await fetch('/auth/register', {

          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            email: this.state.emailAddress,
            password: this.state.password
          })
        });

        const data = await response.json();

        if(response.ok){
          localStorage.setItem('userId', data.data.userId);
          this.setState({redirectToHome : true});
        }
        else{
          console.log("hey",data.message);
          this.setState({ errorMessage: data.message || 'Registration failed' });
        }

      }
      catch(error){
        console.log('Error: ', error);
        this.setState({errorMessage: "Registration failed"});
      }
    } else {
      console.log('Form is invalid. Cannot submit.');
    }
  }

  render(){
    if (this.state.redirectToHome) {
      return <Navigate to="/home" />; 
    }
        return(
            <div className={styles.formContainer}>
              <form className={`${styles.form} mt-5`} onSubmit={this.handleSubmit}>
                {/*<div className={styles.loginLogoContainer}>
                  <img className={styles.logo} alt="tunetrail logo" src={Logo} />
                </div>*/}
                <div className={styles.loginHeaderContainer}>
                  <h2>Register</h2>
                </div>

                <div className={styles.formgroup}>
                    <label htmlFor="username">Username:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="username" 
                      name="username"
                      value={this.state.username}
                      onChange={this.handleInputChange} 
                      required />
                    <span className={`${styles.error} ${this.state.formErrors.username ? 'visible' : ''} ${this.state.errorMessage? 'visible' : ''}`} style={{margin: '10px'}}>{this.state.formErrors.username}</span>
                    
                  </div>

                  <div className={styles.formgroup}>
                    <label htmlFor="emailAddress">Email Address:</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="emailAddress" 
                      name="emailAddress"
                      value={this.state.emailAddress}
                      onChange={this.handleInputChange} 
                      required 
                      placeholder='Email Address'/>
                    <div style={{ margin: '10px 0' }}>
                      <span className={`${styles.error} ${this.state.formErrors.emailAddress ? 'visible' : ''}`} style={{ display: 'block', marginBottom: '5px' }}>
                          {this.state.formErrors.emailAddress}
                      </span>
                      <span className={`${styles.error} ${this.state.errorMessage ? 'visible' : ''}`} style={{ display: 'block' }}>
                          {this.state.errorMessage}
                      </span>
                  </div>
                  </div>
                  <div className={styles.formgroup}>
                    <label htmlFor="password">Password:</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      required />
                    <span className={`${styles.error} ${this.state.formErrors.password ? 'visible' : ''}`} style={{margin: '10px'}}>{this.state.formErrors.password}</span>
                  </div>
                  <div className={styles.formgroup}>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="confirmPassword" 
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.handleInputChange}
                      required />
                    <span className={`${styles.error} ${this.state.formErrors.confirmPassword ? 'visible' : ''}`} style={{margin: '10px'}}>{this.state.formErrors.confirmPassword}</span>
                  </div>
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

                  <button type="submit" className={`${styles.btn} btn`} disabled={!this.state.formValid}>Register</button>
                  <hr></hr>
                  <div>
                      Already have an account? <Link to='/login' className={styles.link}>Login</Link>
                  </div>
              </form>
            </div>
        );
  }
}