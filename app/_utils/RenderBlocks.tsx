import { blocks } from '@/_components/blocks';
import { Post } from '@/_types/payload-types';

type Props = {
  layout: Post['layout'];
};

const RenderBlocks = ({ layout }: Props) =>
  layout &&
  layout.map((block, i) => {
    const Block = blocks[block.blockType];
    if (Block) {
      return <Block key={i} {...block} />;
    }
    return null;
  });

export default RenderBlocks;
