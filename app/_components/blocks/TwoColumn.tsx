import { Media } from "@/_types/payload-types";

type TwoColumnProps = {
  heading?: string | null;
  text?: string | null;
  image?: string | Media | null;
  direction?: ("default" | "reverse") | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "twoColumn";
};

export default function TwoColumn(props: TwoColumnProps) {
  return <div>two column</div>;
}
