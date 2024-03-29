// @ts-nocheck
import escapeHTML from 'escape-html';
import React, { Fragment } from 'react';

export const IS_BOLD = 1;
export const IS_ITALIC = 1 << 1;
export const IS_STRIKETHROUGH = 1 << 2;
export const IS_UNDERLINE = 1 << 3;
export const IS_CODE = 1 << 4;
export const IS_SUBSCRIPT = 1 << 5;
export const IS_SUPERSCRIPT = 1 << 6;
export const IS_HIGHLIGHT = 1 << 7;

export default function serialize({ children, parentNode = {} }) {
  return children
    ?.map((node, i) => {
      if (node.type === 'text') {
        let text = node.text ? <span>{node.text}</span> : <span>&nbsp;</span>;

        if (node.format & IS_BOLD) {
          text = <strong key={i}>{text}</strong>;
        }

        if (node.format & IS_CODE) {
          text = <code key={i}>{text}</code>;
        }

        if (node.format & IS_ITALIC) {
          text = <em key={i}>{text}</em>;
        }

        if (node.format & IS_UNDERLINE) {
          text = (
            <u class='underline' key={i}>
              {text}
            </u>
          );
        }

        if (node.format & IS_STRIKETHROUGH) {
          text = <strike key={i}>{text}</strike>;
        }

        if (node.format & IS_SUBSCRIPT) {
          text = <sub key={i}>{text}</sub>;
        }

        if (node.format & IS_SUPERSCRIPT) {
          text = <sup key={i}>{text}</sup>;
        }
        return <Fragment key={i}>{text}</Fragment>;
      }

      if (!node) {
        return null;
      }

      if (node.type === 'heading') {
        return (
          <node.tag key={i}>{serialize({ children: node.children })}</node.tag>
        );
      }

      if (node.type === 'list') {
        if (node.listType === 'bullet') {
          return (
            <ul key={i}>
              {serialize({
                children: node.children,
                parentNode: node,
              })}
            </ul>
          );
        } else if (node.listType === 'check') {
          return (
            <ul key={i}>
              {serialize({
                children: node.children,
                parentNode: node,
              })}
            </ul>
          );
        } else if (node.listType === 'number') {
          return (
            <ol key={i}>
              {serialize({
                children: node.children,
                parentNode: node,
              })}
            </ol>
          );
        }
      }

      if (node.type === 'listitem' && node.checked) {
        return (
          <li key={i}>
            <div>{serialize({ children: node.children })}</div>
          </li>
        );
      } else if (node.type === 'listitem' && parentNode.listType === 'check') {
        return (
          <li key={i}>
            <div>{serialize({ children: node.children })}</div>
          </li>
        );
      } else if (node.type === 'listitem') {
        return <li key={i}>{serialize({ children: node.children })}</li>;
      }

      switch (node.type) {
        case 'quote':
          return (
            <blockquote key={i}>
              {serialize({ children: node.children })}
            </blockquote>
          );

        case 'link':
          return (
            <a
              href={escapeHTML(
                node.fields?.linkType === 'custom' ? node?.fields?.url : '',
              )}
              target={node.fields?.newTab ? '_blank' : '_self'}
              key={i}
              className='link'
            >
              {serialize({ children: node.children })}
            </a>
          );

        case 'upload':
          if (
            node.relationTo === 'media' &&
            node.value.mimeType.includes('image')
          ) {
            const { url, alt } = node.value;
            return (
              <figure>
                <img
                  className='rounded-md'
                  src={process.env.PAYLOAD_PUBLIC_SERVER_URL + url}
                  alt={alt}
                />
                <figcaption className='text-center'>{alt}</figcaption>
              </figure>
            );
          }
          return;

        default:
          return <p key={i}>{serialize({ children: node.children })}</p>;
      }
    })
    .filter((node) => node !== null);
}
