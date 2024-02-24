import { META } from './meta';

export const CATEGORY_FIELDS = `
	id
	title
	description
	slug
	${META}
`;

export const CATEGORIES = `
  query Categories {
    Categories(limit: 300)  {
      docs {
				${CATEGORY_FIELDS}
      }
    }
  }
`;

export const CATEGORY = `
  query Categories($slug: String) {
    Categories(where: {slug: {equals: $slug}}, limit: 1)  {
      docs {
				${CATEGORY_FIELDS}
      }
    }
  }
`;
