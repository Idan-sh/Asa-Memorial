import { useNavigate } from 'react-router-dom';
import defaultImg from '/imgs/defaultAlbumImg.jpeg';
import { useCallback, useEffect, useState } from 'react';
import { fetchAlbumCoverImage } from '../../../services/fetch.album.service';

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
    const cachedImage = localStorage.getItem(`coverImage_${folderName}`);
    const cachedTimestamp = localStorage.getItem(
      `coverImageTimestamp_${folderName}`
    );

    const cachedExpiration = 24 * 60 * 60 * 1000; // Set the cache expiration to 24 hours
    const isCacheValid =
      cachedTimestamp &&
      Date.now() - Number(cachedTimestamp) < cachedExpiration;

    if (cachedImage && isCacheValid) {
      setCoverImage(cachedImage);
    } else {
      // Fetch cover image from cloudinary and cache it if exists
      const result = await fetchAlbumCoverImage(folderName);

      if (result) {
        setCoverImage(result.image);
        localStorage.setItem(`coverImage_${folderName}`, result.image);
        localStorage.setItem(
          `coverImageTimestamp_${folderName}`,
          Date.now().toString()
        );
      } else {
        setCoverImage(defaultImg);
      }
    }
  }, []);

  return (
    <div className="gallery-album-container" onClick={goToAlbum}>
      {!isImageLoaded && <div className="image-placeholder"></div>}
      <img
        src={coverImage}
        onLoad={handleImageLoad}
        alt={'gallery album ' + title}
        style={{ display: isImageLoaded ? 'block' : 'none' }}
      />
      <footer>{title}</footer>
    </div>
  );
}
