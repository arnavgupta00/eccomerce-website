import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from '../../components/navbar/navbar';
import { Link, useNavigate } from 'react-router-dom';
import "./loginSignup.css";
import { frameData } from 'framer-motion';
import Cookies from 'js-cookie';
import { AuthenticationFunk} from '../../components/Authentication/authVerify';

import url from '../../components/url';

export default function SignInUpPage(props) {
    const navigate = useNavigate();
    

    const {authenticationCall , setauthenticationCall} = props;
    const {login} =props;
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
        userConfirmPassword: '',
    });
    var signSearchHandle = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    var signSubmit = async (event) => {
        event.preventDefault();

        if (login !== "true") {
            try {
                const response = await fetch(url + "/register/" + formData.userEmail + "/" + formData.userPassword +"/" + formData.userName, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    Cookies.set('token', result.message, { expires: 7 });
                    setauthenticationCall(true);
                    await AuthenticationFunk();
                    navigate("/")
                    
                } else {
                    console.error("Failed to make request:", response.statusText);
                    setauthenticationCall(false);
                }
            } catch (error) {
                console.error("Failed to make request:", error);
                setauthenticationCall(false);
            }
        } else {

            try {
                const response = await fetch(url + "/login/" + formData.userEmail + "/" + formData.userPassword, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // You can adjust the content type as needed
                    },
                    // Add any other options like body, credentials, etc., as needed
                });

                if (response.ok) {
                    const result = await response.json();
                    Cookies.set('token', result.message, { expires: 7 });
                    setauthenticationCall(true);
                    await AuthenticationFunk();
                    navigate("/")
                } else {
                    console.error("Failed to make request:", response.statusText);
                    setauthenticationCall(false);
                }
            } catch (error) {
                console.error("Failed to make request:", error);
                setauthenticationCall(false);
            }

        }

    }
    if (login !== "true") {
        return (


            <div className='signMain' >

                <div className='signUpMain' >
                    <h1 className='signText'>Register </h1>
                    <input className='signinput' type='text' name='userName' placeholder="Enter Full Name" value={formData.userName}
                        onChange={signSearchHandle} />
                    <input className='signinput' type='text' name='userEmail' placeholder="Enter e-mail" value={formData.userEmail}
                        onChange={signSearchHandle} />
                    <input className='signinput' type="password" name='userPassword' placeholder="Enter password" value={formData.userPassword}
                        onChange={signSearchHandle} />
                    <input className='signinput' type="password" name='userConfirmPassword' placeholder="Enter Confirm Password" value={formData.userConfirmPassword}
                        onChange={signSearchHandle} />
                    <p>{formData.userPassword == formData.userConfirmPassword ? "" : "Please Type Same Password"}</p>
                    <input className='signSubmit' type="submit" value="Submit " onClick={formData.userPassword == formData.userConfirmPassword ? signSubmit: ()=>{ navigate("/register")}} />

                </div>
            </div>

        )
    } else {
        return (


            <div className='signMain' >

                <div className='signUpMain' >
                    <h1 className='signText'>Login </h1>
                    <input className='signinput' type='text' name='userEmail' placeholder="Enter e-mail" value={formData.userEmail}
                        onChange={signSearchHandle} />
                    <input className='signinput' type="password" name='userPassword' placeholder="Enter password" value={formData.userPassword}
                        onChange={signSearchHandle} />

                    <input className='signSubmit' type="submit" value="Submit " onClick={signSubmit} />

                </div>
            </div>

        )
    }

}