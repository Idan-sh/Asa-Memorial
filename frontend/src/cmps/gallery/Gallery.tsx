import GalleryAlbum from './GalleryAlbum';

export default function Gallery() {
  return (
    <div className="gallery-content-container">
      <h2>גלריה</h2>
      <div className="gallery-content-albums-container">
        <GalleryAlbum title="Some Album" id="1" />
        <GalleryAlbum title="Some Album" id="2" />
        <GalleryAlbum title="Some Album" id="3" />
        <GalleryAlbum title="Some Album" id="4" />
        <GalleryAlbum title="Some Album" id="5" />
        <GalleryAlbum title="Some Album" id="6" />
      </div>
    </div>
  );
}
