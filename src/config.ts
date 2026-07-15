import type {
  AnalyticsConfig,
  CommentConfig,
  GithubConfig,
  Link,
  PhotosConfig,
  PostConfig,
  ProjectConfig,
  Site,
  SkillsShowcaseConfig,
  SocialLink,
  TagsConfig,
} from '~/types'

const SIGNAL_URL =
  'https://signal.me/#eu/c3YCfUJcPYiBxGtZS9qHYkgGc97Dv19zGn5pUTJ_spA0rE1c1lJCpbwPBBXvnb6-'

const TELEGRAM_URL = 'https://t.me/nemux_dev'

export const SITE: Site = {
  title: 'Nemu-x Devlog',
  description: 'Dev notes and release announcements from Nemu-x — clients, tools, and whatever ships next.',
  website: 'https://nemu-x.github.io/nemux-pages/',
  lang: 'en',
  base: '/nemux-pages',
  author: 'Nemu-x',
  ogImage: '/og-image.webp',
  transition: false,
  themeAnimation: true,
}

export const HEADER_LINKS: Link[] = [
  { name: 'Posts', url: '/posts' },
  { name: 'Projects', url: '/projects' },
  { name: 'GitHub', url: 'https://github.com/Nemu-x' },
]

export const FOOTER_LINKS: Link[] = [
  { name: 'Home', url: '/' },
  { name: 'Posts', url: '/posts' },
  { name: 'Projects', url: '/projects' },
  { name: 'Tags', url: '/tags' },
  { name: 'Telegram', url: TELEGRAM_URL },
  { name: 'Signal', url: SIGNAL_URL },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'github',
    url: 'https://github.com/Nemu-x',
    icon: 'icon-[ri--github-fill]',
  },
  {
    name: 'telegram',
    url: TELEGRAM_URL,
    icon: 'icon-[simple-icons--telegram]',
  },
  {
    name: 'signal',
    url: SIGNAL_URL,
    icon: 'icon-[simple-icons--signal]',
  },
]

export const SKILLSSHOWCASE_CONFIG: SkillsShowcaseConfig = {
  SKILLS_ENABLED: true,
  SKILLS_DATA: [
    {
      direction: 'left',
      skills: [
        { name: 'Go', icon: 'icon-[simple-icons--go]', url: 'https://go.dev/' },
        { name: 'Kotlin', icon: 'icon-[skill-icons--kotlin-dark]', url: 'https://kotlinlang.org/' },
        { name: 'Android', icon: 'icon-[skill-icons--androidstudio-dark]', url: 'https://developer.android.com/' },
        { name: 'Linux', icon: 'icon-[skill-icons--ubuntu-dark]', url: 'https://ubuntu.com/' },
      ],
    },
    {
      direction: 'right',
      skills: [
        { name: 'Mihomo', icon: 'icon-[carbon--network-4]', url: 'https://github.com/MetaCubeX/mihomo' },
        { name: 'Networking', icon: 'icon-[mdi--lan-connect]', url: 'https://en.wikipedia.org/wiki/Computer_network' },
        { name: 'GitHub Actions', icon: 'icon-[skill-icons--githubactions-dark]', url: 'https://github.com/features/actions' },
        { name: 'Rust', icon: 'icon-[skill-icons--rust]', url: 'https://www.rust-lang.org/' },
      ],
    },
  ],
}

export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: true,
  GITHUB_USERNAME: 'Nemu-x',
  TOOLTIP_ENABLED: true,
}

export const POSTS_CONFIG: PostConfig = {
  title: 'Posts',
  description: 'Dev notes and release announcements by Nemu-x',
  introduce: 'Short updates on what ships.',
  author: 'Nemu-x',
  homePageConfig: {
    size: 2,
    type: 'compact',
  },
  postPageConfig: {
    size: 10,
    type: 'compact',
  },
  tagsPageConfig: {
    size: 10,
    type: 'time-line',
  },
  ogImageUseCover: false,
  postType: 'metaOnly',
  imageDarkenInDark: true,
  readMoreText: 'Read more',
  prevPageText: 'Previous',
  nextPageText: 'Next',
  tocText: 'On this page',
  backToPostsText: 'Back to Posts',
  nextPostText: 'Next Post',
  prevPostText: 'Previous Post',
  recommendText: 'REC',
  wordCountView: true,
}

export const COMMENT_CONFIG: CommentConfig = {
  enabled: false,
  system: 'gitalk',
  gitalk: {
    clientID: import.meta.env.PUBLIC_GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.PUBLIC_GITHUB_CLIENT_SECRET,
    repo: 'gitalk-comment',
    owner: 'Nemu-x',
    admin: ['Nemu-x'],
    language: 'en-US',
    perPage: 5,
    pagerDirection: 'last',
    createIssueManually: false,
    distractionFreeMode: false,
    enableHotKey: true,
  },
}

export const TAGS_CONFIG: TagsConfig = {
  title: 'Tags',
  description: 'All post tags',
  introduce: 'Filter posts by topic — releases, dev notes, and more.',
}

export const PROJECTS_CONFIG: ProjectConfig = {
  title: 'Projects',
  description: 'Open-source projects by Nemu-x',
  introduce: 'Featured projects — more repos join the lineup over time.',
}

export const PHOTOS_CONFIG: PhotosConfig = {
  title: 'Photos',
  description: '',
  introduce: '',
}

export const ANALYTICS_CONFIG: AnalyticsConfig = {
  vercount: {
    enabled: false,
  },
  umami: {
    enabled: false,
    websiteId: '',
    serverUrl: '',
  },
}
