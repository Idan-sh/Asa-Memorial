import { useNavigate } from 'react-router-dom';
import flameIcon from '/icons/flame-icon.png';
const memoryId = 'temp';

export default function MemoryItem() {
  const navigate = useNavigate();
  const goToFullMemory = () => navigate('/memory/' + memoryId);

  return (
    <div className="memory-item-container">
      <img className="memory-item__icon" src={flameIcon} />
      <div className="memory-item__name">שמעון שמעוני</div>
      <div className="memory-item__relation">חבר</div>
      <div className="memory-item__message">
        מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו
      </div>
      <button onClick={goToFullMemory}>לזיכרון המלא</button>
    </div>
  );
}
