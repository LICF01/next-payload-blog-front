import { blocks } from "@/components/blocks";

const RenderBlocks = ({ layout }) => (
  <div>
    {layout.map((block, i) => {
      const Block = blocks[block.blockType];
      console.log("Block", Block);
      if (Block) {
        return <Block key={i} {...block} />;
      }
      return null;
    })}
  </div>
);

export default RenderBlocks;
