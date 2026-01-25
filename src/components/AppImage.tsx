import React from 'react';

export type IconName =
  | 'menu'
  | 'close'
  | 'chevron-left'
  | 'chevron-right'
  | 'search'
  | 'folder'
  | 'book'
  | 'book-open'
  | 'bookmark'
  | 'checkmark'
  | 'plus'
  | 'eye'
  | 'flash'
  | 'archive';

export interface AppImageProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  fill?: string;
  stroke?: string;
  title?: string;
  ariaHidden?: boolean;
}

const AppImage = React.forwardRef<SVGSVGElement, AppImageProps>(function AppImage(
  { name, size = 24, className, fill, stroke, title, ariaHidden, style, ...rest },
  ref,
) {
  const id = title ? `appimage-${name}-title` : undefined;
  const width = typeof size === 'number' ? size : size;
  const height = typeof size === 'number' ? size : size;

  const common = {
    ref,
    className,
    width,
    height,
    viewBox: '0 0 24 24',
    xmlns: 'http://www.w3.org/2000/svg',
    style,
    'aria-hidden': ariaHidden ?? (title ? undefined : true),
    'aria-labelledby': id,
    role: title ? 'img' : 'img',
    ...rest,
  } as any;

  switch (name) {
    case 'menu':
      return (
        <svg {...common} fill="none" stroke={stroke ?? 'currentColor'}>
          {title ? <title id={id}>{title}</title> : null}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );

    case 'close':
      return (
        <svg {...common} fill="none" stroke={stroke ?? 'currentColor'}>
          {title ? <title id={id}>{title}</title> : null}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      );

    case 'chevron-left':
      return (
        <svg {...common} fill="none" stroke={stroke ?? 'currentColor'}>
          {title ? <title id={id}>{title}</title> : null}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      );

    case 'chevron-right':
      return (
        <svg {...common} fill="none" stroke={stroke ?? 'currentColor'}>
          {title ? <title id={id}>{title}</title> : null}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      );

    case 'search':
      return (
        <svg {...common} fill="none" stroke={stroke ?? 'currentColor'}>
          {title ? <title id={id}>{title}</title> : null}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      );

    case 'folder':
      return (
        <svg {...common} fill={fill ?? 'currentColor'} stroke={stroke ?? 'none'}>
          {title ? <title id={id}>{title}</title> : null}
          <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
        </svg>
      );

    case 'book':
      return (
        <svg {...common} fill={fill ?? 'currentColor'} stroke={stroke ?? 'none'}>
          {title ? <title id={id}>{title}</title> : null}
          <path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.2 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3" />
        </svg>
      );

    case 'book-open':
      return (
        <svg {...common} fill="none" stroke={stroke ?? 'currentColor'}>
          {title ? <title id={id}>{title}</title> : null}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );

    case 'bookmark':
      return (
        <svg {...common} fill={fill ?? 'none'} stroke={stroke ?? 'currentColor'}>
          {title ? <title id={id}>{title}</title> : null}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      );

    case 'checkmark':
      return (
        <svg {...common} fill="none" stroke={stroke ?? 'currentColor'}>
          {title ? <title id={id}>{title}</title> : null}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      );

    case 'plus':
      return (
        <svg {...common} fill="none" stroke={stroke ?? 'currentColor'}>
          {title ? <title id={id}>{title}</title> : null}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      );

    case 'eye':
      return (
        <svg {...common} fill="none" stroke={stroke ?? 'currentColor'}>
          {title ? <title id={id}>{title}</title> : null}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      );

    case 'flash':
      return (
        <svg {...common} fill="none" stroke={stroke ?? 'currentColor'}>
          {title ? <title id={id}>{title}</title> : null}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );

    case 'archive':
      return (
        <svg {...common} fill="none" stroke={stroke ?? 'currentColor'}>
          {title ? <title id={id}>{title}</title> : null}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );

    default:
      return null as any;
  }
});

export default AppImage;
