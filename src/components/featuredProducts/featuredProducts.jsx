import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../productCard/productCard';
import "./featuredProducts.css";
import url from '../url';




export default function FeaturedProducts(props) {
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDataFeature = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url + "/productsFeatured", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.message) {
                    const result = await response.json();
                    setProductData(result);
                    setIsLoading(false);
                } else {
                    console.error("Failed to make request:", response.statusText);
                }
            } catch (error) {
                console.error("Failed to make request:", error);
            }
        };

        fetchDataFeature();
    }, []);

    return (





        <div className="featuredProductsMain">
            <h1 style={{ marginLeft: "2vw" }}>Featured Products</h1>
            <div className="featuredProducts">

                {isLoading ? <div className='featuredProductsMain skeleton' style={{ backgroundColor: "rgb(207, 207, 207)", height: "50vh", margin: "0px", marginTop: "10px", left: "-0.2vw" }}></div> : productData.map((product, index) => {
                    if (product.productCategory !== "nONE") {
                        return (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                image={product.image}
                                title={product.productTitle}
                                category={product.productCategory}
                                price={product.productPrice}
                                increasedPrice={product.productIncreasedPrice}
                                hoverScale="true"
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>

    );
}
