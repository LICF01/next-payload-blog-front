export const CATEGORIES = `
  query Categories {
    Categories(limit: 300)  {
      docs {
				id
				title
        slug
      }
    }
  }
`;

export const CATEGORY = `
  query Categories($slug: String) {
    Categories(where: {slug: {equals: $slug}}, limit: 1)  {
      docs {
				id
				title
        slug
      }
    }
  }
`;
