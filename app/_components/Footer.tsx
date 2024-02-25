import React from 'react';
import Link from 'next/link';
import { ArrowUpCircle } from 'lucide-react';
import { IconButton } from './ui/IconButton';

export default function Footer() {
  return (
    <footer className='mx-auto mt-16 w-full max-w-7xl border-t-[1px] border-foreground/10'>
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
        <IconButton
          as='a'
          href='#header'
          icon={<ArrowUpCircle size={38} strokeWidth={1} />}
          aria-label='Scroll to top'
        />
      </div>
    </footer>
  );
}
