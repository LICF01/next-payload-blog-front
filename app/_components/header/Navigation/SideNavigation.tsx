'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { menuSlide } from './animations';
import Curve from './Curve';
import SlideNavigationLink from './SideNavigationLink';
import { usePathname } from 'next/navigation';
import { MouseEventHandler, useRef } from 'react';
import useOutsideClick from '@/_hooks/useOutsideClick';
import { Page } from '@/_types/payload-types';

type Props = {
  navItems?: Page[];
  isActive: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement> | undefined;
};

export default function SideNavigation({ navItems, isActive, onClick }: Props) {
  const pathname = usePathname();
  const ref = useRef(null);
  useOutsideClick(ref, onClick);

  return (
    <>
      <AnimatePresence mode='wait'>
        {isActive && (
          <motion.div
            variants={menuSlide}
            initial='initial'
            animate='enter'
            exit='exit'
            className={
              'py-[15vh 10vh] fixed right-0 top-0 z-10 h-[100vh] w-full bg-foreground px-16 text-background md:w-2/4 lg:w-1/3 lg:px-[7.5vw]'
            }
            ref={ref}
          >
            <nav
              aria-hidden='true'
              className=' box-border flex h-full flex-col justify-center '
            >
              <ul className='mt-20 flex flex-col gap-3 text-6xl'>
                {navItems
                  ? navItems.map((data, i) => (
                      <li key={data.id}>
                        <SlideNavigationLink
                          data={data}
                          index={i}
                          isActive={pathname === '/' + data.slug}
                          onClick={onClick}
                        />
                      </li>
                    ))
                  : null}
              </ul>
            </nav>
            <Curve />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
