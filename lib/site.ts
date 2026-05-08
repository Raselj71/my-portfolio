const fallbackUrl = 'http://localhost:3000';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? fallbackUrl;

export const site = {
  url: siteUrl,
  name: 'Rasel Ahmed',
  title: 'Rasel Ahmed — Software Engineer',
  description:
    'Software engineer building modern web and mobile products. Currently at Dhrubok Infotech Services.',
  author: 'Rasel Ahmed',
  email: 'rasel.cse.green@gmail.com',
  links: {
    github: 'https://github.com/Raselj71',
    linkedin: 'https://www.linkedin.com/in/rasel221/',
    youtube: 'https://youtube.com/techtutorpro',
  },
  github: {
    username: 'Raselj71',
  },
  resumePath: '/resume.pdf',
  nav: [
    { href: '/work', label: 'Work' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
};

export type Site = typeof site;
