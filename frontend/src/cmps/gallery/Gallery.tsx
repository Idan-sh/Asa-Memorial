import GalleryAlbum from './GalleryAlbum';

export default function Gallery() {
  return (
    <div className="gallery-content-container">
      <h2>גלריה</h2>
      <div className="gallery-content-albums-container">
        <GalleryAlbum title="ילדות ונעורים" folderName="childhood" />
        <GalleryAlbum title="מסביב לעולם" folderName="aroundTheWorld" />
        <GalleryAlbum
          title="נעורים בירושלים: עלייה והתבגרות"
          folderName="growingUpInJerusalem"
        />
        <GalleryAlbum title="שירות בצה״ל" folderName="Army" />
        <GalleryAlbum title="שירות ביס״מ ירושלים" folderName="Police" />
        <GalleryAlbum title="אופניים" folderName="bike" />
        <GalleryAlbum title="משפחה" folderName="family" />
      </div>
    </div>
  );
}
