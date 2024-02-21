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
          <a href={`/category/${categories[0]?.title}`}>
            <span className='font-normal capitalize transition-colors duration-300 hover:text-accent'>
              {categories[0]?.title}
            </span>
          </a>
        )}
        <span>-</span>
        {publishedDate && <span>{formatDate(publishedDate)}</span>}
      </div>
      <h2 className='font-sans text-2xl font-normal text-foreground transition-colors duration-300 hover:text-accent md:text-3xl'>
        <Link href={`/blog/${slug}`}>{title}</Link>
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
