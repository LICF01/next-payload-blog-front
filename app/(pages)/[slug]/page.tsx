import { fetchDoc } from '@/_api/fetchDoc';
import { fetchDocs } from '@/_api/fetchDocs';
import PageDescription from '@/_components/PageDescription';
import { Page } from '@/_types/payload-types';
import RenderBlocks from '@/_utils/RenderBlocks';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<Page>('pages');
  } catch (error) {
    return [];
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  let page: Page | null = null;
  page = await fetchDoc<Page>({
    collection: 'pages',
    slug,
  });

  return (
    <>
      <PageDescription
        name={page.name}
        description='asdfasdgasdgasdgasdgasdgasdg'
      />
      <RenderBlocks layout={page.layout} />
    </>
  );
}
