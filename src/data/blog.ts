import type { ComponentType } from 'react'

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  category: string
  image: string
  lang: 'id' | 'en'
  slug: string
  translationKey: string
}

type BlogModule = {
  default: ComponentType
  frontmatter: BlogFrontmatter
}

export type BlogPost = BlogFrontmatter & {
  Content: ComponentType
}

const blogModules = import.meta.glob('../content/blog/*.mdx', {
  eager: true,
}) as Record<string, BlogModule>

export const blogPosts: BlogPost[] = Object.values(blogModules)
  .map(({ default: Content, frontmatter }) => ({ ...frontmatter, Content }))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.slug.localeCompare(b.slug))

export function getBlogPost(slug: string, lang: BlogFrontmatter['lang']) {
  return blogPosts.find((post) => post.slug === slug && post.lang === lang)
}

export function getRelatedPosts(post: BlogPost, limit = 2) {
  return blogPosts
    .filter(
      (candidate) =>
        candidate.lang === post.lang && candidate.translationKey !== post.translationKey,
    )
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, Math.max(0, limit))
}

export function getBlogAlternate(translationKey: string, lang: BlogFrontmatter['lang']) {
  return blogPosts.find(
    (post) => post.translationKey === translationKey && post.lang === lang,
  )
}
