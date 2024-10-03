import { useLocation, useNavigate } from 'react-router-dom';
import MemoryItem from './MemoryItem';

interface MemoriesContentProps {
  limit?: number;
}

export default function MemoriesContent({ limit }: MemoriesContentProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const goToAddMemoryForm = () => navigate('/add-memory');
  const goToMemoriesContent = () => navigate('/memories');

  const isMainContent = location.pathname !== '/memories';

  return (
    <div className="memories-content-container">
      <h2>זכרונות והקדשות</h2>
      <div className="memories-content-items">
        {/* Need to limit the number of memory items, according to a props variable (which will be optional) */}
        <MemoryItem />
        <MemoryItem />
        <MemoryItem />
        <MemoryItem />
      </div>
      <div className="memories-content-add-memory-container">
        <button
          onClick={isMainContent ? goToMemoriesContent : goToAddMemoryForm}
        >
          {isMainContent ? 'ראה עוד זכרונות והקדשות' : 'הוסף הקדשה / זיכרון'}
        </button>
      </div>
    </div>
  );
}
