import { useEffect, useRef, useState } from 'react';

export default function AddMemoryForm() {
  const messageTextareaRef = useRef<HTMLTextAreaElement>(null);
  const maxMessageCharacters = 10;
  const [messageCharCount, setMessageCharCount] = useState(0);

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

      setMessageCharCount(textarea.value.length); // Update the character count
    }
  };

  const handleMessageKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const textarea = messageTextareaRef.current;

    if (textarea) {
      const currentLength = textarea.value.length;

      // Allow control keys such as Backspace, Delete, Arrow keys
      const allowedKeys = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
      ];

      // If character limit is reached and the key pressed is not allowed, prevent further input
      if (
        currentLength >= maxMessageCharacters &&
        !allowedKeys.includes(event.key)
      ) {
        event.preventDefault(); // Prevent further input
      }
    }
  };

  const handleMessagePaste = (
    event: React.ClipboardEvent<HTMLTextAreaElement>
  ) => {
    const textarea = messageTextareaRef.current;

    if (textarea) {
      const pastedText = event.clipboardData.getData('text'); // Get pasted text
      const currLen = textarea.value.length;
      const charsLeft = maxMessageCharacters - currLen;

      // If the pasted text would exceed the character limit
      if (pastedText.length > charsLeft) {
        event.preventDefault(); // Prevent default paste behavior

        // Only paste as many characters as allowed
        const textToPaste = pastedText.slice(0, charsLeft);
        textarea.value += textToPaste;
        setMessageCharCount(textarea.value.length); // Update character count
        handleMessageInput(); // Adjust height after paste
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
            onPaste={handleMessagePaste}
          />
          <div className="add-memory-form-message-textarea-counter">
            {maxMessageCharacters - messageCharCount}
          </div>
        </div>
        <div className="add-memory-form-pictures"></div>
      </form>
    </div>
  );
}
