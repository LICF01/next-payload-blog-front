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
        <ul className='text-semibold flex gap-6 lowercase'>
          {navItems
            ? navItems.map(({ slug, title, id }) => (
                <li
                  key={id}
                  className={
                    pathname.includes('/' + slug)
                      ? 'flex items-center gap-1 text-accent'
                      : 'flex items-center gap-1'
                  }
                >
                  {pathname.includes('/' + slug) && <Music2 size={15} />}
                  <Link href={`/${slug}`} className='link'>
                    <span>{title}</span>
                  </Link>
                </li>
              ))
            : null}
        </ul>
      </nav>
      <SideNavigationToggle
        hidden={headerNav}
        onClick={setIsActive}
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
