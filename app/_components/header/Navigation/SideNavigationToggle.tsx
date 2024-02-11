import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ToggleButton } from 'react-aria-components';
import { tv } from 'tailwind-variants';

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

export default function SideNavigationToggle({
  hidden,
  onClick,
  isActive,
}: {
  hidden: boolean;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ToggleButton
            aria-label='toggle navigation'
            className={buttonStyles()}
            onClick={onClick}
          >
            <div className={burguerStyles({ isActive })} />
          </ToggleButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
