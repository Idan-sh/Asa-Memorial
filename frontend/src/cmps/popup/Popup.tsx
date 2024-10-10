import { useEffect, useState } from 'react';

interface PopupProps {
  title: string;
  message: string;
  success: boolean;
}

export default function Popup({ title, message, success = false }: PopupProps) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show the popup when the component mounts
    setShowPopup(true);

    // Hide the popup after 10 seconds
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`popup-container ${showPopup ? 'show' : ''} ${success ? 'success' : ''}`}
    >
      <div className="popup-title">{title}</div>
      <div className="popup-message">{message}</div>
      <button onClick={() => setShowPopup(false)}>×</button>
    </div>
  );
}
