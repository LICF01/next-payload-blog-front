import { fetchDocs } from '@/_api/fetchDocs'
import { fetchHeader } from '@/_api/fetchGlobals'
import { Page } from '@/_types/payload-types'

import ThemeSwither from './ThemeSwitcher'

const getHeader = async () => {
  try {
    const Header = await fetchHeader()
    return Header
  } catch (error) {
    return []
  }
}

const getNavItems = async () => {
  try {
    const pages = await fetchDocs<Page>('pages')
    return pages?.map(({ slug, name }) => ({ slug, name }))
  } catch (error) {
    return []
  }
}

export default async function Header() {
  const [navItems, header] = await Promise.all([getNavItems(), getHeader()])

  return (
    <header>
      <div className='mx-auto flex max-w-7xl items-center justify-between'>
        <a
          href='/'
          className='hover:text-primary group inline-flex py-6 text-2xl font-semibold uppercase tracking-widest transition focus-visible:outline-none'
        >
          <span>{header.siteName}</span>
        </a>
        <nav>
          <ul className='flex gap-4'>
            {navItems
              ? navItems.map(({ slug, name }) => (
                  <li>
                    <a href={`/${slug}`}>
                      <span className='group-hover:underline'>{name}</span>
                    </a>
                  </li>
                ))
              : null}
          </ul>
        </nav>
        <ThemeSwither />
      </div>
    </header>
  )
}
