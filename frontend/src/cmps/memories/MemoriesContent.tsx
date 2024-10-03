import { useNavigate } from 'react-router-dom';
import MemoryItem from './MemoryItem';

export default function MemoriesContent() {
  const navigate = useNavigate();
  const goToAddMemoryForm = () => navigate('/add-memory');

  return (
    <div className="memories-content-container">
      <h2>זכרונות והקדשות</h2>
      <div className="memories-content-items">
        <MemoryItem />
        <MemoryItem />
        <MemoryItem />
        <MemoryItem />
      </div>
      <div className="memories-content-add-memory-container">
        <button onClick={goToAddMemoryForm}>הוסף הקדשה / זיכרון</button>
      </div>
    </div>
  );
}
