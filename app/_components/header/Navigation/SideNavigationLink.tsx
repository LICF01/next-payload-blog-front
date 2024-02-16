import Link from 'next/link';
import { motion } from 'framer-motion';
import { scale, slide } from './animations';
import { Music2 } from 'lucide-react';
import { Page } from '@/_types/payload-types';
import { MouseEventHandler } from 'react';

type Props = {
  data: Page;
  index: number;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement> | undefined;
};

export default function SideNavigationLink(props: Props) {
  const { data, index, isActive, onClick } = props;
  const { slug, title, id } = data;

  return (
    <motion.div
      className='relative flex items-center'
      custom={index}
      variants={slide}
      initial='initial'
      animate='enter'
      exit='exit'
    >
      {isActive && (
        <motion.div
          variants={scale}
          animate={isActive ? 'open' : 'closed'}
          className='absolute left-[-40px] text-background'
        >
          <Music2 />
        </motion.div>
      )}
      <Link href={`/${slug}`} onClick={onClick}>
        {title}
      </Link>
    </motion.div>
  );
}
