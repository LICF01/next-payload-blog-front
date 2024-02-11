'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { menuSlide } from './animations';
import Curve from './Curve';
import SlideNavigationLink from './SideNavigationLink';
import { usePathname } from 'next/navigation';

type Props = {
  navItems?: { slug: string | null | undefined; name: string; id: string }[];
  isActive: boolean;
  onClick: () => void;
};

export default function SideNavigation({ navItems, isActive, onClick }: Props) {
  const pathname = usePathname();

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
