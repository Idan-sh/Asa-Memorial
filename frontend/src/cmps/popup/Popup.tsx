import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PopupProps {
  title: string;
  message: string;
  success: boolean;
  closePopup: () => void; // Should reset the popup's state for future re-renders
}

export default function Popup({
  title,
  message,
  success = false,
  closePopup,
}: PopupProps) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show the popup when the component mounts
    setShowPopup(true);

    // Hide the popup after delay
    const timer = setTimeout(() => {
      setShowPopup(false);
      navigate('', { replace: true });
      closePopup();
    }, 8000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  const handleCloseClick = () => {
    setShowPopup(false);
    navigate('', { replace: true });
    closePopup();
  };

  return (
    <div
      className={`popup-container ${showPopup ? 'show' : ''} ${success ? 'success' : ''}`}
    >
      <div className="popup-title">{title}</div>
      <div className="popup-message">{message}</div>
      <button onClick={handleCloseClick}>×</button>
    </div>
  );
}
