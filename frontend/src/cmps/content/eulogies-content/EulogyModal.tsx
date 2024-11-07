import { EulogyItemModel } from '../../../models/EulogyItem.model';

interface EulogyModalProps {
  eulogy: EulogyItemModel;
  onClose: () => void;
  isClosing: boolean;
}
export default function EulogyModal({
  eulogy,
  onClose,
  isClosing,
}: EulogyModalProps) {
  return (
    <div
      className={`eulogy-modal-overlay ${isClosing ? 'closing' : ''}`}
      onClick={onClose}
    >
      <div
        className={`eulogy-modal-content ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>הספד מאת: {eulogy.name}</h3>
        <p>
          <strong>{eulogy.relation}</strong>
        </p>
        <div className="eulogy-modal-message-wrapper">
          <p className="eulogy-modal-message">{eulogy.message}</p>
        </div>
        <button onClick={onClose}>סגור</button>
      </div>
    </div>
  );
}
