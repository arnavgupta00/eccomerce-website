import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';



import Navbar from "./components/navbar/navbar.jsx";
import Carousel from './components/carousel/carousel.jsx';
import ProductCard from './components/productCard/productCard.jsx';
import ProductData from "./components/testDB/productData.js";
import FeaturedProducts from './components/featuredProducts/featuredProducts.jsx';
import ProductPage from './components/productPage/productPage.jsx';
import SearchProducts from './components/search/searchProducts.jsx';
import SignInUpPage from './pages/loginSignUp/loginSignup.jsx';
import AdminCenter from './components/adminCenter/adminCenter.jsx';
import CheckoutPage from './components/checkoutPage/checkoutPage.jsx';
import "./App.css";
import CartPart from './components/cartPage/cartPage.jsx';

function App() {
    var imgListTemp = ["https://www.solesearchindia.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdx8gt3nnu%2Fimage%2Fupload%2Fq_100%2Cf_webp%2Fw_1500%2Fbanners%2Fall-out-sale%2FdesktopImage&w=1920&q=100",
        "https://www.solesearchindia.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdx8gt3nnu%2Fimage%2Fupload%2Fq_100%2Cf_webp%2Fw_1500%2Fbanners%2FSneakers%20Banner%2FdesktopImage&w=1920&q=100",
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_copy_ERGCiQg.jpg?format=webp&w=1500&dpr=1.3",
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/sweatshirts-homepage.jpg?format=webp&w=1500&dpr=1.3",

    ]


    const [authenticationCall, setauthenticationCall] = useState(false);

    return (
        <>
            <BrowserRouter>


                <Routes>
                    <Route path="/" element={
                        <div>
                            <Navbar authenticationCall={authenticationCall} setauthenticationCall={setauthenticationCall} />
                            <div className='carousel-first'>
                                <Carousel list={imgListTemp} height="30vh" width="90vw" marginTop="12vh" borderRadii="10px" autoPlay="true" />
                            </div>
                            <div style={{ marginTop: "5vh" }}>
                                <FeaturedProducts />
                            </div>
                        </div>
                    } />
                    <Route path="/productPage/:productId" element={
                        <div>
                            <Navbar authenticationCall={authenticationCall} setauthenticationCall={setauthenticationCall} />
                            <ProductPage />
                        </div>
                    } />
                    <Route path="/ResultPage/results/:query" element={
                        <div>
                            <Navbar authenticationCall={authenticationCall} setauthenticationCall={setauthenticationCall} />
                            <SearchProducts results="true" />
                        </div>
                    } />
                    <Route path="/ResultPage/:query" element={
                        <div>
                            <Navbar authenticationCall={authenticationCall} setauthenticationCall={setauthenticationCall} />
                            <SearchProducts results="false" />
                        </div>
                    } />
                    <Route path="/login" element={
                        <div>
                            <Navbar authenticationCall={authenticationCall} setauthenticationCall={setauthenticationCall} />
                            <SignInUpPage login="true" authenticationCall={authenticationCall} setauthenticationCall={setauthenticationCall} />
                        </div>

                    } />
                    <Route path="/register" element={
                        <div>
                            <Navbar authenticationCall={authenticationCall} setauthenticationCall={setauthenticationCall} />
                            <SignInUpPage login="false" authenticationCall={authenticationCall} setauthenticationCall={setauthenticationCall} />
                        </div>

                    } />
                    <Route path="/adminCenter/:statusC" element={

                        <div>
                            <Navbar authenticationCall={authenticationCall} setauthenticationCall={setauthenticationCall} />
                            <AdminCenter />
                        </div>
                    } />
                    <Route path="/checkout/:itemID" element={

                        <div>
                            <Navbar authenticationCall={authenticationCall} setauthenticationCall={setauthenticationCall} />
                            <CheckoutPage />
                        </div>
                    } />
                    <Route path="/cart" element={

                        <div>
                            <Navbar authenticationCall={authenticationCall} setauthenticationCall={setauthenticationCall} />
                            <CartPart />
                        </div>
                    } />

                </Routes>
            </BrowserRouter>










        </>

    );
}

export default App;