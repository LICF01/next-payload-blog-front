import { MEDIA_FIELDS } from './media';

export const META = `
	meta {
		title
		description
		image {
			${MEDIA_FIELDS}
		}
	}
`;
