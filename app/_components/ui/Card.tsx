import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import formatDate from '@/_utils/formatDate';
import { Category } from '@/_types/payload-types';

type Props = {
  title: string;
  slug: string;
  description: string;
  publishedDate: string;
  categories: Category[];
  coverImage: {
    type: 'external' | 'local';
    url: string;
    alt: string;
    localImage?: {
      url: string;
      alt?: string;
    } | null;
  };
};

export default function Card(props: Props) {
  const { title, slug, description, coverImage, categories, publishedDate } =
    props;

  const image =
    coverImage?.type === 'external'
      ? {
          src: coverImage?.url,
          alt: coverImage?.alt,
        }
      : {
          src: coverImage?.localImage?.url,
          alt: coverImage?.localImage?.alt,
        };

  return (
    <article className='flex flex-col gap-3 px-4'>
      <div className='flex gap-2 text-sm font-medium text-foreground/70'>
        <a href={`/category/${categories[0]?.title}`}>
          <span className='font-normal capitalize transition-colors duration-300 hover:text-accent'>
            {categories[0]?.title}
          </span>
        </a>
        <span>-</span>
        {publishedDate && <span>{formatDate(publishedDate)}</span>}
      </div>
      <h2 className='font-sans text-2xl font-normal text-foreground transition-colors duration-300 hover:text-accent md:text-3xl'>
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h2>
      {image?.src && (
        <Image
          src={image?.src}
          alt={image?.alt as string}
          loading='lazy'
          sizes='100vw'
          className='order-[-1]  rounded-md'
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
