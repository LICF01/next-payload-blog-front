import { fetchDoc } from '@/_api/fetchDoc';
import { fetchDocs } from '@/_api/fetchDocs';
import { Post } from '@/_types/payload-types';
import RenderBlocks from '@/_utils/RenderBlocks';
import Image from 'next/image';

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

  console.log('doc', doc);
  return (
    <section className='prose prose-red w-full max-w-none pt-24 dark:prose-invert md:prose-lg lg:prose-2xl prose-headings:font-sans prose-headings:font-normal prose-img:m-0'>
      <div className='mx-auto max-w-6xl'>
        <h1 className='text-center'>{doc.title}</h1>
      </div>

      {doc.coverImage.url && (
        <div className=' relative mx-auto flex  h-[580px] justify-center '>
          <Image
            className='rounded-md object-cover'
            src={doc.coverImage.url}
            alt={doc.coverImage.alt || 'Cover Image'}
            fill
            loading='lazy'
            sizes='100vw'
          />
        </div>
      )}

      <div className='mx-auto mt-12 max-w-3xl'>
        <RenderBlocks layout={doc.layout} />;
      </div>
    </section>
  );
}
