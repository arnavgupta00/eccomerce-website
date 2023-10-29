
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Dropdown from '../dropdown/dropdown';
import Cookies from 'js-cookie'; // Import the library
import {authenticationCall,result,AuthenticationFunk} from '../Authentication/authVerify';
import url from '../url';
import './navbar.css';

function Navbar(props) {

    const {authenticationCall,setauthenticationCall }  = props;
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");


    const cookieDelete =(i)=>{
        Cookies.remove("token");
        navigate(i);
    }
    var searchTextHandle = (e) => {
        setSearchText(e.target.value);
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            navigate("/ResultPage/results/" + searchText);
        }
    }
    
    useEffect(() => {

        const fetchDataSS = async () => {
            const isAuthenticated = await AuthenticationFunk();
            
            setauthenticationCall(isAuthenticated);
        };
        fetchDataSS();
    }, [authenticationCall]);


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
                    <input className='submit' type='submit' onKeyDownCapture={this.handleKeyPress} onClick={() => navigate("/ResultPage/results/" + searchText)} value="GO"></input>
                </div>
                <div className='profile'>
                    <Dropdown authenticationCall={authenticationCall} setauthenticationCall={setauthenticationCall}  />
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
