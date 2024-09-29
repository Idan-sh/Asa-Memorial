import Header from '../cmps/header/Header';
import MainContent from '../cmps/main-content/MainContent';
import Footer from '../cmps/footer/Footer';
import Menu from '../cmps/menu/Menu';
import Gallery from '../cmps/gallery/Gallery';
import Memories from '../cmps/memories/Memories';
import { useScreenSize } from '../context/ScreenSizeProvider';

interface ContentPageProps {
  content: 'main' | 'gallery' | 'memories';
}
export default function ContentPage({ content }: ContentPageProps) {
  const { isMobile } = useScreenSize();

  return (
    <div className="content-page-container">
      <Header />
      {!isMobile && <Menu />}
      <div className="content-container">
        {content === 'main' && <MainContent />}
        {content === 'gallery' && <Gallery />}
        {content === 'memories' && <Memories />}
      </div>
      <Footer />
    </div>
  );
}
