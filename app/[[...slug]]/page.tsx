import RenderBlocks from "@/utils/RenderBlocks";

export async function generateStaticParams() {
  const pageReq = await fetch("http://localhost:4000/api/pages?limit=100");

  const pageData = await pageReq.json();

  return pageData.docs.map((el) => ({ slug: [el.slug] }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug[0];

  const pageReq = await fetch(
    `http://localhost:4000/api/pages?where[slug][equals]=${slug}`
  );

  const pageData = await pageReq.json();

  const page = pageData.docs[0];

  console.log("page", page);

  return (
    <div>
      <RenderBlocks layout={page.layout} />
    </div>
  );
}
