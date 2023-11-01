import React, { useState, useEffect } from 'react';
import "./footer.css"



export default function Footer(){

    let date = new Date(); 

    return <div className='footerMain'>
        <h1 className='footerMainCreator'>Developed By Arnav Gupta</h1>
        <h3 className='footerMainCopyRight'>CopyRight @{date.getFullYear()}</h3>
    </div>
}