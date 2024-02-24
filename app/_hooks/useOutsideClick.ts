import {
  MouseEvent,
  MouseEventHandler,
  MutableRefObject,
  useEffect,
} from 'react';

export default function useOutsideClick(
  ref: MutableRefObject<HTMLElement | null>,
  callback: MouseEventHandler<HTMLAnchorElement> | undefined,
) {
  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (callback) {
          callback(event as any);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}
