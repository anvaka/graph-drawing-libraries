/**
 * Fetches GitHub statistics for every library in data/libraries.json and
 * writes them to data/stats.json. The website imports that file at build
 * time, so it needs no backend.
 *
 * Works without credentials (60 requests per hour), set GITHUB_TOKEN to lift
 * the limit: GITHUB_TOKEN=$(gh auth token) npm run stats
 *
 * If a repository cannot be fetched, its previous record is kept.
 */
import { readFile, writeFile } from 'node:fs/promises';

const librariesFile = new URL('../data/libraries.json', import.meta.url);
const statsFile = new URL('../data/stats.json', import.meta.url);

const libraries = JSON.parse(await readFile(librariesFile, 'utf8'));
const previous = await readPreviousStats();

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'graph-drawing-libraries-stats'
};
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const records = [];
const failed = [];

for (const library of libraries) {
  try {
    records.push(toRecord(library, await fetchRepository(library.repo)));
  } catch (error) {
    failed.push(library.repo);
    console.warn(`::warning::Could not fetch ${library.repo}: ${error.message}`);
    if (previous.has(library.repo)) records.push(previous.get(library.repo));
  }
}

if (failed.length === libraries.length) {
  console.error('No repository could be fetched, keeping the old stats.json');
  process.exit(1);
}

await writeFile(statsFile, JSON.stringify({
  generated: new Date().toISOString(),
  libraries: records
}, null, 2) + '\n');

console.log(`Saved ${records.length} libraries, ${failed.length} failed`);

async function fetchRepository(repo) {
  const response = await fetch(`https://api.github.com/repos/${repo}`, { headers });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}

function toRecord(library, repository) {
  const license = repository.license?.spdx_id;
  return {
    repo: library.repo,
    // Repositories get renamed, so the current name can differ from `repo`
    name: repository.full_name,
    url: repository.html_url,
    homepage: repository.homepage || null,
    description: repository.description || '',
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    // GitHub counts open pull requests as issues here
    issues: repository.open_issues_count,
    created: repository.created_at,
    pushed: repository.pushed_at,
    license: license && license !== 'NOASSERTION' ? license : (library.license || null),
    archived: repository.archived
  };
}

async function readPreviousStats() {
  try {
    const stats = JSON.parse(await readFile(statsFile, 'utf8'));
    return new Map(stats.libraries.map(record => [record.repo, record]));
  } catch {
    return new Map();
  }
}
