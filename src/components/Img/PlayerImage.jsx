'use client'

import React, { useState } from 'react'
import Image from 'next/image';

const PlayerImage = ({src}) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setImageSrc("/images/noimage.png");
  }

  return (
    <Image src={imageSrc} width={169} height={169} alt='선수 이미지' onError={handleError} />
  )
}

export default PlayerImage