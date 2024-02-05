import { blocks } from "@/_components/blocks";
import { Page } from "@/_types/payload-types";

type Props = {
  layout: Page["layout"];
};

const RenderBlocks = ({ layout }: Props) => (
  <div>
    {layout &&
      layout.map((block, i) => {
        const Block = blocks[block.blockType];
        if (Block) {
          return <Block key={i} {...block} />;
        }
        return null;
      })}
  </div>
);

export default RenderBlocks;
