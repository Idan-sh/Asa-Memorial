import { Player } from '@lordicon/react';
import searchAnimated from '../../../assets/animations/search-animated.json';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimationDirection } from 'lottie-web';

export default function ContentNotFound() {
  const playerRef = useRef<Player>(null);
  const [animationDirection, setAnimationDirection] =
    useState<AnimationDirection>(-1);

  const navigate = useNavigate();
  const goToMainContent = () => navigate('/');

  useEffect(() => {
    playerRef.current?.play();
  }, [animationDirection]);

  const flipAnimationDirection = () => {
    setTimeout(
      () => setAnimationDirection(animationDirection === -1 ? 1 : -1),
      2000
    );
  };

  return (
    <div className="content-not-found-container">
      <Player
        size={140}
        ref={playerRef}
        icon={searchAnimated}
        direction={animationDirection}
        onReady={flipAnimationDirection}
        onComplete={flipAnimationDirection}
      />
      <p>הדף שחיפשת לא נמצא...</p>
      <button onClick={goToMainContent}>חזור לדף הבית</button>
    </div>
  );
}
