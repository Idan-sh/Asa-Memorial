import LifeStory from './LifeStory';
import RememberingSection from './RememberingSection';
import Slideshow from './Slideshow';
import { FacebookProvider, EmbeddedPost } from 'react-facebook';

export default function MainContent() {
  return (
    <div className="main-content-container">
      <h2 className="main-content-sentence-title">"placeholder sentence"</h2>
      <Slideshow />
      <h2 className="main-content-years-title">1900-2010</h2>
      <RememberingSection />

      <div className="main-content-life-story">
        <h2>סיפור חייו</h2>
        <LifeStory />
      </div>

      <div className="main-content-facebook-container">
        <FacebookProvider appId="1102227711302102|Ikpdt9lI4zERCdhD92zAMXeVmMo">
          {/** Template for posts: https://www.facebook.com/asa.gilad/posts/{POST_ID_NUMBERS}?fref=nf&ref=embed_post **/}
          <EmbeddedPost
            href="https://www.facebook.com/asa.gilad/posts/10155343599862060?fref=nf&ref=embed_post"
            width="300"
          />
          <EmbeddedPost
            href="https://www.facebook.com/asa.gilad/posts/10154770477692060?fref=nf&ref=embed_post"
            width="300"
          />
        </FacebookProvider>
      </div>
    </div>
  );
}
