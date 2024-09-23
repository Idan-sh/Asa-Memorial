import profilePic from '/imgs/profile.jpeg';

export default function Header() {
  return (
    <div className="header-container">
      <div className="header-title-container">
        <div className="main-title">אסא גיל - עד</div>
        <div className="secondary-title">בן יהודית תמר ואמנון</div>
      </div>
      <div className="header-details-container"></div>
      <img className="profile-picture-img" src={profilePic} />
    </div>
  );
}
