/**
 * Sync GitHub releases into blog posts and refresh project card stats.
 *
 * - Fetches releases for each tracked repo and creates a post under
 *   src/content/posts/<slug>-<version>/index.md for releases published
 *   after CUTOFF that don't have a post yet (drafts/prereleases skipped).
 * - Updates star/fork counts in src/content/projects/<name>/index.mdx.
 *
 * Auth is optional: set GITHUB_TOKEN to raise the API rate limit.
 * Run: pnpm tsx scripts/sync-releases.ts
 */
import fs from 'node:fs'
import path from 'node:path'

interface TrackedRepo {
  repo: string
  postSlug: string
  tag: string
  projectDir: string
}

const REPOS: TrackedRepo[] = [
  { repo: 'Nemu-x/SlothClash', postSlug: 'slothclash', tag: 'slothclash', projectDir: 'SlothClash' },
  { repo: 'Nemu-x/ClashFest', postSlug: 'clashfest', tag: 'clashfest', projectDir: 'ClashFest' },
  {
    repo: 'Nemu-x/SwissKnife-for-MS-Graph',
    postSlug: 'swissknife',
    tag: 'swissknife',
    projectDir: 'SwissKnife',
  },
]

// Releases published before this date are never backfilled.
const CUTOFF = new Date('2026-07-01T00:00:00Z')

const ROOT = path.resolve(import.meta.dirname, '..')
const POSTS_DIR = path.join(ROOT, 'src', 'content', 'posts')
const PROJECTS_DIR = path.join(ROOT, 'src', 'content', 'projects')

interface Release {
  tag_name: string
  name: string | null
  body: string | null
  html_url: string
  published_at: string
  draft: boolean
  prerelease: boolean
}

async function api<T>(endpoint: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const res = await fetch(`https://api.github.com${endpoint}`, { headers })
  if (!res.ok) throw new Error(`GitHub API ${endpoint} failed: ${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

function versionSlug(tagName: string): string {
  return tagName
    .replace(/^v/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function cleanBody(body: string): string {
  return body
    .replace(/\r\n/g, '\n')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim()
}

/** First meaningful text line of the release notes, de-markdowned, for the description. */
function extractDescription(body: string, fallback: string): string {
  for (const raw of body.split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('#') || line.startsWith('!') || line.startsWith('|')) continue
    const text = line
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[*_`>]/g, '')
      .trim()
    if (text.length < 10) continue
    return text.length > 160 ? `${text.slice(0, 157)}...` : text
  }
  return fallback
}

function buildPost(entry: TrackedRepo, release: Release): string {
  const name = (release.name ?? '').trim() || `${entry.projectDir} ${release.tag_name}`
  const body = cleanBody(release.body ?? '')
  const description = extractDescription(body, `${name} is out — release notes inside.`)
  const pubDate = release.published_at.slice(0, 10)

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(name)}`,
    `description: ${JSON.stringify(description)}`,
    `pubDate: ${pubDate}`,
    `author: 'Nemu-x'`,
    `tags: ['${entry.tag}', 'release']`,
    '---',
  ].join('\n')

  const intro = `[${name}](${release.html_url}) is out.`
  const outro = `Downloads and full notes on GitHub: [${release.tag_name}](${release.html_url})`

  return `${frontmatter}\n\n${intro}\n\n${body}\n\n---\n\n${outro}\n`
}

async function syncPosts(entry: TrackedRepo): Promise<string[]> {
  const releases = await api<Release[]>(`/repos/${entry.repo}/releases?per_page=10`)
  const created: string[] = []
  for (const release of releases) {
    if (release.draft || release.prerelease) continue
    if (new Date(release.published_at) < CUTOFF) continue
    const dir = path.join(POSTS_DIR, `${entry.postSlug}-${versionSlug(release.tag_name)}`)
    if (fs.existsSync(dir)) continue
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.md'), buildPost(entry, release))
    created.push(path.relative(ROOT, dir))
  }
  return created
}

async function syncProjectStats(entry: TrackedRepo): Promise<void> {
  const file = path.join(PROJECTS_DIR, entry.projectDir, 'index.mdx')
  if (!fs.existsSync(file)) return
  const info = await api<{ stargazers_count: number; forks_count: number }>(`/repos/${entry.repo}`)
  const updated = fs
    .readFileSync(file, 'utf8')
    .replace(/^star: \d+$/m, `star: ${info.stargazers_count}`)
    .replace(/^fork: \d+$/m, `fork: ${info.forks_count}`)
  fs.writeFileSync(file, updated)
}

const createdAll: string[] = []
for (const entry of REPOS) {
  createdAll.push(...(await syncPosts(entry)))
  await syncProjectStats(entry)
}

if (createdAll.length) {
  console.log(`Created ${createdAll.length} post(s):`)
  for (const dir of createdAll) console.log(`  ${dir}`)
} else {
  console.log('No new releases.')
}
console.log('Project stats refreshed.')
