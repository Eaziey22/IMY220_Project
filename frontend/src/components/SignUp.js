import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../../public/assets/images/logo_no_background.png'
import * as styles from "../styles/signUp.module.css"

export class SignUp extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        currentStep: 1,
        username: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
        formErrors: { username: '' ,emailAddress: '', password: '', confirmPassword: '', name: '', surname: '' },
        usernameValid: false,
        emailValid: false,
        passwordValid: false,
        confirmPasswordValid: false,
        nameValid: false,
        surnameValid: false,
        formValid: false,
        redirectToHome: false,
        errorMessage: '', 
        name: '',
        surname: '',
        bio: '',
        pronouns: '',
        instagram: '',
        facebook: '',
        twitter: ''
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
    let nameValid = this.state.nameValid;
    let surnameValid = this.state.surnameValid;

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
        case 'name':
            nameValid = value.length >= 1;
            fieldValidationErrors.name = nameValid ? '' : 'please fill out your name';
          break;
        case 'surname':
            surnameValid = value.length >= 1;
            fieldValidationErrors.surname = surnameValid ? '' : 'please fill out your surname';
            break;
        default:
            break;
    }

    this.setState({
        formErrors: fieldValidationErrors,
        usernameValid: usernameValid,
        emailValid: emailValid,
        passwordValid: passwordValid,
        confirmPasswordValid: confirmPasswordValid,
        nameValid: nameValid,
        surnameValid: surnameValid

    }, this.validateForm);

  }

  validateForm() {
    this.setState({
        formValid: this.state.usernameValid && this.state.emailValid && this.state.passwordValid && this.state.confirmPasswordValid && this.state.nameValid && this.state.surnameValid
    });
  }

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
            name: this.state.name,
            surname: this.state.surname,
            username: this.state.username,
            email: this.state.emailAddress,
            password: this.state.password,
            bio: this.state.bio,
            pronouns: this.state.pronouns,
            instagram: this.state.instagram,
            facebook: this.state.facebook,
            twitter : this.state.twitter
          })
        });

        const data = await response.json();

        if(response.ok){
          //console.log("userID: " ,data.data.userId);
          localStorage.setItem('userId', data.data.userId);
          this.setState({redirectToHome : true});
        }
        else{
          this.setState({ errorMessage: data.message || 'Registration failed' });
        }

      }
      catch(error){
        
        this.setState({errorMessage: "Registration failed"});
      }
    } else {
      console.log('Form is invalid. Cannot submit.');
    }
  }

  nextStep = () =>{
    this.setState({currentStep: this.state.currentStep + 1});
    
  }

  previousStep = () =>{
    this.setState({currentStep: this.state.currentStep -1});
  }

  render(){

    const { currentStep, errorMessage, formErrors } = this.state;

    if (this.state.redirectToHome) {
      return <Navigate to="/home" />; 
    }

    return(
        <div className={styles.formContainer}>
          <form className={`${styles.form} mt-5`} onSubmit={this.handleSubmit}>

            {/*<div className={styles.loginLogoContainer}>
              <img className={styles.logo} alt="tunetrail logo" src={Logo} />
            </div>*/}

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )} 
            <div className={styles.loginHeaderContainer}>
              <h2>Register</h2>
            </div>

            {currentStep === 1 && (
              <div>
                <div className={styles.loginHeaderContainer}>
                  <h3>Personal Information</h3>
                </div>
                <div className={styles.formgroup}>
                  <label htmlFor="name">Name:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange} 
                    required 
                    placeholder='Name'/>  

                  <div style={{ margin: '10px 0' }}>
                    <span className={`${styles.error} ${this.state.formErrors.name ? 'visible' : ''}`} style={{ display: 'block', marginBottom: '5px' }}>
                        {this.state.formErrors.name}
                    </span>
                  </div>
                </div>

                <div className={styles.formgroup}>
                  <label htmlFor="surname">Surname:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="surname" 
                    name="surname"
                    value={this.state.surname}
                    onChange={this.handleInputChange} 
                    required 
                    placeholder='Surname'/>  
                  <div style={{ margin: '10px 0' }}>
                    <span className={`${styles.error} ${this.state.formErrors.surname ? 'visible' : ''}`} style={{ display: 'block', marginBottom: '5px' }}>
                        {this.state.formErrors.surname}
                    </span>
                  </div>
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
                <div className="d-flex justify-content-between mt-4">
                  <button className={`${styles.btn} btn me-2`} onClick={this.previousStep} disabled>
                    Previous
                  </button>

                  <button className={`${styles.btn} btn`} onClick={this.nextStep} disabled={!this.state.nameValid || !this.state.surnameValid || !this.state.emailValid}>
                    Next
                  </button>
                </div>

              </div>
              

            )}

            {currentStep === 2 && (
              <div>
                <div className={styles.loginHeaderContainer}>
                  <h3>Personal Information</h3>
                </div>
                <div className={styles.formgroup}>
                  <label htmlFor="bio">Bio (optional):</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="bio" 
                    name="bio"
                    value={this.state.bio}
                    onChange={this.handleInputChange}  
                    placeholder='Bio'/>  
                </div>

                <div className={styles.formgroup}>
                  <label htmlFor="pronouns">Pronouns (optional):</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="pronouns" 
                    name="pronouns"
                    value={this.state.pronouns}
                    onChange={this.handleInputChange}  
                    placeholder='pronouns'/>  
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button className={`${styles.btn} btn me-2`} onClick={this.previousStep}>
                    Previous
                  </button>

                  <button className={`${styles.btn} btn`} onClick={this.nextStep}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <div className={styles.loginHeaderContainer}>
                  <h3>Social Media</h3>
                </div>

                <div className={styles.formgroup}>
                  <label htmlFor="instagram">Instagram (optional):</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="instagram" 
                    name="instagram"
                    value={this.state.instagram}
                    onChange={this.handleInputChange}  
                    placeholder='Instagram Link'/>  
                </div>

                <div className={styles.formgroup}>
                  <label htmlFor="facebook">Facebook (optional):</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="facebook" 
                    name="facebook"
                    value={this.state.facebook}
                    onChange={this.handleInputChange}  
                    placeholder='Facebook Link'/>  
                </div>
                
                <div className={styles.formgroup}>
                  <label htmlFor="twitter">Twitter (optional):</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="twitter" 
                    name="twitter"
                    value={this.state.twitter}
                    onChange={this.handleInputChange}  
                    placeholder='Twitter Link'/>  
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button className={`${styles.btn} btn me-2`} onClick={this.previousStep}>
                    Previous
                  </button>

                  <button className={`${styles.btn} btn`} onClick={this.nextStep}>
                    Next
                  </button>
                </div>

              </div>
            )}

            {currentStep === 4 && (
              <div>
                <div className={styles.loginHeaderContainer}>
                  <h2>Login Information</h2>
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

                <div className="d-flex justify-content-between mt-4">
                  <button className={`${styles.btn} btn me-2`} onClick={this.previousStep}>
                    Previous
                  </button>

                  <button type="submit" className={`${styles.btn} btn me-2`} disabled={!this.state.formValid}>Register</button>
                </div>
                
                
              </div>
            )}
            <hr></hr>
            <div>
                Already have an account? <Link to='/login' className={styles.link}>Login</Link>
            </div>
            
          </form>
        </div>
    );
  }
}