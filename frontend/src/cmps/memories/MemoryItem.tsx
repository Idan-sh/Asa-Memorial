import { useNavigate } from 'react-router-dom';
import flameIcon from '/icons/flame-icon.png';

interface MemoryItemProps {
  id: string;
  name: string;
  relation: string;
  message: string;
}
export default function MemoryItem({
  id,
  name,
  relation,
  message,
}: MemoryItemProps) {
  const navigate = useNavigate();
  const goToFullMemory = () => navigate('/memory/' + id);

  return (
    <div className="memory-item-container">
      <img className="memory-item__icon" src={flameIcon} />
      <div className="memory-item__name">{name}</div>
      <div className="memory-item__relation">{relation}</div>
      <div className="memory-item__message">{message} </div>
      <button onClick={goToFullMemory}>לזיכרון המלא</button>
    </div>
  );
}
