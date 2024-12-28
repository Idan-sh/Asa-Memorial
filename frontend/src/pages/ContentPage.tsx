import Header from '../cmps/header/Header';
import Footer from '../cmps/footer/Footer';

import MainContent from '../cmps/content/main-content/MainContent';
import InstagramContent from '../cmps/content/instagram-content/InstagramContent';
import ContentNotFound from '../cmps/content/content-not-found/ContentNotFound';

import GalleryContent from '../cmps/content/gallery-content/GalleryContent';
import Album from '../cmps/content/gallery-content/Album';

import FullMemoryContent from '../cmps/content/memories-content/FullMemoryContent';
import MemoriesContent from '../cmps/content/memories-content/MemoriesContent';
import AddMemoryForm from '../cmps/content/memories-content/AddMemoryForm';
import EulogiesContent from '../cmps/content/eulogies-content/EulogiesContent';

interface ContentPageProps {
  content:
    | 'main'
    | 'gallery'
    | 'memories'
    | 'add-memory'
    | 'memory'
    | 'not-found'
    | 'album'
    | 'eulogies';
}
export default function ContentPage({ content }: ContentPageProps) {
  return (
    <div className="content-page-container">
      <Header />
      <main className="content-container">
        {content === 'main' && (
          <>
            <MainContent />
            <MemoriesContent limit={6} />
            <InstagramContent />
          </>
        )}
        {content === 'gallery' && <GalleryContent />}
        {content === 'memories' && <MemoriesContent />}
        {content === 'add-memory' && <AddMemoryForm />}
        {content === 'memory' && <FullMemoryContent />}
        {content === 'not-found' && <ContentNotFound />}
        {content === 'album' && <Album />}
        {content === 'eulogies' && <EulogiesContent />}
      </main>
      <Footer />
    </div>
  );
}
