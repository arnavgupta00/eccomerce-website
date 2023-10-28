import React, { useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {authenticationCall,result,AuthenticationFunk} from '../Authentication/authVerify';

import "./dropdown.css";
import Cookies from 'js-cookie';

// To delete a cookie, specify its name

export default function Dropdown(props) {

    const {authenticationCall,setauthenticationCall }  = props;
    const navigate = useNavigate();

    const cookieDelete =(i)=>{
        Cookies.remove("token");
        setauthenticationCall(false)
        navigate(i);
    }
    
    

    if (authenticationCall === true) {
        return <div className="container">

            <button className="btn">
                <span> Hello , {result.userName}</span>
                <ul className="dropdown">
                    <li className="active"><a href="#">Profile Information</a></li>
                    <li onClick={()=>{navigate("/cart")}}><a>Cart</a></li>
                    <li><a href="#">Help</a></li>
                    <li onClick={() =>{cookieDelete("/")}}><a >Log Out</a></li>
                </ul>
            </button>
        </div>
    } else {
        return <div className="container">

            <button className="btn">
                <span>{"SignUp"}</span>
                <ul className="dropdown">
                    <li className="active" onClick={()=>navigate("/login")}  ><a >Login</a></li>
                    <li onClick={()=>navigate("/register")} ><a >Sign Up</a></li>
                    <li><a >Help</a></li>
                </ul>
            </button>
        </div>

    }




}