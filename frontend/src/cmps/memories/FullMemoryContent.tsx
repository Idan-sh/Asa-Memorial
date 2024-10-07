import { useCallback, useEffect, useState } from 'react';
import flameIcon from '/icons/flame-icon.png';
import { MemoryItemData } from '../../models/MemoryItem.model';
import { useParams } from 'react-router-dom';
import { fetchMemory } from '../../services/fetch.memories.service';

export default function FullMemoryContent() {
  const { memoryId } = useParams();
  const [memory, setMemory] = useState<MemoryItemData>();
  const [errorMessage, setErrorMessage] = useState<string>();

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

  if (errorMessage) {
    return <div className="full-memory-container">{errorMessage}</div>;
  }

  if (memory === undefined) {
    return (
      <div className="full-memory-container">Could not find memory...</div>
    );
  }

  if (memoryId === undefined) {
    return <div>Error fetching memory ID...</div>;
  }

  const name =
    memory.nickname || `${memory.first_name} ${memory.last_name}`.trim();
  const relation = memory.relation ?? 'No relation provided';
  const message = memory.message ?? 'No message available';

  return (
    <div className="full-memory-container">
      <img className="full-memory__icon" src={flameIcon} />
      <div className="full-memory__name">{name}</div>
      <div className="full-memory__relation">{relation}</div>
      <div className="full-memory__message">{message}</div>
      <div className="full-memory__pictures">some pictures here...</div>
    </div>
  );
}
