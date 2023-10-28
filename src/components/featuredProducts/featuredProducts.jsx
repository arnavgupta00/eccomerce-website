import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../productCard/productCard';
import "./featuredProducts.css";
import url from '../url';



export default function FeaturedProducts(props) {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchDataFeature = async () => {
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
                } else {
                    console.error("Failed to make request:", response.statusText);
                }
            } catch (error) {
                console.error("Failed to make request:", error);
            }
        };

        fetchDataFeature(); // Call the fetchData function when the component mounts
    }, []);

    return (
        <div className="featuredProductsMain">
            <h1 style={{ marginLeft: "2vw" }}>Featured Products</h1>
            <div className="featuredProducts">
                {productData.map((product, index) => {
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
