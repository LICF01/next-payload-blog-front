import serialize from './serialize';
import React from 'react';
type RichTextProps = {
  root: {
    children: {
      type: string;
      version: number;
      [k: string]: unknown;
    }[];
    direction: ('ltr' | 'rtl') | null;
    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
    indent: number;
    type: string;
    version: number;
  };
  [k: string]: unknown;
};

export default function RichText({ richText }: { richText?: RichTextProps }) {
  return (
    <div>
      {serialize({
        children: richText?.root.children,
      })}
    </div>
  );
}
