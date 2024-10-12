import { useParams } from 'react-router-dom';
import LightGallery from 'lightgallery/react';

import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import 'lightgallery/scss/lg-video.scss';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

export default function Album() {
  const { albumId } = useParams();

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
        <a href="/imgs/gallery/gallery-bike1.JPG" data-lg-size="1600-2400">
          <img alt="img1" src="/imgs/gallery/gallery-bike1.JPG" />
        </a>
        <a href="/imgs/gallery/gallery-bike2.JPG">
          <img alt="img2" src="/imgs/gallery/gallery-bike2.JPG" />
        </a>
      </LightGallery>
    </div>
  );
}
