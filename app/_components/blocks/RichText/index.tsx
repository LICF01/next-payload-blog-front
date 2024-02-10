import serialize from './serialize';
import React from 'react';

export default function RichText({ richText }) {
  return (
    <div>
      {serialize({
        children: richText.root.children,
      })}
    </div>
  );
}
