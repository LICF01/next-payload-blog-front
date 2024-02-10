import { fetchDoc } from '@/_api/fetchDoc';
import { fetchDocs } from '@/_api/fetchDocs';
import { Category, Post } from '@/_types/payload-types';
import PostsGrid from '@/_components/blog/PostsGrid';

export async function generateStaticParams() {
  try {
    const categories = await fetchDocs<Category[]>('categories');
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
  const { id } = await fetchDoc<Category>({
    collection: 'categories',
    slug: params.category,
  });

  let docs: Post[] | null = null;
  docs = await fetchDocs<Post>('posts', {
    category: id,
  });

  return <PostsGrid docs={docs as Post[]} />;
}
