import GalleryAlbumPreview from './GalleryAlbumPreview';

export default function GalleryContent() {
  return (
    <div className="gallery-content-container">
      <h1>גלריה</h1>
      <div className="gallery-content-albums-container">
        <GalleryAlbumPreview title="ילדות ונעורים" folderName="childhood" />
        <GalleryAlbumPreview
          title="נעורים בירושלים: עלייה והתבגרות"
          folderName="GrowingUpInJerusalem"
        />
        <GalleryAlbumPreview title="שירות בצה״ל" folderName="Army" />
        <GalleryAlbumPreview title="שירות ביס״מ ירושלים" folderName="Police" />
        <GalleryAlbumPreview title="איש משפחה" folderName="family" />{' '}
        <GalleryAlbumPreview title="אופניים" folderName="bike" />
        <GalleryAlbumPreview title="מסביב לעולם" folderName="aroundTheWorld" />
        <GalleryAlbumPreview title="אומנות" folderName="art" />
      </div>
    </div>
  );
}
