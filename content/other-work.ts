export type OtherWorkEntry = {
  title: string;
  stack: string[];
  year?: number;
  github?: string | null;
  live?: string | null;
  note?: string;
};

export const otherWork: OtherWorkEntry[] = [
  {
    title: 'All Document Reader',
    stack: ['Android'],
    note: 'Evolution of PDF Reader. Stack details to be added.',
    github: null,
    live: null,
  },
  {
    title: 'Foodi — Restaurant Landing Page',
    stack: ['React', 'Tailwind', 'Next.js', 'TypeScript'],
    github: 'https://github.com/Raselj71/Foodi-React-website.git',
    live: 'https://foodi-react-website-my759jqs3-raselj71s-projects.vercel.app',
  },
  {
    title: 'REST API — Express + MySQL',
    stack: ['Node.js', 'Express', 'MySQL'],
    github:
      'https://github.com/Raselj71/Rest-API-using-Express-and-MySql-Database',
    live: null,
  },
  {
    title: 'EMI & Loan Calculator',
    stack: ['Java', 'Android', 'SQLite'],
    github: 'https://github.com/Raselj71/EMI_Calculator.git',
    live: null,
  },
  {
    title: 'Job Board',
    stack: ['PHP', 'MySQL', 'Bootstrap'],
    github: 'https://github.com/Raselj71/Job-board',
    live: null,
  },
  {
    title: 'This Portfolio',
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/Raselj71/my-portfolio',
    live: null,
  },
];
