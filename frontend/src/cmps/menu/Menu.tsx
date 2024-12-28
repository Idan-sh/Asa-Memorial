import { useNavigate } from 'react-router-dom';
import { useScreenSize } from '../../context/ScreenSizeProvider';

interface MenuProps {
  onOptionClick: () => void;
  isMenuVisible: boolean;
}
export default function Menu({ onOptionClick, isMenuVisible }: MenuProps) {
  const navigate = useNavigate();
  const { isMobile } = useScreenSize();

  const goToMainPage = () => navigate('/');
  const goToGaleryPage = () => navigate('/gallery');
  const goToMemoriesPage = () => navigate('/memories');
  const goToEulogiesPage = () => navigate('/eulogies');

  return (
    <nav className={'menu-container'}>
      <ul
        className={`menu-options-container ${isMobile ? 'mobile' : 'desktop'} ${isMenuVisible ? 'open' : ''}`}
        onClick={onOptionClick}
      >
        <li onClick={goToMainPage}>דף הבית</li>
        <li onClick={goToGaleryPage}>גלריה</li>
        <li onClick={goToEulogiesPage}>הספדים</li>
        <li onClick={goToMemoriesPage}>הקדשות וזכרונות</li>
      </ul>
    </nav>
  );
}
