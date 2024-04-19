'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const PlayerImage = ({ src }) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setImageSrc('/images/noimage.webp');
  };

  return <Image unoptimized src={imageSrc} width={46} height={42} alt="선수 이미지" quality={70} onError={handleError} />;
};

export default PlayerImage;
