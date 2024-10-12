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
  alt?: string;
  description?: string;
}

export default function Album() {
  const { albumId } = useParams();
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    updateImages();
  }, []);

  const updateImages = useCallback(async () => {
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
      <div className='light-gallery-container'>
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
              <img className="img-responsive" src={image.url} alt={image.alt} />
            </a>
          ))}
        </LightGallery>
      </div>
    </div>
  );
}
