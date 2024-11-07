export default function InstagramContent() {
  const onInstagramClick = () => {
    window.open('https://www.instagram.com/asagilad/', '_blank');
  };

  return (
    <div className="instagram-content-container">
      <h2>רגעים של אסא</h2>
      <div className="instagram-content-link" onClick={onInstagramClick}>
        <img src="/icons/instagram.png" width="50px" alt="Instagram Icon" />
        <p>asagilad</p>
      </div>
    </div>
  );
}
