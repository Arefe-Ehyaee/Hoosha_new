import React, { createContext, useContext, useRef } from 'react';
import { useIntersection } from 'react-use';

const IntersectionContext = createContext<{ inView: boolean }>({ inView: false });

interface IntersectionObserverWrapperProps {
  children: React.ReactNode;
  reset?: boolean;
}

const IntersectionObserverWrapper: React.FC<IntersectionObserverWrapperProps> = ({ children, reset = false }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Get the intersection observer entry
  const entry = useIntersection(ref, {
    rootMargin: '0px', // Optional: margin around the root
    threshold: 0.1,    // Optional: percentage of the element to be visible
  });

  // Derive inView from the entry
  const inView = !!entry?.isIntersecting;

  return (
    <IntersectionContext.Provider value={{ inView }}>
      <div ref={ref}>
        {children}
      </div>
    </IntersectionContext.Provider>
  );
};

export { IntersectionObserverWrapper, IntersectionContext };
