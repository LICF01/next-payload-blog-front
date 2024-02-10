'use client';
import React, { useState } from 'react';
import { ToggleButton } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { AnimatePresence, motion } from 'framer-motion';
import { menuSlide } from './animations';
import Curve from './Curve';
import SlideNavigationLink from './SlideNavigationLink';
import { usePathname } from 'next/navigation';

const buttonStyles = tv({
  base: 'fixed right-[calc(var(--gap-padding)/1.5)] top-[calc(var(--gap-padding)/1.5)] z-[20] m-5 flex h-20 w-20 cursor-pointer items-center justify-center rounded-[50%] bg-foreground transition duration-300 hover:bg-accent',
  variants: {
    isActive: {
      true: 'bg-accent',
    },
  },
});

const burguerStyles = tv({
  base: 'w-full before:relative before:top-[5px] before:m-auto before:block before:h-[1px] before:w-2/5 before:transform before:bg-white before:transition before:duration-300 before:content-[""] after:relative after:top-[-5px] after:m-auto after:block after:h-[1px] after:w-2/5 after:transform after:bg-white after:transition after:duration-300 after:content-[""]',
  variants: {
    isActive: {
      true: 'before:top-0 before:rotate-[-45deg] before:transform after:top-[-1px] after:rotate-45 after:transform',
    },
  },
});

type Props = {
  navItems?: { slug: string | null | undefined; name: string; id: string }[];
};

export default function SlideNavigation({ navItems }: Props) {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <ToggleButton
        aria-label='toggle navigation'
        className={buttonStyles()}
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        <div className={burguerStyles({ isActive })} />
      </ToggleButton>
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
