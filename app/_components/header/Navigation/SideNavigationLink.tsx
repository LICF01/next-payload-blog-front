import Link from 'next/link';
import { motion } from 'framer-motion';
import { scale, slide } from './animations';
import { Music2 } from 'lucide-react';

type data = {
  slug: string | null | undefined;
  name: string;
  id: string;
};

type Props = {
  data: data;
  index: number;
  isActive: boolean;
  onClick: () => void;
};

export default function SideNavigationLink(props: Props) {
  const { data, index, isActive, onClick } = props;
  const { slug, name, id } = data;

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
        {name}
      </Link>
    </motion.div>
  );
}
