'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const PlayerImage2 = ({ src }) => {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleError = () => {
    setImageSrc('/images/noimage.webp');
  };

  return <Image unoptimized src={imageSrc} width={46} height={42} quality={70} alt="선수 이미지" onError={handleError} />;
};

export default PlayerImage2;
