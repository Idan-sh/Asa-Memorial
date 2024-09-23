import profilePic from '/imgs/profile.jpeg';

export default function Header() {
  return (
    <div className="header-container">
      <img className="profile-picture-img" src={profilePic} />
    </div>
  );
}
