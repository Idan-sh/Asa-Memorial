import { useNavigate } from 'react-router-dom';
import { Player } from '@lordicon/react';
import CandleAnimated from '../../assets/animations/candle-animated.json';
import { useRef } from 'react';

interface MemoryItemProps {
  id: string;
  name: string;
  relation: string;
  message: string;
}
export default function MemoryItem({
  id,
  name,
  relation,
  message,
}: MemoryItemProps) {
  const navigate = useNavigate();
  const goToFullMemory = () => navigate('/memories/' + id);

  const playerRef = useRef<Player>(null);

  const onMemoryItemMouseOver = () => {
    playerRef.current?.play();
  };

  const onMemoryItemMouseOut = () => {
    playerRef.current?.pause();
  };

  return (
    <div
      className="memory-item-container"
      onMouseOut={onMemoryItemMouseOut}
      onMouseOver={onMemoryItemMouseOver}
    >
      <Player
        size={100}
        ref={playerRef}
        icon={CandleAnimated}
        onComplete={() => playerRef.current?.playFromBeginning()}
      />
      <div className="memory-item__name">{name}</div>
      <div className="memory-item__relation">{relation}</div>
      <div className="memory-item__message">{message} </div>
      <button onClick={goToFullMemory}>לזיכרון המלא</button>
    </div>
  );
}
