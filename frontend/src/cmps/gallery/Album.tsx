import { useParams } from 'react-router-dom';
import LightGallery from 'lightgallery/react';

import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import 'lightgallery/scss/lg-video.scss';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { useCallback, useEffect, useState } from 'react';
import { fetchCloudinaryImage as fetchCloudinaryImages } from '../../services/fetch.cloudinary.service';

interface Image {
  url: string;
  public_id: string;
  width: number;
  height: number;
}

export default function Album() {
  const { albumId } = useParams();
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    updateImages();
  }, []);

  const updateImages = useCallback(async () => {
    // Fetch images from the backend API
    const result = await fetchCloudinaryImages('bike'); // TODO: Change to the read album name

    if (result.success) {
      setImages(result.images || []);
    } else {
      console.error('Could not fetch Cloudinary images...');
    }
  }, []);

  return (
    <div className="album-container">
      <h2>Album {albumId}</h2>
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
            data-sub-html={`<h4>${image.public_id}</h4>`}
          >
            <img
              className="img-responsive"
              src={image.url}
              alt={image.public_id}
              style={{ maxWidth: '300px', margin: '10px' }}
            />
          </a>
        ))}
        {/* <a href="/imgs/gallery/gallery-bike1.JPG" data-lg-size="1600-2400">
          <img alt="img1" src="/imgs/gallery/gallery-bike1.JPG" />
        </a>
        <a href="/imgs/gallery/gallery-bike2.JPG">
          <img alt="img2" src="/imgs/gallery/gallery-bike2.JPG" />
        </a> */}
      </LightGallery>
    </div>
  );
}
