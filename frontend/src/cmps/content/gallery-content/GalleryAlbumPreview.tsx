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
    const cachedImage = localStorage.getItem(`coverImage_${folderName}`);
    const cachedTimestamp = localStorage.getItem(
      `coverImageTimestamp_${folderName}`
    );

    const cachedExpiration = 24 * 60 * 60 * 1000; // Set the cache expiration to 24 hours
    const isCacheValid =
      cachedTimestamp &&
      Date.now() - Number(cachedTimestamp) < cachedExpiration;

    console.log(`Checking cache for folder: ${folderName}`);
    if (cachedImage && isCacheValid) {
      console.log('Using cached image:', cachedImage);
      setCoverImage(cachedImage);
    } else {
      // Fetch cover image from cloudinary and cache it if exists
      console.log('Cache expired or not found, fetching from API...');
      const result = await fetchCloudinaryCoverImage(folderName);

      if (result.success) {
        console.log('API fetch successful, updating cache.');
        setCoverImage(result.image);
        localStorage.setItem(`coverImage_${folderName}`, result.image);
        localStorage.setItem(
          `coverImageTimestamp_${folderName}`,
          Date.now().toString()
        );
      } else {
        console.log('API fetch failed, using default image.');
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
        alt={title}
        style={{ display: isImageLoaded ? 'block' : 'none' }}
      />
      <h1>{title}</h1>
    </div>
  );
}
