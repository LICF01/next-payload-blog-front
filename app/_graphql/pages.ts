import { COLLECTION, HERO, TWOCOLUMN, YOUTUBEEMBED } from './blocks';

export const PAGES = `
  query Pages {
    Pages(limit: 300)  {
      docs {
				id
        slug
				name
      }
    }
  }
`;

export const PAGE = `
  query Page($slug: String, $draft: Boolean) {
    Pages(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
       	name 
				slug
        layout {
					${HERO}
					${TWOCOLUMN}
					${YOUTUBEEMBED}
					${COLLECTION}
        }
      }
    }
  }
`;
