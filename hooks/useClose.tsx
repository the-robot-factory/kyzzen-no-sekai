import {useEffect, useRef} from 'react';

const useClose = (callback: () => void, delay = 200) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const handleMouseEnter = () => {
      if (timeoutId) clearTimeout(timeoutId); // Cancel close if user hovers back
    };

    const handleMouseLeave = (event: MouseEvent) => {
      timeoutId = setTimeout(() => {
        if (ref.current && !ref.current.contains(event.relatedTarget as Node)) {
          callback(); // Close after delay if still outside
        }
      }, delay);
    };

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('mouseenter', handleMouseEnter);
      currentRef.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (currentRef) {
        currentRef.removeEventListener('mouseenter', handleMouseEnter);
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [callback, delay]);

  return ref;
};

export default useClose;
