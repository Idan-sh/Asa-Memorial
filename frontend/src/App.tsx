import './assets/styles/main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContentPage from './pages/ContentPage';
import ScrollToTop from './cmps/global/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContentPage content="main" />} />
        <Route path="/gallery" element={<ContentPage content="gallery" />} />
        <Route path="/memories" element={<ContentPage content="memories" />} />
        <Route
          path="/add-memory"
          element={<ContentPage content="add-memory" />}
        />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
