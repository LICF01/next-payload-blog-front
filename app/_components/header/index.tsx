import { fetchDocs } from '@/_api/fetchDocs';
import { fetchHeader } from '@/_api/fetchGlobals';
import { Page } from '@/_types/payload-types';

import ThemeSwither from './ThemeSwitcher';
import SlideNavigation from './SlideNavigation';

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
    <header className='py-[calc(var(--gap-padding))]'>
      <div className='mx-auto flex  items-center justify-between '>
        <a
          href='/'
          className='hover:text-primary group inline-flex text-2xl font-semibold uppercase tracking-widest transition focus-visible:outline-none'
        >
          <span>{!Array.isArray(header) && header?.siteName}</span>
        </a>
        <nav>
          <ul className='flex gap-4'>
            {navItems
              ? navItems.map(({ slug, name, id }) => (
                  <li key={id}>
                    <a href={`/${slug}`}>
                      <span className='group-hover:underline'>{name}</span>
                    </a>
                  </li>
                ))
              : null}
          </ul>
        </nav>
      </div>
      <SlideNavigation navItems={navItems} />
    </header>
  );
}
