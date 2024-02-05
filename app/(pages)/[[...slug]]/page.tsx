import RenderBlocks from "@/_utils/RenderBlocks";

export async function generateStaticParams() {
  const pageReq = await fetch("http://localhost:4000/api/pages?limit=100");

  const pageData = await pageReq.json();

  return pageData.docs.map((el) => ({ slug: [el.slug] }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug[0];

  const query = `http://localhost:4000/api/pages?where[slug][equals]=${slug}`;

  const pageReq = await fetch(query);

  const pageData = await pageReq.json();

  const page = pageData.docs[0];

  return (
    <div>
      <RenderBlocks layout={page.layout} />
    </div>
  );
}
