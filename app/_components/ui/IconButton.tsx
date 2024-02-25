import React from 'react';
import { Button, ButtonProps, Link, LinkProps } from 'react-aria-components';

type ButtonPropsWithRef = ButtonProps & React.RefAttributes<HTMLButtonElement>;
type LinkPropsWithRef = LinkProps & React.RefAttributes<HTMLAnchorElement>;

type IconButtonProps = {
  icon: React.ReactNode;
  'aria-label': string;
} & (
  | (ButtonPropsWithRef & { as: 'button' })
  | (LinkPropsWithRef & { as: 'a' })
);

export const IconButton = (props: IconButtonProps) => {
  const className =
    'flex flex-row items-center gap-2 px-4 text-foreground/60 hover:text-accent';
  if (props.as === 'a') {
    return (
      <Link {...props} className={className}>
        {props.icon}
      </Link>
    );
  } else {
    return (
      <Button {...props} className={className}>
        {props.icon}
      </Button>
    );
  }
};
