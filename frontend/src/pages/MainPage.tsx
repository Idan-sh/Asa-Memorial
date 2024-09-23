import Header from '../cmps/header/Header';
import Content from '../cmps/content/Content';
import Sidebar from '../cmps/sidebar/Sidebar';
import Footer from '../cmps/footer/Footer';

export default function MainPage() {
  return (
    <div className="main-page-container">
      <Header />
      <Sidebar />
      <Content />
      <Footer />
    </div>
  );
}
