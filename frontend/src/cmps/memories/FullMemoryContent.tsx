interface FullMemoryContentProps {
  memoryId: string;
}

export default function FullMemoryContent({
  memoryId,
}: FullMemoryContentProps) {
  return <div>FullMemoryContent of {memoryId}</div>;
}
