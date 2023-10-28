
import React, { useState , useEffect } from 'react';
import {useParams } from 'react-router-dom';

import ProductCard from '../productCard/productCard';

import "./searchProducts.css";

import url from '../url';

export default function SearchProducts(props) {

    const queryCalled = useParams().query;
    var [listProducts ,setlistProducts]= useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url + "/products/" + queryCalled + "/" + props.results, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    
                    setlistProducts(result);
                    setIsLoading(false);
                } else {
                    console.error("Failed to make request:", response.statusText);
                }
            } catch (error) {
                console.error("Failed to make request:", error);
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, [queryCalled, props.result]);
    

    const [checkboxes, setCheckboxes] = useState(Array(5).fill(false));

    const handleCheckboxChange = (index) => {
        const updatedCheckboxes = checkboxes.map((_, i) => i <= index);
        setCheckboxes(updatedCheckboxes);
    };
    const clearRating = () => {
        setCheckboxes(Array(5).fill(false));
    }


    var categorySet = new Set();
    var categoryList = listProducts.map((x) => {
        if (categorySet.has(x.category)) {
            return null;
        } else {
            categorySet.add(x.category);
            return x.category;
        }
    })




    return <div className='searchMain'>
        <div className='searchSort'>

            <div className='sortPrice'>
                <h3>Price</h3>
                <form>
                    <input placeholder='Max' type='text'></input>
                    <input placeholder='Min' type='text'></input>
                    <button className='sortSubmitPrice'> Sort</button>
                </form>
            </div>
            <div className='sortRating'>
                <h3>Rating</h3>
                <div>
                    {checkboxes.map((checked, index) => (
                        <input
                            key={index}
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleCheckboxChange(index)}
                        />
                    ))}
                    <button onClick={clearRating}>Clear</button>
                </div>
            </div>
            <div className='sortCategory'>
                <h3>Category</h3>
                <div>
                    {
                        categoryList.map((x, index) => {
                            if (listProducts[index]._id != "65316ea68c3f4a5ce57911e7") {
                                return <button>{x}</button>
                            } else {
                                return null;
                            }

                        })
                    }
                </div>
            </div>
            <button className='productSortMain'>Sort</button>

        </div>
        {isLoading ? <div className='searchProducts skeleton' style={{ }}></div> : 
        <div className='searchProducts'>

            {listProducts.map((x, index) => {
                if (listProducts[index]._id != "65316ea68c3f4a5ce57911e7") {
                    return <ProductCard id={x._id} image={x.image} title={x.productTitle} category={x.productCategory} price={x.productPrice} increasedPrice={x.productIncreasedPrice} hoverScale="false" />
                } else {
                    return null;
                }
            })}

        </div>}
    </div>
}
