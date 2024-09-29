import { useNavigate } from 'react-router-dom';

export default function Menu() {
  const navigate = useNavigate();

  const goToMainPage = () => navigate('/');
  const goToGaleryPage = () => navigate('/gallery');
  const goToMemoriesPage = () => navigate('/memories');

  return (
    <div className="menu-container">
      <h3 onClick={goToMainPage}>דף הבית</h3>
      <h3 onClick={goToGaleryPage}>גלריה</h3>
      <h3 onClick={goToMemoriesPage}>הקדשות וזכרונות</h3>
    </div>
  );
}
