import { useCallback, useEffect, useState } from 'react';
import { fetchAlbumImages } from '../../../services/fetch.album.service';
import ContentNotFound from '../content-not-found/ContentNotFound';
import Loader from '../../global/Loader';

import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import 'lightgallery/scss/lg-video.scss';

import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { CloudinaryImage } from '../../../models/CloudinaryImage.model';

export default function MomentsContent() {
  const momentsAlbumName = 'Moments';

  const [momentsImages, setMomentsImages] = useState<CloudinaryImage[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
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
    }, 100);

    return () => {
      clearTimeout(loaderTimer);
    };
  }, [isLoading]);

  const updateImages = useCallback(async () => {
    setIsLoading(true);
    setShowLoader(true);

    try {
      const result = await fetchAlbumImages(momentsAlbumName);

      if (result) {
        setMomentsImages(result.images);
      } else {
        setMomentsImages([]);
      }
    } catch (err) {
      console.error('Failed to fetch album images:', err);
      setIsNotFound(true);
    } finally {
      setIsLoading(false);
      setShowLoader(false);
      setShowContent(true);
    }
  }, [momentsAlbumName]);

  const onInstagramClick = () => {
    window.open('https://www.instagram.com/asagilad/', '_blank');
  };

  return (
    <div className="moments-content-container">
      <h2>רגעים של אסא</h2>
      <div className="moments-content-images-container">
        {isNotFound && <ContentNotFound message="טעינת התמונות נכשלה..." />}
        {!isNotFound &&
          (showLoader ? (
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
                  {momentsImages.map((image) => (
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
            </>
          ) : null)}
      </div>
      <div
        className="moments-content-instagram-link "
        onClick={onInstagramClick}
      >
        <img src="/icons/instagram.png" width="50px" alt="Instagram icon" />
        <p>asagilad</p>
      </div>
    </div>
  );
}
