export type App = {
  slug: string;
  name: string;
  category: string;
  status: 'live' | 'coming-soon';
  tagline: string;
  /** Public path to the icon, or null when no icon exists yet. */
  icon: string | null;
  url: string;
  urlLabel: 'Google Play' | 'View app';
};

const play = (id: string) =>
  `https://play.google.com/store/apps/details?id=${id}`;
const mint = (slug: string) => `https://mobilemint.vercel.app/apps/${slug}`;

export const apps: App[] = [
  {
    slug: 'deen',
    name: 'Deen',
    category: 'Lifestyle',
    status: 'live',
    tagline: 'Prayer times, Quran, and qibla. Bangla-first, works offline.',
    icon: '/apps/deen.png',
    url: play('com.mobilemint.deen'),
    urlLabel: 'Google Play',
  },
  {
    slug: 'pocket-scanner',
    name: 'Pocket Scanner',
    category: 'Productivity',
    status: 'live',
    tagline: 'Scan documents, edit and sign PDFs, fully offline.',
    icon: '/apps/pocket-scanner.png',
    url: play('com.mobilemint.pocketscanner'),
    urlLabel: 'Google Play',
  },
  {
    slug: 'feedlock',
    name: 'FeedLock',
    category: 'Productivity',
    status: 'live',
    tagline:
      'Blocks Reels and Shorts without uninstalling apps. Custom AccessibilityService.',
    icon: '/apps/feedlock.png',
    url: play('com.mobilemint.feedlock'),
    urlLabel: 'Google Play',
  },
  {
    slug: 'voice-recorder',
    name: 'AI Voice Recorder',
    category: 'Tools',
    status: 'live',
    tagline: 'Records meetings with on-device transcription. Nothing is uploaded.',
    icon: '/apps/voice-recorder.png',
    url: play('com.mobilemint.aivoicerecorder'),
    urlLabel: 'Google Play',
  },
  {
    slug: 'all-document-reader',
    name: 'All Document Reader',
    category: 'Productivity',
    status: 'live',
    tagline: 'Opens PDF, Word, Excel, PowerPoint, and text files.',
    icon: '/apps/all-document-reader.png',
    url: play('com.mobilemint.allfilereader'),
    urlLabel: 'Google Play',
  },
  {
    slug: 'metro-buddy',
    name: 'Metro Buddy',
    category: 'Navigation',
    status: 'live',
    tagline: 'Tap your Dhaka MRT or Rapid Pass card, see balance and trips. NFC.',
    icon: '/apps/metro-buddy.png',
    url: play('com.mobilemint.metrobuddy'),
    urlLabel: 'Google Play',
  },
  {
    slug: 'japan-train-card-balance-check',
    name: 'Japan Train Card Balance',
    category: 'Navigation',
    status: 'live',
    tagline: 'Suica, PASMO, and ICOCA balance and ride history. NFC.',
    icon: '/apps/japan-train-card-balance-check.png',
    url: play('com.mobilemint.japantraincardbalancecheck'),
    urlLabel: 'Google Play',
  },
  {
    slug: 'tmoney-balance',
    name: 'Korea Card Balance for T-money',
    category: 'Navigation',
    status: 'live',
    tagline: 'T-money and Cashbee balance in your currency, 9 languages. NFC.',
    icon: '/apps/tmoney-balance.png',
    url: play('com.mobilemint.tmoneybalance'),
    urlLabel: 'Google Play',
  },
  {
    slug: 'sg-card-balance',
    name: 'Singapore MRT Bus Card Balance',
    category: 'Navigation',
    status: 'live',
    tagline: 'EZ-Link and NETS FlashPay balance and trips, 4 languages. NFC.',
    icon: '/apps/sg-card-balance.png',
    url: play('com.mobilemint.sgcardbalance'),
    urlLabel: 'Google Play',
  },
  {
    slug: 'malaysia-transit-map',
    name: 'Malaysia MRT, LRT & Bus Map',
    category: 'Navigation',
    status: 'coming-soon',
    tagline:
      'Offline train and bus map for Kuala Lumpur with directions and live buses.',
    icon: '/apps/malaysia-transit-map.png',
    url: mint('malaysia-transit-map'),
    urlLabel: 'View app',
  },
  {
    slug: 'cards-29',
    name: 'Cards 29',
    category: 'Games',
    status: 'coming-soon',
    tagline:
      'The classic Twenty-Nine card game, offline against bots or online with friends.',
    icon: '/apps/cards-29.png',
    url: mint('cards-29'),
    urlLabel: 'View app',
  },
  {
    slug: 'golive-studio',
    name: 'GoLive Studio',
    category: 'Video',
    status: 'coming-soon',
    tagline: 'Stream camera or screen to YouTube and Facebook at the same time.',
    icon: null,
    url: mint('golive-studio'),
    urlLabel: 'View app',
  },
];

export const liveAppCount = apps.filter((a) => a.status === 'live').length;
export const inDevelopmentAppCount = apps.length - liveAppCount;
