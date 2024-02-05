import { Page } from "@/_types/payload-types";

type HeroProps = {
  heading?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "hero";
};

export default function Hero({ heading }: HeroProps) {
  return (
    <section className="w-full py-16 mb-12" aria-label="hero">
      <div className="flex flex-col gap-3  text-left mx-auto">
        <h1 className="text-2xl md:text-4xl lg:text-5xl lg:max-w-6xl">
          {heading}
        </h1>
      </div>
    </section>
  );
}
