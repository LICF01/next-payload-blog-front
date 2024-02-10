import { CATEGORY } from '@/_graphql/categories';
import { PAGE } from '@/_graphql/pages';
import { Config } from '@/_types/payload-types';

const queryMap = {
  pages: {
    key: 'Pages',
    query: PAGE,
  },
  categories: {
    key: 'Categories',
    query: CATEGORY,
  },
};

export const fetchDoc = async <T>(args: {
  collection: keyof Config['collections'];
  id?: string;
  slug?: string;
}): Promise<T> => {
  const { collection, slug } = args || {};

  if (!queryMap[collection])
    throw new Error(`Collection ${collection} not found`);

  const doc: T = await fetch(
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/graphql`,
    {
      body: JSON.stringify({
        query: queryMap[collection].query,
        variables: {
          slug,
        },
      }),
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      next: { tags: [`${collection}_${slug}`] },
    },
  )
    ?.then((res) => res.json())
    ?.then((res) => {
      if (res.errors)
        throw new Error(res?.errors?.[0]?.message ?? 'Error fetching doc');
      return res?.data?.[queryMap[collection].key]?.docs?.[0];
    });

  return doc;
};
