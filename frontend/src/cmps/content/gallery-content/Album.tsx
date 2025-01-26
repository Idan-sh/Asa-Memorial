import { useLocation, useNavigate, useParams } from 'react-router-dom';

import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import 'lightgallery/scss/lg-video.scss';

import { useCallback, useEffect, useState } from 'react';
import { CloudinaryImage } from '../../../models/CloudinaryImage.model';
import { fetchAlbumImages } from '../../../services/fetch.album.service';

import Loader from '../../global/Loader';
import ContentNotFound from '../content-not-found/ContentNotFound';

export default function Album() {
  const { folderName } = useParams();
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [title, setTitle] = useState<string>();

  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [isNotFound, setIsNotFound] = useState(false);

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
      setIsNotFound(true);
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
      setIsNotFound(true);
      return;
    }

    setIsLoading(true);
    setShowLoader(true);

    try {
      const result = await fetchAlbumImages(folderName);

      if (result) {
        setImages(result.images);
      } else {
        setImages([]);
      }
    } catch (err) {
      console.error('Failed to fetch album images:', err);
      setIsNotFound(true);
    } finally {
      setIsLoading(false);
      setShowLoader(false);
      setShowContent(true);
    }
  }, [folderName]);

  if (isNotFound) {
    return <ContentNotFound message="אלבום זה אינו קיים..." />;
  }

  if (showContent && images.length === 0) {
    return (
      <ContentNotFound
        message="אלבום זה ריק או נכשל להיטען..."
        goBackMessage="חזור לגלריה"
        goBack={() => navigate('/gallery')}
      />
    );
  }

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
                    alt={image.alt ?? 'album image'}
                  />
                </a>
              ))}
            </LightGallery>
          </div>
          <button onClick={goBack}> חזור </button>
        </>
      ) : null}
    </div>
  );
}
