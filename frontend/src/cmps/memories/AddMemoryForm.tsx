import { useEffect, useRef, useState } from 'react';
import { useScreenSize } from '../../context/ScreenSizeProvider';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AddMemoryItemData } from '../../models/AddMemoryItemData.model';
import { RelationCategory, relationOptions } from '../../models/Relation.model';
import { handleSubmit } from '../../services/add.memory.service';
import ErrorPopup from '../global/ErrorPopup';

export default function AddMemoryForm() {
  const navigate = useNavigate();

  const goToMemories = () => navigate('/memories');

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const messageTextareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxMessageCharacters = 4000;
  const maxImageUploads = 5;

  const { isMobile } = useScreenSize();

  const [messageCharCount, setMessageCharCount] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState<
    RelationCategory | ''
  >('');
  const [selectedRelation, setSelectedRelation] = useState('');

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  // Track form input values
  const [formData, setFormData] = useState<AddMemoryItemData>({
    firstName: '',
    lastName: '',
    nickname: '',
    relation: '',
    message: '',
  });

  const closeErrorPopup = () => {
    setIsErrorVisible(false);
  };

  const displayErrorPopup = (message: string) => {
    setErrorMessage(message);
    setIsErrorVisible(true);

    setTimeout(() => {
      closeErrorPopup();
    }, 20000); // Hide after 20 seconds
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value as RelationCategory);
    setSelectedRelation(''); // Reset relation when category changes
  };

  const handleRelationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedRelation(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      relation: event.target.value,
    }));
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const files = Array.from(event.dataTransfer.files);
    setUploadedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (uploadedImages.length + files.length <= maxImageUploads) {
      setUploadedImages((prevImages) => [...prevImages, ...files]);
    } else {
      alert(`ניתן להעלות לכל היותר ${maxImageUploads} תמונות`);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await handleSubmit(formData, displayErrorPopup);
    console.log(result);

    if (result.success) {
      goToMemories();
    }
  };

  useEffect(() => {
    handleMessageInput(); // Adjust the height based on the initial content
  }, []);

  return (
    <div className="add-memory-container">
      <h2>זיכרון חדש</h2>
      <form onSubmit={handleOnSubmit} className="add-memory-form">
        {/* Names input */}
        <div className="add-memory-form-names-container">
          <input
            className="add-memory-form-first-name-input"
            type="text"
            placeholder="שם פרטי"
            name="firstName"
            onChange={handleInputChange}
          />
          <input
            className="add-memory-form-nickname-input"
            type="text"
            placeholder="כינוי (אופציונאלי)"
            name="nickname"
            onChange={handleInputChange}
          />
          <input
            className="add-memory-form-last-name-input"
            type="text"
            placeholder="שם משפחה (אופציונאלי)"
            name="lastName"
            onChange={handleInputChange}
          />
        </div>

        {/* Relation input */}
        <div className="add-memory-form-relation-container">
          <h3 className="add-memory-form-relation-title">מערכת יחסים:</h3>
          <div className="add-memory-form-relation-selections">
            {/* General category dropdown */}
            <div className="add-memory-form-relation-category">
              <label htmlFor="category-select">קטגוריה:</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">בחר קטגוריה...</option>
                <option value="family">משפחה</option>
                <option value="friend">חברים</option>
                <option value="acquaintance">מכרים</option>
              </select>
            </div>

            {/* Specific relation dropdown based on the selected category */}
            <div
              className={`add-memory-form-relation-specific ${
                selectedCategory === '' ? 'hidden' : ''
              }`}
            >
              <label htmlFor="relation-select">מערכת יחסים:</label>
              <select
                id="relation-select"
                value={selectedRelation}
                onChange={handleRelationChange}
              >
                <option value="">בחר מערכת יחסים...</option>
                {selectedCategory &&
                  relationOptions[selectedCategory]?.map((relation) => (
                    <option key={relation} value={relation}>
                      {relation}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Message input */}
        <div className="add-memory-form-message-container">
          <textarea
            className="add-memory-form-message-textarea"
            placeholder="תיאור"
            ref={messageTextareaRef}
            onInput={handleMessageInput}
            onKeyDown={handleMessageKeyDown}
            onPaste={handleMessagePaste}
            name="message"
            onChange={handleInputChange}
          />
          <div className="add-memory-form-message-textarea-counter">
            {maxMessageCharacters - messageCharCount}
          </div>
        </div>

        {/* Image Upload Box */}
        <div
          className={`add-memory-form-pictures-upload-container ${dragging ? 'dragging' : ''}`}
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <p>
            {dragging
              ? 'שחרר כדי להעלות תמונות'
              : isMobile
                ? 'לחץ להעלאה'
                : 'גרור ושחרר תמונות כאן או לחץ להעלאה'}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Display uploaded images */}
        <div className="uploaded-images-preview">
          {uploadedImages.map((file, index) => (
            <div key={index} className="image-preview">
              <button
                type="button"
                className="remove-image-button"
                onClick={() => handleRemoveImage(index)}
              >
                ×
              </button>
              <img src={URL.createObjectURL(file)} alt={`Uploaded ${index}`} />
            </div>
          ))}
        </div>

        <div className="add-memory-form-submit-container">
          <button type="submit">שלח</button>
        </div>

        {isErrorVisible && (
          <ErrorPopup
            message={errorMessage}
            closeErrorPopup={closeErrorPopup}
          />
        )}
      </form>
    </div>
  );
}
