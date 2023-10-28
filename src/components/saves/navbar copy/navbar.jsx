
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Dropdown from '../dropdown/dropdown';
import Cookies from 'js-cookie'; // Import the library
import { authenticationCall,result, AuthenticationFunk } from '../Authentication/authVerify';
import './navbar.css';

function Navbar() {

    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [authenticationCall, setauthenticationCall] = useState(false);

    const url = 'http://localhost:5000';

    const cookieDelete = (i) => {
        Cookies.remove("token");
        setauthenticationCall(false);
        navigate(i);
    }
    var searchTextHandle = (e) => {
        setSearchText(e.target.value);
    }

    useEffect(() => {

        const fetchDataSS = async () => {
            const isAuthenticated = await AuthenticationFunk();
            
            setauthenticationCall(isAuthenticated);
            userPayload = result;
            console.log(userPayload);
        };
        fetchDataSS();
    }, []);

    return (
        <div className='main-nav'>
            <div className='top-search'>
                <div className='logo-nav' onClick={() => navigate("/")}></div>
                <div className='categories'>
                    <button className='category'>SHOES</button>
                    <button className='category'>HUMANS</button>
                    <button className='category'>GROCERY</button>
                    <button className='category'>CHILDS</button>
                </div>
                <div className='form'>
                    <input className='search' type='text' placeholder={"Search"} onChange={searchTextHandle}></input>
                    <input className='submit' type='submit' onClick={() => navigate("/ResultPage/results/" + searchText)} value="GO"></input>
                </div>
                <div className='profile'>
                    {(authenticationCall === true) ? (
                    <div className="container">

                        <button className="btn">
                            <span>Account Settings</span>
                            <ul className="dropdown">
                                <li className="active"><a href="#">Profile Information</a></li>
                                <li><a href="#">Change Password</a></li>
                                <li><a href="/">Cart</a></li>
                                <li><a href="#">Help</a></li>
                                <li onClick={() => { cookieDelete("/") }}><a>Log Out</a></li>
                            </ul>
                        </button>
                    </div>
                    ) : (
                    <div className="container">

                        <button className="btn">
                            <span>Account Settings</span>
                            <ul className="dropdown">
                                <li className="active" onClick={() => navigate("/login")}  ><a >Login</a></li>
                                <li onClick={() => navigate("/register")} ><a >Sign Up</a></li>
                                <li><a >Help</a></li>
                            </ul>
                        </button>
                    </div>

                    )}

                </div>
            </div>
            <hr />
            <div className='navbar'>
                <div className='categories-mob'>
                    <button className='category-mob' onClick={() => navigate("/ResultPage/shoes")} >SHOES</button>
                    <button className='category-mob' onClick={() => navigate("/ResultPage/clothing")}>CLOTHING </button>
                    <button className='category-mob' onClick={() => navigate("/ResultPage/grocery")}>GROCERY</button>
                    <button className='category-mob' onClick={() => navigate("/ResultPage/sports")}>SPORTS</button>
                </div>
            </div>
        </div>

    );
}

export default Navbar;
