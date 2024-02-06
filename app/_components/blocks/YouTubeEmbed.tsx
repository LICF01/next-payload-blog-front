'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function YouTubeEmbed(props) {
  const { id, title } = props
  const [showVideo, setShowVideo] = useState(false)
  return (
    <div>
      {showVideo ? (
        <iframe
          title={title || 'Youtube video'}
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          width={560}
          height={315}
          frameBorder={0}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          className='aspect-[16/9] h-full w-full p-0'
        />
      ) : (
        <div className='group relative  aspect-[16/9] w-full cursor-pointer bg-red-400'>
          <Image
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt=''
            width={560}
            height={315}
            className='h-full w-full opacity-80'
            style={{ objectFit: 'cover', margin: 0 }}
            onClick={() => setShowVideo(true)}
          />
        </div>
      )}
    </div>
  )
}
