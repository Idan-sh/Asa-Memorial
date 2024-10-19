interface EulogyItemProps {
  name: string;
  relation: string;
  message: string;
}

export default function EulogyItem({
  name,
  relation,
  message,
}: EulogyItemProps) {
  return (
    <div className="eulogy-item-container">
      <div className="eulogy-item__name">{name}</div>
      <div className="eulogy-item__relation">{relation}</div>
      <div className="eulogy-item__message">{message}</div>
      <button>להספד המלא</button>
    </div>
  );
}
