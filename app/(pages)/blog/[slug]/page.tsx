import { fetchDoc } from '@/_api/fetchDoc';
import { fetchDocs } from '@/_api/fetchDocs';
import RichText from '@/_components/blocks/RichText';
import { Post } from '@/_types/payload-types';
import RenderBlocks from '@/_utils/RenderBlocks';

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
    <section className='prose prose-red dark:prose-invert prose-headings:font-normal prose-headings:font-sans md:prose-lg lg:prose-2xl w-full max-w-none pt-24'>
      <div className='mx-auto max-w-6xl'>
        <h1 className='text-center'>{doc.title}</h1>
      </div>

      <div className='mx-auto mt-12 max-w-3xl'>
        <RenderBlocks layout={doc.layout} />;
      </div>
    </section>
  );
}

// {coverImage.url && (
//   <div className=' relative mx-auto flex  h-[580px] justify-center overflow-hidden'>
//     <image
//       className='h-full w-screen object-cover'
//       src={coverImage.url}
//       alt={coverImage.alt || 'Cover Image'}
//     />
//   </div>
// )}
// <div className='mx-auto mt-12 max-w-3xl'>
//   // {body && <RichText content={body} />}
//   //{' '}
// </div>;
