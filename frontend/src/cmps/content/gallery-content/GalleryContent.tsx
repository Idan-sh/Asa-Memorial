import GalleryAlbumPreview from './GalleryAlbumPreview';

export default function GalleryContent() {
  return (
    <div className="gallery-content-container">
      <h2>גלריה</h2>
      <div className="gallery-content-albums-container">
        <GalleryAlbumPreview title="ילדות ונעורים" folderName="childhood" />
        <GalleryAlbumPreview title="מסביב לעולם" folderName="aroundTheWorld" />
        <GalleryAlbumPreview
          title="נעורים בירושלים: עלייה והתבגרות"
          folderName="growingUpInJerusalem"
        />
        <GalleryAlbumPreview title="שירות בצה״ל" folderName="Army" />
        <GalleryAlbumPreview title="שירות ביס״מ ירושלים" folderName="Police" />
        <GalleryAlbumPreview title="אופניים" folderName="bike" />
        <GalleryAlbumPreview title="משפחה" folderName="family" />
      </div>
    </div>
  );
}
