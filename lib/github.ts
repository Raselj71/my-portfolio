import { site } from './site';

const SIX_HOURS = 6 * 60 * 60;

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              color: string;
            }[];
          }[];
        };
      };
    };
  };
  errors?: { message: string }[];
};

export type ContributionDay = {
  date: string;
  count: number;
};

export type ContributionWeek = ContributionDay[];

export type RecentRepo = {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  pushedAt: string;
  stars: number;
};

const GRAPHQL_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export async function fetchContributions(): Promise<{
  weeks: ContributionWeek[];
  total: number;
} | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return null;
  }

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'rasel-portfolio',
      },
      body: JSON.stringify({
        query: GRAPHQL_QUERY,
        variables: { login: site.github.username },
      }),
      next: { revalidate: SIX_HOURS },
    });

    if (!res.ok) return null;
    const json = (await res.json()) as GraphQLResponse;
    const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;

    return {
      total: cal.totalContributions,
      weeks: cal.weeks.map((w) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
        })),
      ),
    };
  } catch {
    return null;
  }
}

export async function fetchRecentRepos(): Promise<RecentRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'rasel-portfolio',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${site.github.username}/repos?sort=pushed&per_page=6&type=owner`,
      {
        headers,
        next: { revalidate: SIX_HOURS },
      },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as Array<{
      name: string;
      html_url: string;
      description: string | null;
      language: string | null;
      pushed_at: string;
      stargazers_count: number;
      fork: boolean;
      archived: boolean;
    }>;
    return data
      .filter((r) => !r.fork && !r.archived)
      .slice(0, 3)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        pushedAt: r.pushed_at,
        stars: r.stargazers_count,
      }));
  } catch {
    return [];
  }
}
