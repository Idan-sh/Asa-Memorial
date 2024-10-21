import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { CloudinaryImage } from '../../../models/CloudinaryImage.model';
import { useCallback, useEffect, useState } from 'react';
import { fetchCloudinaryImages } from '../../../services/fetch.cloudinary.service';
import Loader from '../../global/Loader';

const slideshowCloudinaryFolderName = import.meta.env
  .VITE_CLOUDIRAY_SLIDESHOW_FOLDER_NAME;

export default function Slideshow() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
    const result = await fetchCloudinaryImages(slideshowCloudinaryFolderName);

    if (result.success) {
      setImages(result.images || []);
    } else {
      console.error('Could not fetch Cloudinary images...');
    }

    setIsLoading(false);
    setShowLoader(false);
    setShowContent(true);
  }, []);

  return (
    <div className="slideshow-container">
      {showLoader ? (
        <Loader />
      ) : showContent ? (
        <Fade duration={2000}>
          {images.map((image) => (
            <div className="each-slide" key={image.public_id}>
              <img src={image.url} alt={image.alt} />
            </div>
          ))}
        </Fade>
      ) : null}
    </div>
  );
}
