import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./adminCenter.css";
import url from '../url';

export default function AdminCenter() {
    const { statusC } = useParams();
    const navigate = useNavigate();
    const [resultOrders, setresultOrders] = useState([]);
    const [dataSingleProducts, setdataSingleProducts] = useState([]);
    const [checkOrderboxes, setOrderCheckboxes] = useState(Array(5).fill(false));

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
    const orderDataFetch = async (statusBool) => {
        console.log(statusBool);
        try {
            const response = await fetch(url + `/admin/orders/${statusBool}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const resultOrders = await response.json();
                setresultOrders(resultOrders);

                // Fetch product data for each order
                const productDataPromises = resultOrders.map(async (order) => {
                    return await fetchData(order.productID);
                });

                // Wait for all Promises to resolve
                const productData = await Promise.all(productDataPromises);
                var orderIntialStatusBool = resultOrders.map((x, index) => {
                    return x.statusCompleted
                })
                setOrderCheckboxes(orderIntialStatusBool);
                setdataSingleProducts(productData);
            } else {
                console.error("Failed to make request:", response.statusText);
                setresultOrders([1, 2, 4, 5]);
            }
        } catch (error) {
            console.error("Failed to make request:", error);
            setresultOrders([1, 2, 4, 5]);
        }
    }

    useEffect(() => {



        orderDataFetch(statusC);
    }, [statusC]);





    const handleOrderPageCheckboxChange = async (index, ProductID) => {
        if (!checkOrderboxes[index]) {
            try {
                const response = await fetch(url + `/admin/ordersStatusChange/${ProductID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const updatedCheckboxes = [...checkOrderboxes];
                    updatedCheckboxes[index] = true;
                    setOrderCheckboxes(updatedCheckboxes);
                } else {
                    console.error("Failed to make request:", response.statusText);
                }
            } catch (error) {
                console.error("Failed to make request:", error);
            }
        } else if (statusC === "true") {
            try {
                const response = await fetch(url + `/admin/ordersStatusChange/${ProductID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const updatedCheckboxes = [...checkOrderboxes];
                    updatedCheckboxes[index] = false;
                    setOrderCheckboxes(updatedCheckboxes);

                } else {
                    console.error("Failed to make request:", response.statusText);
                }
            } catch (error) {
                console.error("Failed to make request:", error);
            }
        }
    };

    return (
        <div className='orderPage'>
            <div className='orderPageSidebar'>
                <button onClick={async () => {
                    await orderDataFetch(statusC);
                    navigate("/adminCenter/true")
                }}>Completed</button>
                <button onClick={async () => {
                    await orderDataFetch(statusC);
                    navigate("/adminCenter/false")
                }}>Orders</button>
            </div>
            <div className='mainOrderPageArea'>
                <h1 style={{ fontFamily: "Montserrat, sans-serif" }}>{statusC === "true" ? "Completed" : "Order's"}</h1>
                {dataSingleProducts.map((product, index) => {
                    if (product) {
                        const order = resultOrders[index];
                        if (order) { 
                            return (
                                <div className='OrderPageSingleOrder' key={order.productID}>
                                    <img className='OrderPageSingleOrderImage' src={product.image} />
                                    <div className='OrderPageSingleOrderTextPart' style={{ display: "flex", flexDirection: "column", marginLeft: "" }}>
                                        <h1 className='OrderPageSingleOrderText'>{product.productTitle} ({order.productID})</h1>
                                        <h2 className='OrderPageSingleOrderQuantity'>Quantity: {order.quantity}</h2>
                                        <h2 className='OrderPageSingleOrderAddress'>Address: {order.address}</h2>
                                    </div>
                                    <input
                                        className='OrderPageSingleOrderCheckbox'
                                        key={index}
                                        type="checkbox"
                                        checked={checkOrderboxes[index]}
                                        onChange={() => handleOrderPageCheckboxChange(index, order._id)}

                                    />

                                </div>
                            );
                        } else {
                            return null
                        }
                    }
                    return null;
                })}
            </div>
        </div>
    );
}
