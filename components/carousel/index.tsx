'use client';
import React, {useState, useEffect, ReactNode} from 'react';
import './index.css';

const Carousel = ({children}: {children: ReactNode[]}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isForward, setIsForward] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        if (isForward) {
          if (prevIndex === children.length - 1) {
            setIsForward(false);
            return prevIndex - 1;
          }
          return prevIndex + 1;
        } else {
          if (prevIndex === 0) {
            setIsForward(true);
            return prevIndex + 1;
          }
          return prevIndex - 1;
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, children.length, isForward]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  // const goToPrevious = () => {
  //   setCurrentIndex(prevIndex => (prevIndex === 0 ? children.length - 1 : prevIndex - 1));
  //   setIsAutoPlaying(false);
  //   setTimeout(() => setIsAutoPlaying(true), 8000);
  // };

  // const goToNext = () => {
  //   setCurrentIndex(prevIndex => (prevIndex === children.length - 1 ? 0 : prevIndex + 1));
  //   setIsAutoPlaying(false);
  //   setTimeout(() => setIsAutoPlaying(true), 8000);
  // };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {/* <button
          className="nav-button nav-button-left"
          onClick={goToPrevious}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.2071 6.29289C15.5976 6.68342 15.5976 7.31658 15.2071 7.70711L10.9142 12L15.2071 16.2929C15.5976 16.6834 15.5976 17.3166 15.2071 17.7071C14.8166 18.0976 14.1834 18.0976 13.7929 17.7071L8.79289 12.7071C8.40237 12.3166 8.40237 11.6834 8.79289 11.2929L13.7929 6.29289C14.1834 5.90237 14.8166 5.90237 15.2071 6.29289Z"
              fill="white"
            />
          </svg>
        </button>
        <button
          className="nav-button nav-button-right"
          onClick={goToNext}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.79289 6.29289C9.18342 5.90237 9.81658 5.90237 10.2071 6.29289L15.2071 11.2929C15.5976 11.6834 15.5976 12.3166 15.2071 12.7071L10.2071 17.7071C9.81658 18.0976 9.18342 18.0976 8.79289 17.7071C8.40237 17.3166 8.40237 16.6834 8.79289 16.2929L13.0858 12L8.79289 7.70711C8.40237 7.31658 8.40237 6.68342 8.79289 6.29289Z"
              fill="white"
            />
          </svg>
        </button> */}
        <div className="cards-container" style={{transform: `translateX(-${currentIndex * 100}%)`}}>
          {React.Children.map(children, (child, index) => (
            <div key={index} className="card" style={{width: `${window.innerWidth}px`, margin: 'auto'}}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="dots-container">
        {React.Children.map(children, (_, index) => (
          <button key={index} className={`dot ${index === currentIndex ? 'active' : ''}`} onClick={() => goToSlide(index)} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
