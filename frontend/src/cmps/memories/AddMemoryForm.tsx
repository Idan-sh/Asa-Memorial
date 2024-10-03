import { useEffect, useRef } from 'react';

export default function AddMemoryForm() {
  const messageTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleMessageInput = () => {
    const textarea = messageTextareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';

      const scrollHeight = textarea.scrollHeight;
      const maxHeight = parseInt(
        window.getComputedStyle(textarea).maxHeight,
        10
      );

      // Check if the calculated scroll height exceeds the max height
      if (scrollHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`; // Cap the height at maxHeight
      } else {
        textarea.style.height = `${scrollHeight}px`; // Otherwise, set it based on scrollHeight
      }
    }
  };

  const handleMessageKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const textarea = messageTextareaRef.current;

    if (textarea) {
      const maxHeight = parseInt(
        window.getComputedStyle(textarea).maxHeight,
        10
      );

      // If textarea reached max height, prevent new line input (Enter key)
      if (textarea.scrollHeight >= maxHeight && event.key === 'Enter') {
        event.preventDefault(); // Prevent the new line
      }
    }
  };

  useEffect(() => {
    handleMessageInput(); // Adjust the height based on the initial content
  }, []);

  return (
    <div className="add-memory-container">
      <h2>זיכרון חדש</h2>
      <form className="add-memory-form">
        <div className="add-memory-form-names-container">
          <input
            className="add-memory-form-first-name-input"
            type="text"
            placeholder="שם פרטי"
          />
          <input
            className="add-memory-form-nickname-input"
            type="text"
            placeholder="כינוי (אופציונאלי)"
          />
          <input
            className="add-memory-form-last-name-input"
            type="text"
            placeholder="שם משפחה"
          />
        </div>
        <div className="add-memory-form-relation"></div>
        <div className="add-memory-form-message-container">
          <textarea
            className="add-memory-form-message-textarea"
            placeholder="תיאור"
            ref={messageTextareaRef}
            onInput={handleMessageInput}
            onKeyDown={handleMessageKeyDown}
          />
        </div>
        <div className="add-memory-form-pictures"></div>
      </form>
    </div>
  );
}
