import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes, useParams,useNavigate } from 'react-router-dom';
import { authenticationCall, AuthenticationFunk,userInfo } from '../Authentication/authVerify';
import Carousel from '../carousel/carousel';
import url from '../url';
import "./productPage.css";

export default  function ProductPage(props) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [dataSingleProduct, setdataSingleProduct] =useState({
        productTitle: "NO PRODUCT ",
        productCategory: "nONE",
        productPrice: 99999.99,
        productIncreasedPrice: 99999999999.99,
        image: ["https://pixabay.com/get/g012fed617689a07369e6769060dc335c6d901443305546f351fdf88d80ef13b6a3d8686ec7b650770bfc95a5163195a1916a21ded2ad46516819a2719cec16e7_1280.jpg"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt, arcu nec egestas fringilla, sapien tortor viverra erat, nec venenatis odio ante at enim. Sed vestibulum sagittis libero, sed volutpat justo ultrices ut. Morbi id posuere purus. Vivamus a quam sit amet ipsum feugiat dapibus. Integer et lorem urna. Aenean euismod augue non metus fringilla, ut viverra eros tristique. Vestibulum in quam sed orci cursus efficitur. Ut euismod dui nec nunc semper, at hendrerit leo fermentum. Ut posuere, justo a accumsan volutpat, lorem ligula bibendum est, nec tristique ligula libero id nisi. Duis bibendum hendrerit sagittis.",
        gridFeature: [
          "NIL:null",
          "NIL:null",
          "NIL:null",
          "NIL:null",
         
        ]
      });

    
    const idSingle = useParams().productId; 
    const cartAdd  = async () => {
        try {
            await AuthenticationFunk()

            const response = await fetch(url + `/cartAdd/${idSingle}/${userInfo.userEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                
               
                console.log(result);
            } else {
                console.error("Failed to make request:", response.statusText);
            }
        } catch (error) {
            console.error("Failed to make request:", error);
        }
    };






    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url + `/products/${idSingle}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    
                    setdataSingleProduct(result);
                    setIsLoading(false)
                } else {
                    setdataSingleProduct({
                        productTitle: "NO PRODUCT ",
                        productCategory: "nONE",
                        productPrice: 99999.99,
                        productIncreasedPrice: 99999999999.99,
                        image: ["https://www.searchenginejournal.com/wp-content/uploads/2020/08/404-pages-sej-5f3ee7ff4966b-760x400.webp"],
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt, arcu nec egestas fringilla, sapien tortor viverra erat, nec venenatis odio ante at enim. Sed vestibulum sagittis libero, sed volutpat justo ultrices ut. Morbi id posuere purus. Vivamus a quam sit amet ipsum feugiat dapibus. Integer et lorem urna. Aenean euismod augue non metus fringilla, ut viverra eros tristique. Vestibulum in quam sed orci cursus efficitur. Ut euismod dui nec nunc semper, at hendrerit leo fermentum. Ut posuere, justo a accumsan volutpat, lorem ligula bibendum est, nec tristique ligula libero id nisi. Duis bibendum hendrerit sagittis.",
                        gridFeature: [
                          "NIL:null",
                          "NIL:null",
                          "NIL:null",
                          "NIL:null",
                         
                        ]
                      });
                    console.error("Failed to make request:", response.statusText);
                }
            } catch (error) {
                console.error("Failed to make request:", error);
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, []);

    
    


    var imgListTemp = dataSingleProduct.image
     
    
    
    return <div className='productMain'>
        <div className='topPart'>

            {isLoading ? <div  className='productCarousel skeleton'></div>:
            <div className='productCarousel'>

                <Carousel list={imgListTemp} height="60vh" width="50vw" marginTop="25vh" borderRadii="0px" autoPlay="true" />
            </div>}

            {isLoading ? <div className='productSingleTopTitleMain skeleton'></div> : 
            <div className='productSingleTopTitleMain'>
                <div className='productSingleTopTitle'>
                    <div className='productSingleHeading'><h1>{dataSingleProduct.productTitle}</h1></div>
                    <div className='productSingleCategory'>{dataSingleProduct.productCategory}</div>
                    <div style={{ display: 'flex', flexDirection: "row-reverse" }}>
                        <div className='productSinglePriceTag'><p>$</p><h1>{dataSingleProduct.productPrice}</h1></div>
                        <div className='productSingleIncreasedPriceTag'><s ><h1>${dataSingleProduct.productIncreasedPrice}</h1></s></div>
                    </div>

                    <div className='propductSingleBuyCart'>

                        <div className='productSingleBuy' >
                            <button onClick={ ()=>{ navigate(`/checkout/${idSingle}`)}}>BUY NOW</button>
                        </div>
                        <div className='productSingleCart'>
                            <button onClick={cartAdd}>ADD TO CART</button>
                        </div>

                    </div>
                    <div className='productSingleBottonCover'>
                        <div className='productSingleDelivery'>

                            <h4>Delivery within 3-4 days</h4>
                        </div>
                        <div className='productSingleStock '>

                            <h2>IN STOCK</h2>
                        </div>
                    </div>

                </div>

            </div>}
        </div>

        {isLoading ? <div className='productSingleDescription skeleton'></div> : 
        <div className='productSingleDescription'>
            <div className='productSingleDescriptionHeading'>
                <h1>Product Details</h1>
            </div>
            <div className='productSingleDescriptionDetail'>
                <div className='productSingleDescriptionDetailWords'>
                    <h2>{dataSingleProduct.description}</h2>
                </div>
                <div className='productSingleDescriptionDetailGrid'>
                    {dataSingleProduct.gridFeature.map(x => {
                        const [key, value] = x.split(':');
                        return (<div className='productSingleDescriptionDetailGridOneCat'>
                            <div className='productSingleDescriptionDetailGridOneCatLeft'><h2>{key}</h2></div>
                            <div className='productSingleDescriptionDetailGridOneCatRight'><h2>{value}</h2></div>
                        </div>)
                    })}
                </div>

            </div>
        </div>}
    </div>
}
