import { MEDIA_FIELDS } from './media'

export const HERO = `
...on Hero{
	id
	heading
	blockName
  blockType
}
`

export const TWOCOLUMN = `
...on TwoColumn{
	id
	heading
	text
	direction
	image {
	${MEDIA_FIELDS}
	}
	blockName
  blockType
}
`

export const YOUTUBEEMBED = `
	... on YouTubeEmbed {
		id
		title
		caption
		blockName
		blockType
	}
`
