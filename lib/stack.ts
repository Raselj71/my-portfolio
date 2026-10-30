export type StackItem = {
  name: string;
  note: string;
  /** simpleicons slug, or null to use the inline fallback glyph. */
  icon: string | null;
  /** Hex colour without '#', passed to the icon CDN. */
  color?: string;
};

export type StackGroup = {
  title: string;
  tag?: 'primary';
  items: StackItem[];
  also: string;
};

export const stack: StackGroup[] = [
  {
    title: 'Mobile',
    tag: 'primary',
    items: [
      { name: 'React Native', note: '2+ years, 12 shipped apps', icon: 'react', color: '61DAFB' },
      { name: 'Expo & EAS', note: 'Router, Build, Update, config plugins', icon: 'expo', color: '9FB4C7' },
      { name: 'Kotlin & Swift modules', note: 'Expo Modules, Nitro, TurboModules', icon: 'kotlin', color: '7F52FF' },
      { name: 'Twilio Video', note: 'Audio, video, group calls', icon: null },
      { name: 'Native platform APIs', note: 'CallKit, ConnectionService, NFC, widgets', icon: 'android', color: '3DDC84' },
    ],
    also: 'Reanimated, Skia, MMKV, Zustand, OpenVPN, Play Billing, AdMob, Play Console',
  },
  {
    title: 'Web',
    items: [
      { name: 'TypeScript', note: 'Default for every project', icon: 'typescript', color: '3178C6' },
      { name: 'Next.js', note: 'Sammanté, DBL Go admin, Chain VPN admin', icon: 'nextdotjs', color: '8A8F98' },
      { name: 'React', note: 'Hooks, server components, forms', icon: 'react', color: '61DAFB' },
      { name: 'Redux Toolkit & React Query', note: 'State and data fetching', icon: 'redux', color: '764ABC' },
      { name: 'Tailwind CSS', note: 'Design systems, responsive UI', icon: 'tailwindcss', color: '06B6D4' },
    ],
    also: 'HTML/CSS, Framer Motion, Zod, React Hook Form',
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js & Express', note: 'REST APIs, auth, webhooks', icon: 'nodedotjs', color: '5FA04E' },
      { name: 'NestJS', note: 'Modular TypeScript services', icon: 'nestjs', color: 'E0234E' },
      { name: 'Spring Boot', note: 'Java REST services', icon: 'springboot', color: '6DB33F' },
      { name: 'MongoDB', note: 'Mongoose, Prisma, Atlas', icon: 'mongodb', color: '47A248' },
      { name: 'PostgreSQL & MySQL', note: 'Relational schemas, SQL', icon: 'postgresql', color: '4169E1' },
    ],
    also: 'GraphQL, Socket.io, JWT, OAuth, Firebase Admin, Stripe, OpenAI API, WhatsApp Business API',
  },
  {
    title: 'Tooling & delivery',
    items: [
      { name: 'Git & GitHub', note: 'PR workflow, 1,900+ commits on one repo', icon: 'git', color: 'F05032' },
      { name: 'Docker & Nginx', note: 'Containers, reverse proxy, deploys', icon: 'docker', color: '2496ED' },
      { name: 'Firebase', note: 'FCM, Crashlytics, Analytics', icon: 'firebase', color: 'DD2C00' },
      { name: 'Jest & Maestro', note: 'Unit and end-to-end mobile tests', icon: 'jest', color: 'C21325' },
      { name: 'Vercel & cloud servers', note: 'Web hosting, VPS deployment', icon: 'vercel', color: '8A8F98' },
    ],
    also: 'Languages: TypeScript, JavaScript, Python, Java, Kotlin, C/C++, PHP, SQL',
  },
];
