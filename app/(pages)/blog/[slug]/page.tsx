import { fetchDoc } from '@/_api/fetchDoc';
import { fetchDocs } from '@/_api/fetchDocs';
import RelatedPosts from '@/_components/blog/RelatedPosts';
import { IconButton } from '@/_components/ui/IconButton';
import { Media, Post } from '@/_types/payload-types';
import RenderBlocks from '@/_utils/RenderBlocks';
import formatDate from '@/_utils/formatDate';
import { isCategory, isMedia } from '@/_utils/typeguards';
import { ArrowDownCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'react-aria-components';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const doc = await fetchDoc<Post>({
    collection: 'posts',
    slug: params.slug,
  });

  return {
    title: doc.meta?.title,
    description: doc.meta?.description,
    openGraph: {
      images: [
        {
          url: isMedia(doc.meta?.image || '')
            ? ((doc.meta?.image as Media).url as string)
            : '',
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  try {
    const docs = await fetchDocs<Post>('postsSlugs');
    return docs?.map(({ slug }) => ({
      slug,
    }));
  } catch (error) {
    return [];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const doc = await fetchDoc<Post>({
    collection: 'posts',
    slug: params.slug,
  });

  return (
    <>
      <section className='prose prose-lg prose-red w-full max-w-none pt-24 dark:prose-invert prose-headings:font-sans prose-headings:font-normal prose-a:text-accent prose-a:underline prose-a:decoration-accent/30 prose-a:underline-offset-8 prose-img:m-0'>
        <div className='mx-auto mb-12 flex max-w-6xl flex-col items-center justify-center gap-10'>
          <h1 className='text-center'>{doc.title}</h1>

          <div className='flex justify-center gap-2 font-sans text-sm font-medium text-foreground/70'>
            {isCategory(doc.categories[0], 'title') && (
              <>
                <Link
                  href={`/category/${doc.categories[0]?.title}`}
                  className='link lowercase'
                >
                  <span>{doc.categories[0]?.title}</span>
                </Link>
                <span>-</span>
              </>
            )}
            {doc.publishedDate && <span>{formatDate(doc.publishedDate)}</span>}
          </div>

          <IconButton
            as='a'
            icon={<ArrowDownCircle size={38} strokeWidth={1} />}
            href='#content'
            passHref={true}
            aria-label='Scroll to content'
          />
        </div>

        {doc.coverImage && isMedia(doc.coverImage) && (
          <Image
            className='max-h-screen rounded-md object-cover'
            src={'http://localhost:4000' + doc.coverImage.url}
            alt={doc.coverImage.alt || 'Cover Image'}
            loading='lazy'
            objectFit='cover'
            height={580}
            width={1200}
          />
        )}

        <div id='content' className='mx-auto mb-24 mt-12 max-w-3xl '>
          <RenderBlocks layout={doc.layout} />
        </div>
      </section>
      {doc.relatedPosts && doc.relatedPosts.length > 0 && (
        <RelatedPosts docs={doc.relatedPosts} />
      )}
    </>
  );
}
