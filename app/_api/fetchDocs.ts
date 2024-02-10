import { CATEGORIES } from '@/_graphql/categories';
import { PAGES } from '@/_graphql/pages';
import { POSTS } from '@/_graphql/posts';
import { Config } from '@/_types/payload-types';

const queryMap = {
  pages: {
    key: 'Pages',
    query: PAGES,
  },
  posts: {
    key: 'Posts',
    query: POSTS,
  },
  categories: {
    key: 'Categories',
    query: CATEGORIES,
  },
};

export const fetchDocs = async <T>(
  collection: keyof Config['collections'],
  variables?: Record<string, unknown>,
): Promise<T[]> => {
  if (!queryMap[collection])
    throw new Error(`Collection ${collection} not found`);

  const docs: T[] = await fetch(
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/graphql`,
    {
      body: JSON.stringify({
        query: queryMap[collection].query,
        variables,
      }),
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      next: { tags: [collection] },
    },
  )
    ?.then((res) => res.json())
    ?.then((res) => {
      if (res.errors)
        throw new Error(res?.errors?.[0]?.message ?? 'Error fetching docs');
      return res?.data?.[queryMap[collection].key]?.docs;
    });

  return docs;
};
