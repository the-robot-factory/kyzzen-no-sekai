'use client';
import React, {ReactNode, useState} from 'react';
import styles from './index.module.css';

interface ICarousel {
  slides: ReactNode[];
}

const CustomCarousel: React.FC<ICarousel> = ({slides}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  console.log(currentIndex);

  return (
    <div className={styles.carousel}>
      <button className={styles.navButton} onClick={handlePrev}>
        &#8592;
      </button>

      <div className={styles.slide}>{slides[currentIndex]}</div>

      <button className={styles.navButton} onClick={handleNext}>
        &#8594;
      </button>
    </div>
  );
};

export default CustomCarousel;
