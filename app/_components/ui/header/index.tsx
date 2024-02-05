import { fetchDocs } from "@/_api/fetchDocs";
import { Page } from "@/_types/payload-types";
import React from "react";

const getNavItems = async () => {
  try {
    const pages = await fetchDocs<Page>("pages");
    return pages?.map(({ slug, name }) => ({ slug, name }));
  } catch (error) {
    return [];
  }
};

export default async function Header() {
  const navItems = await getNavItems();

  return (
    <header>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <a
          href="/"
          className="font-semibold uppercase hover:text-primary group inline-flex py-6 text-2xl tracking-widest transition focus-visible:outline-none"
        >
          <span>""</span>
        </a>
        <div className="flex items-center">
          <nav>
            <ul className="flex gap-4">
              {navItems
                ? navItems.map(({ slug, name }) => (
                    <li>
                      <a href={`/${slug}`}>
                        <span className="group-hover:underline">{name}</span>
                      </a>
                    </li>
                  ))
                : null}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
