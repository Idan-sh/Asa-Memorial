import { useParams } from 'react-router-dom';

export default function Album() {
  const { albumId } = useParams();

  return (
    <div className="album-container">
      <h2>Album {albumId}</h2>
      <div></div>
    </div>
  );
}
