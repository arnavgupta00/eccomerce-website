import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import url from '../url';
import "./checkoutPage.css";
import { userInfo, AuthenticationFunk } from '../Authentication/authVerify';
import axios from "axios";
import querystring from "querystring";


export default function CheckoutPage(props) {
    const itemID = useParams().itemID;
    const navigate = useNavigate();
    const [DataSingle, setDataSingle] = useState([]);
    const [cartItemsToCheckOut, setCartItemsToCheckOut] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const itemInfo = async (id) => {
        try {
            const response = await fetch(url + `/products/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                console.error("Failed to make request:", response.statusText);
                return null;
            }
        } catch (error) {
            console.error("Failed to make request:", error);
            return null;
        }
    };



    useEffect(() => {
        async function fetchCartItems() {
            if (itemID === "cart") {
                await AuthenticationFunk();
                const cartUser = await userInfo.cart;
                console.log(cartUser);
                var userCartItemIdList = cartUser.map(x => x.itemId);
                setCartItemsToCheckOut(userCartItemIdList);
            } else {
                setCartItemsToCheckOut([itemID]);
            }

            console.log(userCartItemIdList);
            if (userCartItemIdList.length > 0) {
                const itemData = await Promise.all(userCartItemIdList.map(itemInfo));
                setIsLoading(false);
                setDataSingle(itemData);
                console.log(itemData);
            }
        }

        fetchCartItems(); // Fetch cart items when component mounts or when cartItemsToCheckOut changes
    }, []);





    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPhone: '',
        userPincode: '',
        AddressHouse: '',
        AddressArea: '',
        LandMark: '',
        userCity: '',
        userState: '',
        userCountry: '',
    });

    var signCheckOutDataHandle = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    useEffect(() => {
        setFormData({ ...formData, userName: userInfo.userName, userEmail: userInfo.userEmail });
    }, [userInfo]);

    const paymentAutho = async () => {

        //
        console.log(userInfo.cart[0].quantity);
        for (var i = 0; i < DataSingle.length; i++) {


            const data = {
                userName: formData.userName,
                userEmail: formData.userEmail,
                userPhone: formData.userPhone,
                userPincode: formData.userPincode,

                Address: formData.AddressHouse + " " + formData.AddressArea + " " + formData.userCity + " " + formData.userState + " " + formData.userCountry + " " + formData.LandMark,
                LandMark: formData.LandMark,
                userCity: formData.userCity,
                userState: formData.userState,
                userCountry: formData.userCountry,

                productID: DataSingle[i]._id,
                quantity: userInfo.cart[i].quantity,
            };

            const formDatatosend = querystring.stringify(data);
            try {
                const response = await axios.post(url + "/admin/orderAdd", formDatatosend, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    timeout: 5000,
                });

                if (response.status === 200) {
                    navigate("/");
                } else {
                    console.error("Failed to make request:", response.statusText);
                }
            } catch (error) {
                console.error("Failed to make request:", error);
            }
        }
    };



    return <div className='checkoutPageMain'>
        {isLoading ? <div className='checkoutProductsList skeleton'></div> : <div className='checkoutProductsList'>
            {DataSingle.map((itemData, index) => (
                itemData ? (
                    <div className='checkoutProductsListSingleItem' key={index}>
                        <img src={itemData.image} alt={`Product ${index}`} />
                        <div style={{ display: 'flex', justifyContent: "space-between", marginLeft: "10px", marginRight: "10px" }}>
                            <h3>Price: {itemData.productPrice}</h3>
                            <h3>Quantity: {itemID === "cart" ? userInfo.cart[index].quantity : 1}</h3>
                        </div>
                    </div>
                ) : null
            ))}
        </div>}
        <div className='checkoutForm'>
            <h1>Checkout</h1>
            <div className='checkoutPagerowflex1'>
                <div className='checkoutFormInputLabel' >
                    <label for='checkoutPageName'> Full Name</label>
                    <input className='checkoutInfoInput' id='checkoutPageName' type='text' name='userName' placeholder="Enter Full Name" value={formData.userName}
                        onChange={signCheckOutDataHandle} />
                </div>
                <div className='checkoutFormInputLabel' >
                    <label for='checkoutPageEmail'> Email</label>
                    <input className='checkoutInfoInput' id='checkoutPageEmail' type='text' name='userEmail' placeholder="Enter e-mail" value={formData.userEmail}
                        onChange={signCheckOutDataHandle} />
                </div>
                <div className='checkoutFormInputLabel' >
                    <label for='checkoutPagePhone'> Phone Number</label>
                    <input className='checkoutInfoInput' id="checkoutPagePhone" type="text" name='userPhone' placeholder="Enter Phone (+91)" value={formData.userPhone}
                        onChange={signCheckOutDataHandle} />
                </div>

            </div>
            <label for='checkoutPageAddressHouse'> Flat, House no., Building, Company, Apartment</label>
            <input className='checkoutInfoInput' id="checkoutPageAddressHouse" type="text" name='AddressHouse' placeholder=" " value={formData.AddressHouse}
                onChange={signCheckOutDataHandle} />

            <label for='checkoutPageAddressArea'> Area, Street, Sector, Village</label>
            <input className='checkoutInfoInput' id="checkoutPageAddressArea" type="text" name='AddressArea' placeholder=" " value={formData.AddressArea}
                onChange={signCheckOutDataHandle} />

            <div className='checkoutPagerowflex2'>

                <div className='checkoutFormInputLabel' >
                    <label for='checkoutPageLandMark'> LandMark</label>
                    <input className='checkoutInfoInput' id='checkoutPageLandMark' type="text" name='LandMark' placeholder="Enter LandMark" value={formData.LandMark}
                        onChange={signCheckOutDataHandle} />
                </div>

                <div className='checkoutFormInputLabel' >
                    <label for='checkoutPagePincode'> Pincode</label>
                    <input className='checkoutInfoInput' id='checkoutPagePincode' type="text" name='userPincode' placeholder="Enter Pincode" value={formData.userPincode}
                        onChange={signCheckOutDataHandle} />
                </div>

                <div className='checkoutFormInputLabel' >
                    <label for='checkoutPageCity'> City/Town</label>
                    <input className='checkoutInfoInput' id='checkoutPageCity' type="text" name='userCity' placeholder="Enter Your City/Town" value={formData.userCity}
                        onChange={signCheckOutDataHandle} />
                </div>

            </div>
            <div className='checkoutPagerowflex3'>
                <div className='checkoutFormInputLabel' >
                    <label for='checkoutPageState'> State</label>
                    <input className='checkoutInfoInput' id='checkoutPageState' type="text" name='userState' placeholder="Enter State" value={formData.userState}
                        onChange={signCheckOutDataHandle} />
                </div>
                <div className='checkoutFormInputLabel' >
                    <label for='checkoutPageCountry'> Country</label>
                    <input className='checkoutInfoInput' id='checkoutPageCountry' type="text" name='userCountry' placeholder="Enter Country" value={formData.userCountry}
                        onChange={signCheckOutDataHandle} />
                </div>
            </div>
            <button onClick={paymentAutho}>Submit</button>
        </div>
    </div>
}