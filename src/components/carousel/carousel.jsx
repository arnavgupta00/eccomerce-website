import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

import "./carousel.css";



export default function Carousel(props) {
  const [page, setPage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const parallaxRef = useRef();
  const controls = useAnimation();
  const x = useMotionValue(0);



  const goToNext = () => {
    if (page < props.list.length - 1) {
      setPage(page + 1);
      parallaxRef.current.scrollTo(page + 1);
    }
    if (page === props.list.length - 1) {
      setPage(0);
      parallaxRef.current.scrollTo(0);
    }
  }

  const goToPrevious = () => {
    if (page > 0) {
      setPage(page - 1);
      parallaxRef.current.scrollTo(page - 1);
    }
    if (page === 0) {
      setPage(props.list.length - 1);
      parallaxRef.current.scrollTo(props.list.length - 1);
    }
  }
  const scrollToButton = (ind) => {
    setPage(ind);
    parallaxRef.current.scrollTo(ind);
  }

  const handleDrag = (e, info) => {
    x.set(info.offset.x);
  };

  const handleDragEnd = () => {
    if (x.get() > 100) {
      goToPrevious();
      // Right swipe detected
    } else if (x.get() < -100) {
      goToNext();
      // Left swipe detected
    }
    x.set(0);
  };

  useEffect(() => {
    // Auto-play interval in milliseconds 
    if (props.autoPlay === "true") {
      const interval = 3000;

      const autoPlay = setInterval(() => {
        goToNext()
      }, interval);

      // Clear the interval when the component unmounts
      return () => clearInterval(autoPlay);
    }

  });
  return (
    <motion.div onHoverEnd={() => setIsHovering(false)} onHoverStart={() => setIsHovering(true)} style={{ height: props.height, width: props.width, borderRadius: props.borderRadii }}>
      <Parallax
        className="parallax"
        style={{ height: props.height, width: props.width, borderRadius: props.borderRadii, overflow: "hidden" }}
        pages={props.list.length}
        horizontal
        ref={parallaxRef}


      >
        <motion.div 
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={{ x: x }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
          {props.list.map((x, index) => (
            <ParallaxLayer key={index} offset={index} speed={0.1} >
              <img draggable="false" src={x} style={{ height: props.height, width: props.width, objectFit: 'cover', borderRadius: props.borderRadii }} alt={`Image ${index}`} />
            </ParallaxLayer>
          ))}
        </motion.div>
      </Parallax>
      <div className='productDots' style={{ width: props.width, height: props.height, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

        <div className='carouselChange' style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: props.width, height: props.height, visibility: isHovering ? 'visible' : "hidden" }}>
          <IoIosArrowBack
            style={{ height: '50px', width: '30px', zIndex: '5', opacity: '0.5', borderTopRightRadius: "15px", borderBottomRightRadius: "15px", marginTop: props.marginTop }}
            onClick={goToPrevious}
          />
          <IoIosArrowForward
            style={{ height: '50px', width: '30px', zIndex: '5', opacity: '0.5', borderTopLeftRadius: "15px", borderBottomLeftRadius: "15px", marginTop: props.marginTop }}
            onClick={goToNext}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "17px", width: "max-content", backgroundColor: "black", opacity: "0.5", borderRadius: "25px", paddingLeft: "7px", paddingRight: "7px", alignSelf: "center", marginBottom: "9px" }}>
          {props.list.map((x, index) => (
            <button className={`productDotsDots ${page === index ? 'active' : ''}`} onClick={() => scrollToButton(index)} ></button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

