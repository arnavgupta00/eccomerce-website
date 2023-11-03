import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import url from '../url';
import "./cartPage.css";
import { userInfo, AuthenticationFunk } from '../Authentication/authVerify';
import axios from "axios";
import querystring from "querystring";

export default function CartPart() {
    var response = {cart:[{}]}
    const navigate = useNavigate();
    const [resultCart, setresultCart] = useState([]);
    const [dataCartProducts, setdataCartProducts] = useState([]);
    const [checkOrderboxes, setOrderCheckboxes] = useState(Array(5).fill(false));
    const [countBad ,setcountBad] = useState(1);
    const [isLoading, setIsLoading] = useState(true);


    var statusC

    const cartRemove  = async (itemIDD , userEmaila) => {
        try {
            await AuthenticationFunk()

            const response = await fetch(url + `/cartRemove/${itemIDD}/${userEmaila}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                
                setcountBad(result);
            } else {
                console.error("Failed to make request:", response.statusText);
            }
        } catch (error) {
            console.error("Failed to make request:", error);
        }
    };

    const fetchData = async (idSingle) => {
        try {
            const response = await fetch(url + `/products/${idSingle}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const resultSingleProduct = await response.json();
                return resultSingleProduct;
            } else {
                console.error("Failed to make request:", response.statusText);
                return null;
            }
        } catch (error) {
            console.error("Failed to make request:", error);
            return null;
        }
    };
    const orderDataFetch = async () => {
        try {
            await AuthenticationFunk();
            const response = userInfo;
            if (response) {
                setresultCart(response.cart);
                // Fetch product data for each order
                const productDataPromises = response.cart.map(async (order) => {
                    return await fetchData(order.itemId);
                });
                setIsLoading(true);
                // Wait for all Promises to resolve
                const productData = await Promise.all(productDataPromises);

                setIsLoading(false);
                setdataCartProducts(productData);
            } else {
                console.error("Failed to make request:", response.statusText);
            }
        } catch (error) {
            console.error("Failed to make request:", error);
        }
    }

    useEffect(() => {


        const tempFunk =async () =>{
            await orderDataFetch();
        }
        tempFunk();
        
    }, [countBad]);


    return <div className='cartPageMain'>
        {isLoading ? <div className='cartProductList skeleton'></div> :<div className='cartProductList'>
            {dataCartProducts.map((x, index) => {
                if (x) {
                    const order = resultCart[index];
                    if (order) {
                        return (
                            <div className='cartProductListSingle'>
                                <img src={x.image} />
                                <div className='cartProductListTextAndCross'>
                                <div className='cartProductListSingleTextPart'>
                                    <h1>{x.productTitle}</h1>
                                    <h3>Quantity: {order.quantity}</h3>
                                    <h3>{x.productPrice} </h3>
                                </div>
                                <div className='cartProductListSingleCross'>
                                    <RxCross1 onClick={()=>{cartRemove(order.itemId , userInfo.userEmail)}} />
                                </div>
                                </div>
                                
                            </div>

                        )
                    }
                }
            })}
        </div>}

        <div className='checkoutpart'>
            <button onClick={()=> navigate("/checkout/cart")}>Gooo</button>
        </div>
    </div>
}