import Header from '../cmps/header/Header';
import MainContent from '../cmps/main-content/MainContent';
import Footer from '../cmps/footer/Footer';
import Gallery from '../cmps/gallery/Gallery';
import Memories from '../cmps/memories/MemoriesContent';
import AddMemoryForm from '../cmps/memories/AddMemoryForm';

interface ContentPageProps {
  content: 'main' | 'gallery' | 'memories' | 'add-memory';
}
export default function ContentPage({ content }: ContentPageProps) {
  return (
    <div className="content-page-container">
      <Header />
      <div className="content-container">
        {content === 'main' && <MainContent />}
        {content === 'gallery' && <Gallery />}
        {(content === 'memories' || content === 'main') && (
          <div className="content-page-memories">
            <Memories />
          </div>
        )}
        {content === 'add-memory' && <AddMemoryForm />}
      </div>
      <Footer />
    </div>
  );
}
