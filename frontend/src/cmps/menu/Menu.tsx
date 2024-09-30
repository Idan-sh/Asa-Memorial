import { useNavigate } from 'react-router-dom';
import { useScreenSize } from '../../context/ScreenSizeProvider';

interface MenuProps {
  onOptionClick: () => void;
}
export default function Menu({ onOptionClick }: MenuProps) {
  const navigate = useNavigate();
  const { isMobile } = useScreenSize();

  const goToMainPage = () => navigate('/');
  const goToGaleryPage = () => navigate('/gallery');
  const goToMemoriesPage = () => navigate('/memories');

  return (
    <div className={'menu-container'}>
      <div
        className={`menu-options-container ${isMobile ? 'mobile' : 'desktop'}`}
        onClick={onOptionClick}
      >
        <h3 onClick={goToMainPage}>דף הבית</h3>
        <h3 onClick={goToGaleryPage}>גלריה</h3>
        <h3 onClick={goToMemoriesPage}>הקדשות וזכרונות</h3>
      </div>
    </div>
  );
}
