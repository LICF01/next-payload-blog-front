import { RICHTEXT, YOUTUBEEMBED } from './blocks';
import { MEDIA_FIELDS } from './media';

export const COVER_IMAGE = `
	coverImage {
		${MEDIA_FIELDS}
	}
`;

export const POSTS = `
	query Posts($categoryId: JSON, $slug: String) {
	 Posts(
			where: {
				categories: { equals: $categoryId }
				slug: { equals: $slug }
			}
			sort: "-publishedDate"
		) {
			docs {
				id
				title
				slug
				description
				publishedDate
				${COVER_IMAGE}
				layout {
					${RICHTEXT}
					${YOUTUBEEMBED}
				}
				meta {
					title
					description
					image {
						${MEDIA_FIELDS}
					}
				}
				categories {
					id
					title
					slug
				}
				relatedPosts {
					id
					title
					slug
					${COVER_IMAGE}
				}
			}
		}
	}
`;

export const POSTSSLUGS = `
	query Posts($categoryId: JSON, $slug: String) {
	 Posts(
			where: {
				categories: { equals: $categoryId }
				slug: { equals: $slug }
			}
		) {
			docs {
				slug
			}
		}
	}
`;
