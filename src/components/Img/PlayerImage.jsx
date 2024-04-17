'use client'

import React, { useState } from 'react'
import Image from 'next/image';

const PlayerImage = ({src}) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setImageSrc("/images/noimage.webp");
  }

  return (
    <Image src={imageSrc} width={46} height={42} alt='선수 이미지' onError={handleError} />
  )
}

export default PlayerImage