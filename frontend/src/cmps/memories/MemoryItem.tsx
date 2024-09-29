import flameIcon from '/icons/flame-icon.png';

export default function MemoryItem() {
  return (
    <div className="memory-item-container">
      <img className="memory-item__icon" src={flameIcon} />
      <div className="memory-item__name">שמעון שמעוני</div>
      <div className="memory-item__relation">חבר</div>
      <div className="memory-item__message">
        מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו
      </div>
      <button>לזיכרון המלא</button>
    </div>
  );
}
