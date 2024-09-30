import { useNavigate } from 'react-router-dom';
import flameIcon from '/icons/flame-icon.png';
import menuIcon from '/icons/menu-bar.png';
import { useScreenSize } from '../../context/ScreenSizeProvider';
import Menu from '../menu/Menu';
import { useEffect, useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const { isMobile } = useScreenSize();

  const [isMenuVisible, setIsMenuVisible] = useState(!isMobile);

  useEffect(() => {
    setIsMenuVisible(!isMobile);
  }, [isMobile]);

  const toggleMenu = () => {
    if (isMobile) setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="header-container">
      <div className="header-bar-container">
        {isMobile && (
          <div className="header-menu-container" onClick={toggleMenu}>
            <img className="header-menu-icon" src={menuIcon} />
          </div>
        )}
        <div className="header-title-container" onClick={() => navigate('/')}>
          <img className="header-icon" src={flameIcon} />
          <div className="header-title">אסא גיל-עד ז״ל</div>
        </div>
      </div>
      {isMenuVisible && <Menu onOptionClick={toggleMenu} />}
    </div>
  );
}
