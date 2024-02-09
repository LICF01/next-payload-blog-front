import { fetchDoc } from '@/_api/fetchDoc';
import { fetchDocs } from '@/_api/fetchDocs';
import { Page } from '@/_types/payload-types';
import RenderBlocks from '@/_utils/RenderBlocks';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<Page>('pages');
    return pages?.map(({ slug }) => slug);
  } catch (error) {
    return [];
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug[0];

  let page: Page | null = null;
  page = await fetchDoc<Page>({
    collection: 'pages',
    slug,
  });

  return <RenderBlocks layout={page.layout} />;
}
