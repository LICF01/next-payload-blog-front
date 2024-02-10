import { RICHTEXT, YOUTUBEEMBED } from './blocks';
import { MEDIA_FIELDS } from './media';

export const IMAGE = `
	type
	localImage {
		${MEDIA_FIELDS}
	}
	url
	alt
`;

export const POSTS = `
	query Posts($categoryId: JSON, $slug: String) {
	 Posts(
			where: {
				categories: { equals: $categoryId }
				slug: { equals: $slug }
			}
		) {
			docs {
				id
				title
				slug
				publishedDate
				coverImage {
					${IMAGE}
				}
				categories {
					id
					title
					description
				}
				relatedPosts {
					id
					title
					coverImage {
						${IMAGE}
					}
				}
				layout {
					${RICHTEXT}
					${YOUTUBEEMBED}
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
