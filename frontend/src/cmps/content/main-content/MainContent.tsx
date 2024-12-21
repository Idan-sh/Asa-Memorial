import LifeStory from './LifeStory';
import RememberingSection from './RememberingSection';
import Slideshow from './Slideshow';

export default function MainContent() {
  return (
    <div className="main-content-container">
      <h2 className="main-content-sentence-title">
        "כל עוד מישהו זוכר אותי, אני חי"
      </h2>
      <Slideshow />
      <h2 className="main-content-years-title">1964-2021</h2>
      <RememberingSection />

      <div className="main-content-life-story">
        <h2>סיפור חייו</h2>
        <LifeStory />
      </div>

      {/* <div className="main-content-facebook-container">
        <FacebookContent />
      </div> */}
    </div>
  );
}
