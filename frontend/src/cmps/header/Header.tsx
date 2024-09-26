import { useNavigate } from 'react-router-dom';
import flameIcon from '/imgs/flame-icon.png';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header-container" onClick={() => navigate('/')}>
      <div className="header-title-container">
        <img className="header-icon" src={flameIcon} />
        <div className="header-title">אסא גיל-עד ז״ל</div>
      </div>
    </div>
  );
}
