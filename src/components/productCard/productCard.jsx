import React, { useState, useEffect, useRef } from 'react';
import { Link , useNavigate  } from 'react-router-dom';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";

import "./productCard.css";

export default function ProductCard(props) {


    const navigate = useNavigate();
    var off = ((props.increasedPrice - props.price)/props.increasedPrice)*100;
    var urlForImport = "/productPage/" + props.id;

    return <div className='productCardMain' onClick={ () => navigate(urlForImport) }>
    <motion.div whileHover= {(props.hoverScale =="true" ) ? {y:-40, x:50 , scale: 1.7}: {}}  ><img className="productCardImg" src={props.image} /></motion.div>
    <div className='productCardText' >
        <h2 className='productCardTitle'>{props.title}</h2>
        <hr className='breakLine'/>
        <h4 className='productCardCategory'>{props.category}</h4>
        <div className='productCardPrice'><h3 className='productCardPrice'>{props.price}$  <s className='productCardIncreased'>{props.increasedPrice}$</s></h3></div>
    </div>

</div>;
}