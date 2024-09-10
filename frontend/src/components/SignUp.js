import React from 'react';
import { Link, Navigate } from 'react-router-dom';

import * as styles from "../styles/signUp.module.css"

export class SignUp extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        emailAddress: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
        formErrors: { emailAddress: '', password: '', confirmPassword: '' },
        emailValid: false,
        passwordValid: false,
        confirmPasswordValid: false,
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
    let confirmPasswordValid = this.state.confirmPasswordValid;

    switch (fieldName) {
        case 'emailAddress':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
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
        emailValid: emailValid,
        passwordValid: passwordValid,
        confirmPasswordValid: confirmPasswordValid
    }, this.validateForm);

  }

  validateForm() {
    this.setState({
        formValid: this.state.emailValid && this.state.passwordValid && this.state.confirmPasswordValid
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

  render(){
    if (this.state.redirectToHome) {
      return <Navigate to="/home" />; 
    }
        return(
            <div className={styles.formContainer}>
              <form className={`${styles.form} mt-5`} onSubmit={this.handleSubmit}>
                  <div className={styles.loginHeaderContainer}>
                      <h2>Sign Up</h2>
                  </div>
                  <div className={styles.formgroup}>
                    <label htmlFor="emailAddress">Email Address:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="emailAddress" 
                      name="emailAddress"
                      value={this.state.emailAddress}
                      onChange={this.handleInputChange} 
                      required />
                    <span className={styles.error}>{this.state.formErrors.emailAddress}</span>
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
                    <span className={styles.error}>{this.state.formErrors.password}</span>
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
                    <span className={styles.error}>{this.state.formErrors.confirmPassword}</span>
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

                  <button type="submit" className={`${styles.btn} btn`} disabled={!this.state.formValid}>Sign Up</button>
                  <hr></hr>
                  <div>
                      Already have an account? <Link to='/login' >Login</Link>
                  </div>
              </form>
            </div>
        );
  }
}