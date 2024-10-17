import { useNavigate } from 'react-router-dom';
import defaultImg from '/imgs/defaultAlbumImg.jpeg';
import { useState } from 'react';

interface GalleryAlbumProps {
  title: string;
  folderName: string;
}

export default function GalleryAlbum({ title, folderName }: GalleryAlbumProps) {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const goToAlbum = () =>
    navigate('/album/' + folderName, {
      state: { success: true, title: title },
    });

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="gallery-album-container" onClick={goToAlbum}>
      {!isImageLoaded && <div className="image-placeholder"></div>}
      <img
        src={defaultImg}
        onLoad={handleImageLoad}
        alt={title}
        style={{ display: isImageLoaded ? 'block' : 'none' }}
      />
      <h1>{title}</h1>
    </div>
  );
}
