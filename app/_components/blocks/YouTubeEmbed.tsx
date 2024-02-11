'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from 'react-aria-components';

import { PlayCircle } from 'lucide-react';

type YouTubeEmbedProps = {
  id: string | null;
  title: string;
  description?: string | null;
  blockName?: string | null;
  blockType: 'hero';
};

export default function YouTubeEmbed(props: YouTubeEmbedProps) {
  const { id, title } = props;
  const [showVideo, setShowVideo] = useState(false);
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
        <div className='group relative flex aspect-[16/9] w-full  cursor-pointer items-center justify-center'>
          <Image
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt=''
            width={560}
            height={315}
            className='h-full w-full opacity-80 filter'
            style={{ objectFit: 'cover', margin: 0 }}
            onClick={() => setShowVideo(true)}
          />
          <Button className='absolute rounded-full bg-accent text-background'>
            <PlayCircle size={72} strokeWidth={1} />
          </Button>
        </div>
      )}
    </div>
  );
}
