import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import formatDate from '@/_utils/formatDate';
import { Post } from '@/_types/payload-types';
import { isCategory, isMedia } from '@/_utils/typeguards';

export default function Card({ data }: { data: Post }) {
  const { title, slug, description, coverImage, categories, publishedDate } =
    data;

  return (
    <article className='flex flex-col gap-2'>
      <div className='flex gap-2 text-sm font-medium text-foreground/70'>
        {categories[0] && isCategory(categories[0], 'title') && (
          <Link
            href={`/category/${categories[0]?.title}`}
            className='link lowercase'
          >
            <span>{categories[0]?.title}</span>
          </Link>
        )}
        <span>-</span>
        {publishedDate && <span>{formatDate(publishedDate)}</span>}
      </div>
      <h2 className='font-sans text-2xl font-normal text-foreground'>
        <Link href={`/blog/${slug}`} className='title'>
          {title}
        </Link>
      </h2>
      {coverImage && isMedia(coverImage) && (
        <Image
          src={'http://localhost:4000' + coverImage.url}
          alt={coverImage.alt}
          loading='lazy'
          sizes='100vw'
          className='order-[-1]  min-h-[300px] rounded-md'
          objectFit='cover'
          width={500}
          height={300}
        />
      )}
      <p className='text-md line-clamp-3 font-serif font-light text-foreground/70  duration-500'>
        {description}
      </p>
    </article>
  );
}
