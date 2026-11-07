/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react'

  export const frontmatter: {
    title: string
    description: string
    date: string
    category: string
    image: string
    lang: 'id' | 'en'
    slug: string
    translationKey: string
  }

  const MDXComponent: ComponentType
  export default MDXComponent
}
