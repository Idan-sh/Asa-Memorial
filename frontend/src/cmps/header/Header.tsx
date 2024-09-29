import { useNavigate } from 'react-router-dom';
import flameIcon from '/icons/flame-icon.png';
import menuIcon from '/icons/menu-bar.png';
import { useScreenSize } from '../../context/ScreenSizeProvider';

export default function Header() {
  const navigate = useNavigate();
  const { isMobile } = useScreenSize();

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
