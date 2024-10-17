import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LightGallery from 'lightgallery/react';

import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import 'lightgallery/scss/lg-video.scss';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { useCallback, useEffect, useState } from 'react';
import { fetchCloudinaryImage as fetchCloudinaryImages } from '../../../services/fetch.cloudinary.service';

import GoBackButton from '../../global/GoBackButton';
import Loader from '../../global/Loader';

interface Image {
  url: string;
  public_id: string;
  width: number;
  height: number;
  alt?: string;
  description?: string;
}

export default function Album() {
  const { folderName } = useParams();
  const [images, setImages] = useState<Image[]>([]);
  const [title, setTitle] = useState<string>();

  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => navigate('/gallery');

  useEffect(() => {
    // Delay the loader display
    const loaderTimer = setTimeout(() => {
      if (isLoading) {
        setShowLoader(true);
      }
    }, 100);

    return () => {
      clearTimeout(loaderTimer);
    };
  }, [isLoading]);

  useEffect(() => {
    if (location.state?.title) {
      setTitle(location.state.title);
    } else {
      console.warn('Could not receive album title from location...');
    }
  }, [location.state]);

  useEffect(() => {
    if (title) {
      setIsLoading(true);
      updateImages();
    }
  }, [title]);

  const updateImages = useCallback(async () => {
    if (!folderName) {
      console.log('No folderName provided in the route params...');
      return;
    }

    const result = await fetchCloudinaryImages(folderName);

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
    <div className="album-container">
      <h2>{title}</h2>
      {showLoader ? (
        <Loader />
      ) : showContent ? (
        <>
          <div className="light-gallery-container">
            <LightGallery
              speed={500}
              plugins={[lgThumbnail, lgZoom]}
              mode="lg-fade"
              zoomFromOrigin={false}
              download={false}
              thumbnail={false}
              zoom={false}
            >
              {images.map((image) => (
                <a
                  key={image.public_id}
                  data-src={image.url}
                  data-sub-html={`<h3 class="sub-html-title">${image.description}</h3>`}
                >
                  <img
                    className="img-responsive"
                    src={image.url}
                    alt={image.alt}
                  />
                </a>
              ))}
            </LightGallery>
          </div>
          <GoBackButton onGoBackClick={goBack} />
        </>
      ) : null}
    </div>
  );
}
