import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

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
          <div className="light-gallery-container">
            <LightGallery
              speed={500}
              plugins={[lgThumbnail, lgZoom]}
              mode="lg-fade"
              zoomFromOrigin={false}
              download={false}
              thumbnail={false}
              zoom={false}
            >
              {eulogy.imageUrls.map((url, index) => (
                <a
                  key={index}
                  data-src={url}
                  data-sub-html={`<h3 class="sub-html-title"></h3>`}
                >
                  <img
                    className="img-responsive"
                    src={url}
                    alt={`Eulogy image number #${index + 1}`}
                  />
                </a>
              ))}
            </LightGallery>
          </div>
        </div>
        <button onClick={onClose}>סגור</button>
      </div>
    </div>
  );
}
