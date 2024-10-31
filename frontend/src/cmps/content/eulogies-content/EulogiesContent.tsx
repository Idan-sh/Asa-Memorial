import { eulogiesData } from './Eulogies';
import EulogyItem from './EulogyItem';

export default function EulogiesContent() {
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
            />
          );
        })}
      </div>
    </div>
  );
}
