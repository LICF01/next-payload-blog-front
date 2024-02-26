import { fetchDocs } from '@/_api/fetchDocs';
import { fetchHeader } from '@/_api/fetchGlobals';
import { Page } from '@/_types/payload-types';

import Navigation from './Navigation';
import ThemeSwitcher from './ThemeSwitcher';

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
    return pages?.map(({ slug, title, id }) => ({ slug, title, id }));
  } catch (error) {
    return [];
  }
};

export default async function Header() {
  const [navItems, header] = await Promise.all([getNavItems(), getHeader()]);
  return (
    <header
      id='header'
      className='mx-auto flex w-full max-w-7xl items-center justify-between py-[calc(var(--gap-padding))]'
    >
      <a
        href='/'
        className='title text-2xl font-semibold uppercase tracking-widest focus-visible:outline-none'
      >
        <span>{!Array.isArray(header) && header?.siteName}</span>
      </a>
      <div className='flex items-center gap-4'>
        <Navigation navItems={navItems as Page[]} />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
