import flameIcon from '/icons/flame-icon.png';

interface FullMemoryContentProps {
  memoryId: string | undefined;
}

export default function FullMemoryContent({
  memoryId,
}: FullMemoryContentProps) {
  if (memoryId === undefined) {
    return <div>Error fetching memory ID...</div>;
  }
  return (
    <div className="full-memory-container">
      <img className="full-memory__icon" src={flameIcon} />
      <div className="full-memory__name">שמעון שמעוני</div>
      <div className="full-memory__relation">חבר</div>
      <div className="full-memory__message">
        מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו
        מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו
        מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו
        מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו
        מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו מיאו
        מיאו מיאו
      </div>
      <div className="full-memory__pictures">some pictures here...</div>
    </div>
  );
}
