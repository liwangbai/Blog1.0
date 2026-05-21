export const SITE = {
  title: "WPY's Blog",
  description: 'Personal blog and portfolio — thoughts on full-stack development, AI, and more.',
  url: 'https://wpyai.cn',
  author: 'WPY',
  locale: 'zh-CN',
} as const;

export const PAGINATION = {
  postsPerPage: 6,
  featuredPostsCount: 3,
  featuredProjectsCount: 3,
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
] as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
} as const;
