import { COLLECTION, HERO, TWOCOLUMN, YOUTUBEEMBED } from './blocks';
import { MEDIA_FIELDS } from './media';

export const PAGES = `
  query Pages {
    Pages(limit: 300)  {
      docs {
				id
        slug
				title
      }
    }
  }
`;

export const PAGE = `
  query Page($slug: String, $draft: Boolean) {
    Pages(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
				title
				description
				slug
        layout {
					${HERO}
					${TWOCOLUMN}
					${YOUTUBEEMBED}
					${COLLECTION}
        }
				meta {
					title
					description
					image {
						${MEDIA_FIELDS}
					}
				}
      }
    }
  }
`;
