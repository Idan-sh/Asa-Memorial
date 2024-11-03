interface EulogyItemProps {
  name: string;
  relation: string;
  message: string;
  onOpen: () => void;
}

export default function EulogyItem({
  name,
  relation,
  message,
  onOpen,
}: EulogyItemProps) {
  return (
    <div className="eulogy-item-container">
      <div className="eulogy-item__name">{name}</div>
      <div className="eulogy-item__relation">{relation}</div>
      <p className="eulogy-item__message">{message}</p>
      <button onClick={onOpen}>להספד המלא</button>
    </div>
  );
}
