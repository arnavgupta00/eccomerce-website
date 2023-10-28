import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./dropdown.css";
import Cookies from 'js-cookie';

// To delete a cookie, specify its name

export default function Dropdown(props) {

    const navigate = useNavigate();


    const cookieDelete =(i)=>{
        Cookies.remove("token");
        navigate(i);
    }

    

    if (props.authentication === true) {
        return <div className="container">

            <button className="btn">
                <span>Account Settings</span>
                <ul className="dropdown">
                    <li className="active"><a href="#">Profile Information</a></li>
                    <li><a href="#">Change Password</a></li>
                    <li><a href="/">Cart</a></li>
                    <li><a href="#">Help</a></li>
                    <li onClick={() =>{cookieDelete("/")}}><a href="#">Log Out</a></li>
                </ul>
            </button>
        </div>
    } else {
        return <div className="container">

            <button className="btn">
                <span>Account Settings</span>
                <ul className="dropdown">
                    <li className="active" onClick={()=>navigate("/login")}  ><a >Login</a></li>
                    <li onClick={()=>navigate("/register")} ><a >Sign Up</a></li>
                    <li><a >Help</a></li>
                </ul>
            </button>
        </div>

    }




}