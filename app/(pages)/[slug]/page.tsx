import { fetchDoc } from '@/_api/fetchDoc';
import { fetchDocs } from '@/_api/fetchDocs';
import PageDescription from '@/_components/PageDescription';
import { Media, Page, Post } from '@/_types/payload-types';
import RenderBlocks from '@/_utils/RenderBlocks';
import { isMedia } from '@/_utils/typeguards';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;

  let page: Page | null = null;
  page = await fetchDoc<Page>({
    collection: 'pages',
    slug,
  });

  return {
    title: page.meta?.title,
    description: page.meta?.description,
    openGraph: {
      images: [
        {
          url: isMedia(page.meta?.image || '')
            ? ((page.meta?.image as Media).url as string)
            : '',
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<Page>('pages');
    return pages;
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
      <PageDescription title={page.title} description={page.description} />
      <RenderBlocks layout={page.layout as Post['layout']} />
    </>
  );
}
