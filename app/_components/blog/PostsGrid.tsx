'use client';
import Card from '../ui/Card';
import getColumnCount from '@/_utils/getColumnCount';

import { Post } from '@/_types/payload-types';

type Props = {
  docs: Post[];
};

export default function PostsGrid({ docs }: Props) {
  let currentColumnCount = getColumnCount();

  const columns: Post[][] = new Array(currentColumnCount)
    .fill(null)
    .map(() => []);

  docs.forEach((doc, i) => {
    const columnIndex = i % currentColumnCount;

    columns[columnIndex].push(doc);
  });

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {columns.map((col, colIndex) => (
        <div key={colIndex} className='grid gap-10'>
          {col.map((doc) => (
            <Card key={doc.slug} data={doc} />
          ))}
        </div>
      ))}
    </div>
  );
}
