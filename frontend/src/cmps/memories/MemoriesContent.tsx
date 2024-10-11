import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { MemoryItemData } from '../../models/MemoryItem.model';
import { fetchMemories } from '../../services/fetch.memories.service';
import MemoryItem from './MemoryItem';
import Popup from '../popup/Popup';

interface MemoriesContentProps {
  limit?: number;
}

export default function MemoriesContent({ limit }: MemoriesContentProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const goToAddMemoryForm = () => navigate('/add-memory');
  const goToMemoriesContent = () => navigate('/memories');

  const isMainContent = location.pathname !== '/memories';

  const [memories, setMemories] = useState<MemoryItemData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    if (location.state?.success) {
      setPopupMessage(location.state.message);
      setShowPopup(true);
    }
  }, [location.state]);

  useEffect(() => {
    updateMemories();
  }, []);

  const updateMemories = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('fetching memories from server.');
      const result = await fetchMemories(limit);

      if (result.success) {
        setMemories(result.memories || []);
      } else {
        setErrorMessage('Failed to fetch memories.');
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        setErrorMessage(err.message);
      } else {
        console.error('An unknown error occurred');
        setErrorMessage('An unknown error occurred');
      }
    }
    setIsLoading(false);
  }, []);

  const closePopup = () => {
    setTimeout(() => {
      setShowPopup(false);
    }, 500);
  };

  if (isLoading) {
    return <div className="memories-content-container">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="memories-content-container">{errorMessage}</div>;
  }

  return (
    <div className="memories-content-container">
      <h2>הקדשות וזכרונות</h2>

      <div className="memories-content-items">
        {/* Need to limit the number of memory items, according to a props variable (which will be optional) */}
        {memories.map((memory) => {
          const name =
            memory.nickname ||
            `${memory.first_name} ${memory.last_name}`.trim();
          const relation = memory.relation ?? 'No relation provided';
          const message = memory.message ?? 'No message available';

          return (
            <MemoryItem
              key={memory.id}
              id={memory.id}
              name={name !== '' ? name : 'No name available'}
              relation={relation}
              message={message}
            />
          );
        })}
      </div>

      <div className="memories-content-add-memory-container">
        <button
          onClick={isMainContent ? goToMemoriesContent : goToAddMemoryForm}
        >
          {isMainContent ? 'ראה עוד זכרונות והקדשות' : 'הוסף הקדשה / זיכרון'}
        </button>
      </div>

      {showPopup && (
        <Popup
          title="הבקשה נשלחה בהצלחה"
          message={popupMessage}
          success={true}
          closePopup={closePopup}
        />
      )}
    </div>
  );
}
