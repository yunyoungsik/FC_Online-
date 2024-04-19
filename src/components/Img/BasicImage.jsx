import React from 'react'
import Image from 'next/image';

const BasicImage = ({ src, width, height, alt, quality }) => {
  return <Image unoptimized src={src} width={width} height={height} alt={alt} quality={quality} />;
}

export default BasicImage