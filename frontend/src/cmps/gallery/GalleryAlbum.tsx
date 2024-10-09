import { useNavigate } from 'react-router-dom';
import defaultImg from '/imgs/defaultAlbumImg.jpeg';

interface GalleryAlbumProps {
  title: string;
  id: string;
}

export default function GalleryAlbum({ title, id }: GalleryAlbumProps) {
  const navigate = useNavigate();

  const goToAlbum = () => navigate('/album/' + id);

  return (
    <div className="gallery-album-container" onClick={goToAlbum}>
      <img src={defaultImg} />
      <h1>{title}</h1>
    </div>
  );
}
