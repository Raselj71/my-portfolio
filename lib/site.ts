const fallbackUrl = 'http://localhost:3000';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? fallbackUrl;

export const site = {
  url: siteUrl,
  name: 'Rasel Ahammed',
  title: 'Rasel Ahammed — Software Engineer',
  description:
    'Cross-platform mobile and full-stack engineer in Dhaka. Lead developer of the TaskATask app and founder of MobileMint, a studio with nine Android apps on Google Play.',
  author: 'Rasel Ahammed',
  email: 'rasel.cse.green@gmail.com',
  location: 'Dhaka, Bangladesh',
  links: {
    github: 'https://github.com/Raselj71',
    linkedin: 'https://www.linkedin.com/in/rasel221/',
    youtube: 'https://youtube.com/techtutorpro',
    mobilemint: 'https://mobilemint.vercel.app',
    taskatask: 'https://play.google.com/store/apps/details?id=com.taska.task',
  },
  github: {
    username: 'Raselj71',
  },
  resumePath: '/resume.pdf',
  nav: [
    { href: '#work', label: 'Work' },
    { href: '#experience', label: 'Experience' },
    { href: '#stack', label: 'Stack' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ],
};

export type Site = typeof site;
