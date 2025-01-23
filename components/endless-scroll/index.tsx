'use client';
import React, {useEffect, useRef} from 'react';
import Image from 'next/image';

interface ImageData {
  // id: string;
  url: string;
  className?: string;
  width?: number;
  height?: number;
}

interface EndlessImageScrollProps {
  images: ImageData[];
  direction?: 'left' | 'right';
}

const EndlessImageScroll: React.FC<EndlessImageScrollProps> = ({images, direction = 'right'}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (carousel) {
      let scrollAmount = 0;

      const scroll = () => {
        scrollAmount = direction === 'left' ? scrollAmount + 1 : scrollAmount - 1;

        // Reset scroll position for seamless looping
        if (scrollAmount >= carousel.scrollWidth / 2) {
          scrollAmount = 0;
        } else if (scrollAmount <= 0) {
          scrollAmount = carousel.scrollWidth / 2;
        }

        carousel.scrollTo({left: scrollAmount});

        requestAnimationFrame(scroll);
      };

      const animationFrameId = requestAnimationFrame(scroll); // Continuously scroll

      return () => cancelAnimationFrame(animationFrameId); // Cleanup on unmount
    }
  }, [direction]);

  return (
    <div
      ref={carouselRef}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Duplicate the images to create the endless effect */}
      {[...images, ...images].map((image, index) => (
        <Image
          className={image.className}
          key={`${index}`}
          src={image.url}
          width={image.width || 200}
          height={image.height || 200}
          alt=""
          style={{
            // width: '200px',
            // height: '200px',
            objectFit: 'cover',
            marginRight: '16px',
          }}
        />
      ))}
    </div>
  );
};
export default EndlessImageScroll;
