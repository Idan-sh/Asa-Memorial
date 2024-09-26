import Header from '../cmps/header/Header';
import MainContent from '../cmps/main-content/MainContent';
import Footer from '../cmps/footer/Footer';
import Menu from '../cmps/menu/Menu';
import Gallery from '../cmps/gallery/Gallery';
import Memories from '../cmps/memories/Memories';

interface ContentPageProps {
  content: 'main' | 'gallery' | 'memories';
}
export default function ContentPage({ content }: ContentPageProps) {
  return (
    <div className="content-page-container">
      <Header />
      <Menu />
      {content === 'main' && <MainContent />}
      {content === 'gallery' && <Gallery />}
      {content === 'memories' && <Memories />}
      <Footer />
    </div>
  );
}
