import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import backButtonAnimation from '../../assets/animations/back-button-animation.json';
import { useRef } from 'react';

interface GoBackButtonProps {
  onGoBackClick: () => void;
}
export default function GoBackButton({ onGoBackClick }: GoBackButtonProps) {
  const backButtonLottieRef = useRef<LottieRefCurrentProps>(null);

  const onClick = () => {
    backButtonLottieRef.current?.playSegments([80, 110], true);
    setTimeout(onGoBackClick, 500);
  };

  const handleMouseEnter = () => {
    backButtonLottieRef.current?.playSegments([30, 60], true);
  };

  const handleMouseLeave = () => {
    backButtonLottieRef.current?.playSegments([130, 200], true);
  };

  return (
    <div
      className="back-button-container"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Lottie
        lottieRef={backButtonLottieRef}
        animationData={backButtonAnimation}
        loop={false}
        autoplay={false}
        style={{
          width: '140px',
          height: 'auto',
          cursor: 'pointer',
        }}
      />
    </div>
  );
}
