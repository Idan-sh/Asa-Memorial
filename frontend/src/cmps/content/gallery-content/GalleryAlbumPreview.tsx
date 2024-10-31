import { useNavigate } from 'react-router-dom';
import defaultImg from '/imgs/defaultAlbumImg.jpeg';
import { useCallback, useEffect, useState } from 'react';
import { fetchCloudinaryCoverImage } from '../../../services/fetch.cloudinary.service';

interface GalleryAlbumProps {
  title: string;
  folderName: string;
}

export default function GalleryAlbum({ title, folderName }: GalleryAlbumProps) {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [coverImage, setCoverImage] = useState<string | undefined>();

  const goToAlbum = () =>
    navigate('/album/' + folderName, {
      state: { success: true, title: title },
    });

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    updateCoverImage();
  }, []);

  const updateCoverImage = useCallback(async () => {
    const result = await fetchCloudinaryCoverImage(folderName);

    if (result.success) {
      setCoverImage(result.image);
    } else {
      setCoverImage(defaultImg);
    }
  }, []);

  return (
    <div className="gallery-album-container" onClick={goToAlbum}>
      {!isImageLoaded && <div className="image-placeholder"></div>}
      <img
        src={coverImage}
        onLoad={handleImageLoad}
        alt={title}
        style={{ display: isImageLoaded ? 'block' : 'none' }}
      />
      <h1>{title}</h1>
    </div>
  );
}
