'use client';
import { useInView } from 'framer-motion';
import React, { useRef, useState } from 'react';
import SideNavigation from './SideNavigation';
import SideNavigationToggle from './SideNavigationToggle';

type NavItems = {
  slug: string | null | undefined;
  name: string;
  id: string;
}[];

export default function Navigation({ navItems }: { navItems: NavItems }) {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef(null);
  const headerNav = useInView(ref, {
    margin: '200px',
  });

  return (
    <div>
      <nav ref={ref}>
        <ul className='flex gap-4'>
          {navItems
            ? navItems.map(({ slug, name, id }) => (
                <li key={id}>
                  <a href={`/${slug}`}>
                    <span className='group-hover:underline'>{name}</span>
                  </a>
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
