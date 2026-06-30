import { NextResponse } from "next/server";
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

export async function GET() {
  try {
    const userRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        next: { revalidate: 3600 }, // cache for 1 hour
      },
    );
    const user = await userRes.json();

    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      { next: { revalidate: 3600 } },
    );
    const repos = await reposRes.json();

    // Calculate total stars across all repos
    const totalStars = repos.reduce(
      (sum: number, repo: { stargazers_count: number }) =>
        sum + repo.stargazers_count,
      0,
    );

    // Get top 3 repos sorted by stars
    const topRepos = [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        language: repo.language,
        url: repo.html_url,
      }));

    return NextResponse.json({
      username: user.login,
      avatar: user.avatar_url,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      totalStars,
      topRepos,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 },
    );
  }
}
