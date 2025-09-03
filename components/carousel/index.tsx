/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useMemo, useState} from 'react';
import {ChevronLeft, ChevronRight, AlertCircle} from 'lucide-react';
import './carousel.css';

export default function Carousel({items = [], startIndex = 0, autoPlay = false, autoPlayInterval = 10000}: any) {
  const length = useMemo(() => (Array.isArray(items) ? items.length : 0), [items]);

  const safeStart = length > 0 ? Math.min(Math.max(0, startIndex), length - 1) : 0;
  const [current, setCurrent] = useState(safeStart);
  const [direction, setDirection] = useState('next');
  useEffect(() => {
    setCurrent(prev => {
      if (length === 0) return 0;
      return Math.min(prev, length - 1);
    });
  }, [length]);

  useEffect(() => {
    if (!autoPlay || length <= 1) return;
    const id = setInterval(
      () => {
        setCurrent(prev => (prev + 1) % length);
      },
      Math.max(1000, autoPlayInterval),
    );
    return () => clearInterval(id);
  }, [autoPlay, autoPlayInterval, length]);

  const next = () => {
    setDirection('next');
    setCurrent(prev => (length === 0 ? prev : (prev + 1) % length));
  };

  const prev = () => {
    setDirection('prev');

    setCurrent(prev => (length === 0 ? prev : (prev - 1 + length) % length));
  };

  const hasItems = length > 0;
  const canNavigate = length > 1;

  return (
    <div className="carousel">
      <div className="carousel-nav">
        <button onClick={prev} disabled={current === 0} aria-label="Previous" className="carousel-btn">
          <ChevronLeft className="icon" />
        </button>
        <button onClick={next} disabled={current == length - 1} aria-label="Next" className="carousel-btn">
          <ChevronRight className="icon" />
        </button>
      </div>

      <div className="carousel-stage">
        {hasItems ? (
          <>
            <div key={current} className={`carousel-item ${direction === 'next' ? 'slide-in-next' : 'slide-in-prev'}`}>
              {items[current]}
            </div>
            <div
              key={`prev-${current}`}
              className={`carousel-item prev-carousel-item ${direction === 'next' ? 'slide-out-prev' : 'slide-out-next'}`}
            >
              {items[direction === 'next' ? (current - 1 + length) % length : (current + 1) % length]}
            </div>
          </>
        ) : (
          <div className="carousel-empty">
            <AlertCircle className="icon-large" />
            <p>No items to display.</p>
            <p className="hint">
              Pass an array of React nodes to the <code>items</code> prop.
            </p>
          </div>
        )}
      </div>

      {canNavigate && (
        <div className="carousel-dots">
          {items.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`dot ${index === current ? 'active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
