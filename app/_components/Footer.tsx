import React from 'react';
import Link from 'next/link';
import { ArrowUpCircle, MoveUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='mt-16 w-full border-t-[1px] border-foreground/10'>
      <div className='flex flex-row items-center justify-between py-16 font-sans text-xs'>
        <span className='text-foreground/70'>
          @ Made by{' '}
          <Link
            href='https://www.lucascubilla.dev'
            target='_blank'
            className='hover:text-accent hover:underline'
          >
            Lucas Cubilla
          </Link>
        </span>
        <a
          className='flex flex-row items-center gap-2 px-4  uppercase text-foreground/60 hover:text-accent'
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
