import React from 'react';
import { Button } from 'react-aria-components';
import Link from 'next/link';
import { ArrowUpCircle, MoveUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='mt-16 w-full border-t-[1px] border-foreground/10'>
      <div className='flex flex-row items-center justify-between py-16 font-sans text-sm'>
        <span className='text-foreground/70'>
          @ Made by{' '}
          <Link href='https://www.lucascubilla.dev' target='_blank'>
            Lucas Cubilla
          </Link>
        </span>
        <a
          className='flex flex-row items-center gap-2 px-4  uppercase text-foreground/60'
          href='#header'
          aria-label='Scroll to top'
        >
          <span>To top</span>
          <ArrowUpCircle size={38} strokeWidth={1} />
        </a>
      </div>
    </footer>
  );
}
