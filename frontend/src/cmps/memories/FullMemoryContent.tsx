import { useCallback, useEffect, useRef, useState } from 'react';
import { MemoryItemData } from '../../models/MemoryItem.model';
import { useParams } from 'react-router-dom';
import { fetchMemory } from '../../services/fetch.memories.service';
import { Player } from '@lordicon/react';
import CandleAnimated from '../../assets/animations/candle-animated.json';

export default function FullMemoryContent() {
  const { memoryId } = useParams();
  const [memory, setMemory] = useState<MemoryItemData>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    updateMemory();
  }, []);

  const updateMemory = useCallback(async () => {
    try {
      if (memoryId === undefined) {
        throw new Error('Could not get memory ID param.');
      }

      console.log('fetching memory with ID' + memoryId + ' from server.');
      const result = await fetchMemory(memoryId);

      if (result.success) {
        setMemory(result.memory);
        setIsLoading(false);
      } else {
        setErrorMessage('Failed to fetch memory with ID ' + memoryId + '.');
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        setErrorMessage(err.message);
      } else {
        console.error('An unknown error occurred');
        setErrorMessage('An unknown error occurred');
      }
    }
  }, []);

  const onMemoryItemMouseOver = () => {
    playerRef.current?.play();
  };

  const onMemoryItemMouseOut = () => {
    playerRef.current?.pause();
  };

  if (errorMessage) {
    return <div className="full-memory-container">{errorMessage}</div>;
  }

  if (isLoading) {
    return <div></div>;
  }

  if (memory === undefined) {
    return (
      <div className="full-memory-container">Could not find memory...</div>
    );
  }

  const name =
    memory.nickname || `${memory.first_name} ${memory.last_name}`.trim();
  const relation = memory.relation ?? 'No relation provided';
  const message = memory.message ?? 'No message available';

  return (
    <div
      className="full-memory-container"
      onMouseOut={onMemoryItemMouseOut}
      onMouseOver={onMemoryItemMouseOver}
    >
      <Player
        size={120}
        ref={playerRef}
        icon={CandleAnimated}
        onComplete={() => playerRef.current?.playFromBeginning()}
      />{' '}
      <div className="full-memory__name">{name}</div>
      <div className="full-memory__relation">{relation}</div>
      <div className="full-memory__message">{message}</div>
      <div className="full-memory__pictures">some pictures here...</div>
    </div>
  );
}
