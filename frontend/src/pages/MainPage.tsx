import Header from '../cmps/header/Header';
import Content from '../cmps/content/Content';
import Footer from '../cmps/footer/Footer';
import Menu from '../cmps/menu/Menu';

export default function MainPage() {
  return (
    <div className="main-page-container">
      <Header />
      <Menu />
      <Content />
      <Footer />
    </div>
  );
}
