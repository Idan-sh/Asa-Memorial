import { useNavigate } from 'react-router-dom';
import flameIcon from '/icons/flame-icon.png';
import menuIcon from '/icons/menu-bar.png';
import { useEffect, useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update isMobile when the window is resized
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="header-container">
      {isMobile && (
        <div className="header-menu-container">
          <img className="header-menu-icon" src={menuIcon} />
        </div>
      )}
      <div className="header-title-container" onClick={() => navigate('/')}>
        <img className="header-icon" src={flameIcon} />
        <div className="header-title">אסא גיל-עד ז״ל</div>
      </div>
    </div>
  );
}
