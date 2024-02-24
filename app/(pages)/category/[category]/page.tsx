import { fetchDoc } from '@/_api/fetchDoc';
import { fetchDocs } from '@/_api/fetchDocs';
import { Category, Media, Post } from '@/_types/payload-types';
import PostsGrid from '@/_components/blog/PostsGrid';
import PageDescription from '@/_components/PageDescription';
import { Metadata } from 'next';
import { isMedia } from '@/_utils/typeguards';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;

  let doc: Category | null = null;
  doc = await fetchDoc<Category>({
    collection: 'categories',
    slug,
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
    const categories = await fetchDocs<Category>('categories');
    return categories?.map(({ slug }) => ({
      slug,
    }));
  } catch (error) {
    return [];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { id, title, description } = await fetchDoc<Category>({
    collection: 'categories',
    slug: params.category.toLowerCase(),
  });

  let docs: Post[] | null = null;
  docs = await fetchDocs<Post>('posts', {
    categoryId: id,
  });

  return (
    <>
      <PageDescription
        title={'Category'}
        description={title?.toUpperCase() || ''}
      />
      <PostsGrid docs={docs as Post[]} />
    </>
  );
}
