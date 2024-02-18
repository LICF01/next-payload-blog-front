import { Post } from '@/_types/payload-types';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { isMedia, isPost } from '@/_utils/typeguards';

export default function RelatedPosts({ docs }: { docs: Post['relatedPosts'] }) {
  return (
    <section
      aria-labelledby='related-title'
      className='mt-4 space-y-8 border-t-[1px] border-foreground/10 pt-8'
    >
      <h2 id='related-title' className='text-center font-sans text-4xl'>
        Related Posts
      </h2>
      <div className='flex flex-row justify-center gap-10'>
        {Array.isArray(docs) &&
          docs.filter(isPost).map(({ title, slug, coverImage }) => (
            <article key={slug} className='flex flex-col gap-4'>
              <h2 className='font-sans text-xl font-normal text-foreground transition-colors duration-300 hover:text-accent md:text-3xl'>
                <Link href={`/blog/${slug}`}>{title}</Link>
              </h2>
              {coverImage && isMedia(coverImage) && (
                <div className='relative order-[-1] h-80 w-96 '>
                  <Image
                    src={'http://localhost:4000' + coverImage.url}
                    alt={coverImage.alt}
                    loading='lazy'
                    className='rounded-md'
                    sizes='100vw'
                    fill
                  />
                </div>
              )}
            </article>
          ))}
      </div>
    </section>
  );
}
