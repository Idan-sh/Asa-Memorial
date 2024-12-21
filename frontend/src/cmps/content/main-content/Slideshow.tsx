import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { CloudinaryImage } from '../../../models/CloudinaryImage.model';
import { useCallback, useEffect, useState } from 'react';
import { fetchAlbumImages } from '../../../services/fetch.album.service';
import Loader from '../../global/Loader';

const slideshowCloudinaryFolderName = import.meta.env
  .VITE_CLOUDIRAY_SLIDESHOW_FOLDER_NAME;

export default function Slideshow() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    updateImages();
  }, []);

  useEffect(() => {
    // Delay the loader display
    const loaderTimer = setTimeout(() => {
      if (isLoading) {
        setShowLoader(true);
      }
    }, 200);

    return () => {
      clearTimeout(loaderTimer);
    };
  }, [isLoading]);

  const updateImages = useCallback(async () => {
    const result = await fetchAlbumImages(slideshowCloudinaryFolderName);

    if (result) {
      setImages(result.images || []);
    } else {
      console.error('Could not fetch Cloudinary images...');
    }

    setIsLoading(false);
    setShowLoader(false);
    setShowContent(true);
  }, []);

  if (!showLoader && !isLoading && images.length === 0) {
    return (
      <div className="slideshow-error-container">
        <p>טעינת ה-slideshow נכשלה...</p>
      </div>
    );
  }

  return (
    <div className="slideshow-container">
      {showLoader ? (
        <Loader />
      ) : showContent && images.length > 0 ? (
        <Fade duration={2000}>
          {images.map((image) => (
            <div className="each-slide" key={image.public_id}>
              <img src={image.url} alt={image.alt ?? 'slide image'} />
            </div>
          ))}
        </Fade>
      ) : null}
    </div>
  );
}
