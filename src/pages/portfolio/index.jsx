import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";




export const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  
  // Assuming dataportfolio is available in your scope
  const totalItems = dataportfolio.length;
  
  const nextSlide = () => {
    setActiveIndex((current) => (current === totalItems - 1 ? 0 : current + 1));
  };
  
  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? totalItems - 1 : current - 1));
  };
  
  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // Handle window resize to adjust the slider
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        // This will trigger a re-render when window size changes
        sliderRef.current.style.width = `${sliderRef.current.offsetWidth}px`;
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.style.width = '100%';
          }
        }, 0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate the distance to translate based on active index
  const getTranslateValue = () => {
    if (!sliderRef.current) return 0;
    
    const sliderWidth = sliderRef.current.offsetWidth;
    const cardWidth = sliderWidth * 0.7; // Each card takes 70% of slider width
    
    // Calculate center position (50% of slider - 50% of card)
    const centerOffset = (sliderWidth - cardWidth) / 2;
    
    // Calculate the translation amount
    return -(activeIndex * cardWidth) + centerOffset;
  };

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Portfolio | {meta.title} </title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Portfolio </h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        
        {/* Center-Focused Card Slider */}
        <div className="center-slider-container" ref={sliderRef}>
          <div 
            className="center-slider-track" 
            style={{ transform: `translateX(${getTranslateValue()}px)` }}
          >
            {dataportfolio.map((data, index) => (
              <div 
                key={index} 
                className={`center-slider-card ${index === activeIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              >
                <div className="card-inner">
                  <img src={data.img} alt={data.description || 'Project image'} />
                  <div className="card-content">
                    <h5>{data.title || 'Project'}</h5>
                    <p>{data.description}</p>
                    <a href={data.link} className="card-btn">View Project</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <button className="slider-button prev" onClick={prevSlide}>
            <span>&lsaquo;</span>
          </button>
          <button className="slider-button next" onClick={nextSlide}>
            <span>&rsaquo;</span>
          </button>
          
          {/* Indicators/Pagination */}
          <div className="slider-pagination">
            {dataportfolio.map((_, index) => (
              <button 
                key={index}
                className={`pagination-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </HelmetProvider>
  );
};