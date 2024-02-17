'use client';
import { useEffect, useState } from 'react';
import Card from '../ui/Card';
import getColumnCount from '@/_utils/getColumnCount';

import { Post } from '@/_types/payload-types';

type Props = {
  docs: Post[];
};

export default function PostsGrid({ docs }: Props) {
  const [currentColumnCount, setCurrentColumnCount] = useState(3);
  const columns: Post[][] = new Array(currentColumnCount)
    .fill(null)
    .map(() => []);

  docs.forEach((doc, i) => {
    const columnIndex = i % currentColumnCount;

    columns[columnIndex].push(doc);
  });

  useEffect(() => {
    function handleResize() {
      setCurrentColumnCount(getColumnCount());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridClass = `grid grid-cols-1 gap-6 ${currentColumnCount === 2 ? 'md:grid-cols-2' : ''} ${currentColumnCount === 3 ? 'lg:grid-cols-3 ' : ''}`;

  return (
    <div className={gridClass}>
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
