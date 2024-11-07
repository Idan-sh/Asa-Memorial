import { useEffect, useState } from 'react';
import { eulogiesData } from './Eulogies';
import EulogyItem from './EulogyItem';
import EulogyModal from './EulogyModal';
import { EulogyItemModel } from '../../../models/EulogyItem.model';


export default function EulogiesContent() {
  const [selectedEulogy, setSelectedEulogy] = useState<EulogyItemModel | null>(
    null
  );
  const [isClosing, setIsClosing] = useState(false);

  const openEulogyModal = (eulogy: EulogyItemModel) => {
    setSelectedEulogy(eulogy);
    setIsClosing(false);
  };

  const closeEulogyModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedEulogy(null);
      setIsClosing(false);
    }, 300);
  };

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedEulogy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Clean up when component unmounts or modal closes
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEulogy]);

  return (
    <div className="eulogies-content-container">
      <h2>הספדים</h2>
      <div className="eulogies-content-items">
        {eulogiesData.map((eulogy) => {
          return (
            <EulogyItem
              key={eulogy.name}
              name={eulogy.name}
              relation={eulogy.relation}
              message={eulogy.message}
              onOpen={() => openEulogyModal(eulogy)}
            />
          );
        })}
      </div>
      {selectedEulogy && (
        <EulogyModal
          eulogy={selectedEulogy}
          onClose={closeEulogyModal}
          isClosing={isClosing}
        />
      )}
    </div>
  );
}
