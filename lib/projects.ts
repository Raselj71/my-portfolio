export type ProjectLink = { label: string; href: string; external: boolean };

export type Project = {
  slug: 'task-a-task' | 'sammante' | 'chain-vpn';
  kind: string;
  period: string;
  title: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
  media: 'phone' | 'browser' | 'browser-phone';
};

export const TASKATASK_PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.taska.task';

export const projects: Project[] = [
  {
    slug: 'task-a-task',
    kind: 'Mobile app · Android, iOS, Web · Dhrubok Info Tech',
    period: '2025 – Present',
    title: 'TaskATask — Work Together',
    description:
      'Team task management with templates, hand-offs, group chat, and voice and video calls. I lead the mobile app and built the calling feature end to end: Twilio Video rooms, CallKit and PushKit on iOS, ConnectionService on Android, picture-in-picture, and live transcripts.',
    tags: ['Expo', 'React Native', 'Twilio Video', 'CallKit', 'ConnectionService', 'Firebase'],
    links: [
      { label: 'Google Play', href: TASKATASK_PLAY_URL, external: true },
      { label: 'Case study', href: '/work/task-a-task', external: false },
    ],
    media: 'phone',
  },
  {
    slug: 'sammante',
    kind: 'SaaS platform · Web · Dhrubok Info Tech',
    period: 'Apr – Jul 2025',
    title: 'Sammanté — Health Insurance SaaS',
    description:
      'White-label, multi-tenant platform for insurers and HR firms: onboarding, AI document extraction, claims validation, billing, and WhatsApp and email automation.',
    tags: ['Next.js', 'TypeScript', 'AI/OCR', 'WhatsApp API'],
    links: [
      { label: 'Live platform', href: 'https://portal.sammante.sn/auth/sign-in', external: true },
      { label: 'Case study', href: '/work/sammante', external: false },
    ],
    media: 'browser',
  },
  {
    slug: 'chain-vpn',
    kind: 'Mobile app · Admin panel · npm library · Client',
    period: 'Mar – May 2026',
    title: 'Chain VPN',
    description:
      'End-to-end VPN product: React Native app with OpenVPN, Play Billing subscriptions, and AdMob; a Next.js 15 admin panel with Prisma; and react-native-ovpn, an open-source TurboModule published to npm.',
    tags: ['React Native', 'Expo', 'Next.js 15', 'Prisma', 'OpenVPN'],
    links: [
      { label: 'react-native-ovpn on npm', href: 'https://www.npmjs.com/package/react-native-ovpn', external: true },
      { label: 'GitHub', href: 'https://github.com/Raselj71/react-native-ovpn', external: true },
      { label: 'Case study', href: '/work/chain-vpn', external: false },
    ],
    media: 'browser-phone',
  },
];
