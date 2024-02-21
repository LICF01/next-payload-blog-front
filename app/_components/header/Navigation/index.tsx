'use client';
import { useInView } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import SideNavigation from './SideNavigation';
import SideNavigationToggle from './SideNavigationToggle';
import { Music2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Page } from '@/_types/payload-types';

export default function Navigation({ navItems }: { navItems: Page[] }) {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const ref = useRef(null);
  const headerNav = useInView(ref, {
    margin: '200px',
  });

  useEffect(() => {
    if (headerNav) {
      setIsActive(false);
    }
  }, [headerNav]);

  return (
    <>
      <nav ref={ref} className='hidden md:block'>
        <ul className='flex gap-4'>
          {navItems
            ? navItems.map(({ slug, title, id }) => (
                <li key={id} className='flex items-center'>
                  <Link href={`/${slug}`}>
                    <span
                      className={
                        pathname === '/' + slug
                          ? 'flex items-center pr-2 text-accent'
                          : 'flex items-center hover:text-accent hover:underline'
                      }
                    >
                      {pathname === '/' + slug && <Music2 size={15} />}
                      {title}
                    </span>
                  </Link>
                </li>
              ))
            : null}
        </ul>
      </nav>
      <SideNavigationToggle
        hidden={headerNav}
        onClick={() => {
          setIsActive(!isActive);
        }}
        isActive={isActive}
      />
      <SideNavigation
        navItems={navItems}
        isActive={isActive}
        onClick={() => setIsActive(false)}
      />
    </>
  );
}
