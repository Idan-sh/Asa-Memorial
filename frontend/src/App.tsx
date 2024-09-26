import './assets/styles/main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContentPage from './pages/ContentPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContentPage content="main" />} />
        <Route path="/gallery" element={<ContentPage content="gallery" />} />
        <Route path="/memories" element={<ContentPage content="memories" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
