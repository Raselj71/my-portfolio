export type Role = {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  heading: string;
  body: string;
};

const dhrubok = 'https://dhrubokinfotech.com';

export const roles: Role[] = [
  {
    title: 'Software Engineer',
    company: 'Dhrubok Info Tech Services',
    companyUrl: dhrubok,
    period: 'Jul 2026 – Present',
    heading: 'Lead developer, TaskATask. Responsible for the DBL Go admin panel.',
    body: "Cross-platform app on Expo and React Native for Android, iOS, and web. Built one-to-one and group audio and video calls on Twilio Video with native CallKit and ConnectionService integration. DBL Go is Dhaka Bank's digital banking product; the admin panel is built with Next.js.",
  },
  {
    title: 'Junior Software Engineer',
    company: 'Dhrubok Info Tech Services',
    companyUrl: dhrubok,
    period: 'Apr 2025 – Jun 2026',
    heading: 'Built Sammanté and web interfaces across client projects.',
    body: 'Multi-tenant health insurance SaaS in Next.js and TypeScript. Responsive interfaces in React and Next.js, reusable component work with Tailwind CSS, close collaboration with designers and backend developers.',
  },
  {
    title: 'Full Stack Developer',
    company: 'Life Story, Australia (remote)',
    period: 'Jul – Dec 2024',
    heading: 'AI book-writing platform.',
    body: 'React, Node.js, and MongoDB with OpenAI GPT for rephrasing and tone adjustment, and Stripe subscription payments.',
  },
  {
    title: 'Full Stack Developer',
    company: 'KitMuser, UAE (remote)',
    period: 'Feb – Jul 2024',
    heading: 'Social app with real-time chat and live streaming.',
    body: 'Socket.io chat, a feed with reels and posts, OAuth and JWT authentication, cloud deployment.',
  },
];
