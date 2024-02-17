import { fetchDocs } from '@/_api/fetchDocs';
import React from 'react';
import PostsGrid from '../blog/PostsGrid';
import { Post } from '@/_types/payload-types';

const getDocs = async (collection: string) => {
  try {
    return await fetchDocs(collection as any);
  } catch (error) {
    console.log(error);
    return [];
  }
};

type CollectionProps = {
  collection: string;
  id?: string | null;
  blockName?: string | null;
  blockType: string;
};

export default async function Collection(props: CollectionProps) {
  const { collection } = props;
  const docs = await getDocs(collection);
  if (!docs) return null;
  if (collection === 'posts') {
    return <PostsGrid docs={docs as Post[]} />;
  }
}
