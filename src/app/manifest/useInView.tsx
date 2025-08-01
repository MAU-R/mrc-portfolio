// hooks/useInView.ts
import { useEffect, useState, useRef } from 'react';

export const useInView = <T extends HTMLElement>(options: IntersectionObserverInit = {}, threshold:number = 0.3 ) => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: threshold, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};
export default useInView;