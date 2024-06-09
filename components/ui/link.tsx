import React from 'react';

interface Props {
  href: string;
  size?: 'md' | 'lg';
  block?: boolean;
  style?: 'outline' | 'primary' | 'inverted' | 'muted';
  className?: string;
  [x: string]: any;
}

const sizes = {
  lg: 'px-5 py-2.5',
  md: 'px-4 py-2',
};

const styles = {
  outline: 'bg-white border-2 border-black hover:bg-gray-100 text-black',
  primary: 'bg-black text-white hover:bg-gray-800 border-2 border-transparent',
  inverted: 'bg-white text-black border-2 border-transparent',
  muted: 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent',
};

const Button: React.FC<Props> = ({
  href,
  block,
  size = 'lg',
  style = 'primary',
  className,
  ...rest
}) => {
  const classNames = [
    'rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200',
    block && 'w-full',
    sizes[size],
    styles[style],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a href={href} className={classNames} {...rest}>
      {rest.children}
    </a>
  );
};

export default Button;
