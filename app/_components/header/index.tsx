import { fetchDocs } from '@/_api/fetchDocs';
import { fetchHeader } from '@/_api/fetchGlobals';
import { Page } from '@/_types/payload-types';

import Navigation from './Navigation';

const getHeader = async () => {
  try {
    const Header = await fetchHeader();
    return Header;
  } catch (error) {
    return [];
  }
};

const getNavItems = async () => {
  try {
    const pages = await fetchDocs<Page>('pages');
    return pages?.map(({ slug, name, id }) => ({ slug, name, id }));
  } catch (error) {
    return [];
  }
};

export default async function Header() {
  const [navItems, header] = await Promise.all([getNavItems(), getHeader()]);
  return (
    <header className='flex items-center justify-between py-[calc(var(--gap-padding))]'>
      <a
        href='/'
        className='hover:text-primary group inline-flex text-2xl font-semibold uppercase tracking-widest transition focus-visible:outline-none'
      >
        <span>{!Array.isArray(header) && header?.siteName}</span>
      </a>
      <Navigation navItems={navItems} />
    </header>
  );
}
