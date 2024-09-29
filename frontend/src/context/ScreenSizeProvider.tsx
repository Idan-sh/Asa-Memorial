import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';

// Define the shape of the context value
interface ScreenSizeContextType {
  isMobile: boolean;
}

// Create the context, initializing with `undefined`
const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(
  undefined
);

interface ScreenSizeProviderProps {
  children: ReactNode;
}

// Provider component
export const ScreenSizeProvider = ({ children }: ScreenSizeProviderProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ isMobile }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

// Custom hook for accessing screen size context
export const useScreenSize = () => {
  const context = useContext(ScreenSizeContext);

  if (!context) {
    throw new Error('useScreenSize must be used within a ScreenSizeProvider');
  }

  return context;
};
