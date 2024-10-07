import Header from '../cmps/header/Header';
import MainContent from '../cmps/main-content/MainContent';
import Footer from '../cmps/footer/Footer';
import Gallery from '../cmps/gallery/Gallery';
import Memories from '../cmps/memories/MemoriesContent';
import AddMemoryForm from '../cmps/memories/AddMemoryForm';
import FullMemoryContent from '../cmps/memories/FullMemoryContent';
import ContentNotFound from '../cmps/content-not-found/ContentNotFound';

interface ContentPageProps {
  content:
    | 'main'
    | 'gallery'
    | 'memories'
    | 'add-memory'
    | 'memory'
    | 'not-found';
}
export default function ContentPage({ content }: ContentPageProps) {
  return (
    <div className="content-page-container">
      <Header />
      <div className="content-container">
        {content === 'main' && (
          <>
            <MainContent />
            <Memories limit={6} />
          </>
        )}
        {content === 'gallery' && <Gallery />}
        {content === 'memories' && <Memories />}
        {content === 'add-memory' && <AddMemoryForm />}
        {content === 'memory' && <FullMemoryContent />}
        {content === 'not-found' && <ContentNotFound />}
      </div>
      <Footer />
    </div>
  );
}
