import React from 'react';
import { ProfileImage, ProfileImageProps } from './ProfileImage';

export { ProfileImage };
export type { ProfileImageProps };

export const HeroAvatar: React.FC = () => {
  return (
    <ProfileImage
      src="/avatar.webp"
      alt="Prince Raj"
      floatDistance={14}
      glowColor="#00FFFF"
    />
  );
};

export default HeroAvatar;
