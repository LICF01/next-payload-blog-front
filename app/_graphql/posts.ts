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
	query Posts {
		Posts {
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
			}
		}
	}
`;
