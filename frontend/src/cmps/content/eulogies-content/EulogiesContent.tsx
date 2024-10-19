import EulogyItem from './EulogyItem';

export default function EulogiesContent() {
  return (
    <div className="eulogies-content-container">
      <h2>הספדים</h2>
      <div className="eulogies-content-items">
        <EulogyItem name="שמעון" relation="חבר" message="הודעה" />
        <EulogyItem name="שמעון" relation="חבר" message="הודעה" />
      </div>
    </div>
  );
}
