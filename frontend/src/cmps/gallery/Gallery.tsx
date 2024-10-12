import GalleryAlbum from './GalleryAlbum';

export default function Gallery() {
  return (
    <div className="gallery-content-container">
      <h2>גלריה</h2>
      <div className="gallery-content-albums-container">
        <GalleryAlbum title="אופניים" folderName="bike" />
        <GalleryAlbum title="משפחה" folderName="family" />
      </div>
    </div>
  );
}
