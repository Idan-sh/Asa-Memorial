import { useEffect, useState } from 'react';
import upArrowIcon from '/icons/up-arrow.png';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top-container">
      <button
        className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
      >
        <img src={upArrowIcon} alt="up arrow icon" />
      </button>
    </div>
  );
}
