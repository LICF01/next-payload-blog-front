type Props = {
  name: string;
  description: string;
};

export default function PageDescription({ name, description }: Props) {
  return (
    <section className='mb-12 w-full py-16'>
      <div className={'mx-auto flex flex-col gap-3'}>
        <p className='text-xs font-medium uppercase text-foreground/50'>
          {name}
        </p>
        <h1 className='text-2xl font-light text-foreground md:text-4xl  lg:max-w-6xl lg:text-5xl'>
          {description}
        </h1>
      </div>
    </section>
  );
}
