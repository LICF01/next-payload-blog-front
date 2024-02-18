import { Category, Media, Post } from '@/_types/payload-types';

export function isPost(item: string | Post): item is Post {
  return (item as Post).slug !== undefined;
}

export function isMedia(item: string | Media): item is Media {
  return (item as Media).url !== undefined;
}

export function isCategory(
  item: string | Category,
  prop: keyof Category,
): item is Category {
  return (item as Category)[prop] !== undefined;
}
