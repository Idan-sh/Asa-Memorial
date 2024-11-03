interface GoBackButtonProps {
  onGoBackClick: () => void;
}
export default function GoBackButton({ onGoBackClick }: GoBackButtonProps) {
  const onClick = () => {
    onGoBackClick();
  };

  return (
    <div className="back-button-container">
      <button onClick={onClick}>חזור</button>
    </div>
  );
}
