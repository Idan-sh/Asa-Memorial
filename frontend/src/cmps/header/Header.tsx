import flameIcon from '/imgs/flame-icon.png';

export default function Header() {
  return (
    <div className="header-container">
      <div className="header-title-container">
        <img className="header-icon" src={flameIcon} />
        <div className="header-title">אסא גיל-עד ז״ל</div>
      </div>
    </div>
  );
}
