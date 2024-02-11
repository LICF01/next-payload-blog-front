'use client';
import { useInView } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import SideNavigation from './SideNavigation';
import SideNavigationToggle from './SideNavigationToggle';
import { Music2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItems = {
  slug: string | null | undefined;
  name: string;
  id: string;
}[];

export default function Navigation({ navItems }: { navItems: NavItems }) {
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
    <div>
      <nav ref={ref}>
        <ul className='flex gap-4'>
          {navItems
            ? navItems.map(({ slug, name, id }) => (
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
                      {name}
                    </span>
                  </Link>
                </li>
              ))
            : null}
        </ul>
      </nav>
      <>
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
    </div>
  );
}
