import { FacebookProvider, EmbeddedPost } from 'react-facebook';
import { useEffect, useState } from 'react';

export default function FacebookContent() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Delay rendering to ensure DOM readiness
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <></>;
  }

  return (
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
  );
}
