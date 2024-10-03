import MemoryItem from './MemoryItem';

export default function MemoriesContent() {
  return (
    <div className="memories-content-container">
      <h2>זכרונות והקדשות</h2>
      <div className="memories-content-items">
        <MemoryItem />
        <MemoryItem />
        <MemoryItem />
        <MemoryItem />
      </div>
    </div>
  );
}
