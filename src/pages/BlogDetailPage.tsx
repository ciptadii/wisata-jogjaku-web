import { useLanguage } from '../i18n/LanguageContext'
import { getBlogPost, getRelatedPosts } from '../data/blog'
import { useParams } from 'react-router-dom'
import { blogPath, routePath } from '../data/navigation'
import { formatDate } from '../utils/format'
import { contactLink } from '../utils/whatsapp'
import { ButtonLink } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SEO } from '../components/ui/SEO'

export function BlogDetailPage() {
  const { language, t } = useLanguage()
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getBlogPost(slug, language) : undefined

  if (!post) {
    return (
      <div className="grid min-h-screen place-items-center bg-ivory px-6 text-center">
        <SEO title={`${t.blog.detail.notFoundTitle} | Wisata Jogjaku`} description={t.blog.detail.notFoundDescription} />
        <div>
          <h1 className="display-title text-5xl text-forest">{t.blog.detail.notFoundTitle}</h1>
          <p className="mt-4 text-muted">{t.blog.detail.notFoundDescription}</p>
          <ButtonLink to={routePath('blog', language)} variant="primary" className="mt-8">{t.blog.detail.backToBlog}</ButtonLink>
        </div>
      </div>
    )
  }

  const Content = post.Content
  const related = getRelatedPosts(post, 2)

  return (
    <>
      <SEO
        title={`${post.title} | Wisata Jogjaku`}
        description={post.description}
        image={post.image}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          image: `https://wisatajogjaku.com${post.image}`,
          author: { '@type': 'Organization', name: 'Wisata Jogjaku' },
          publisher: { '@type': 'Organization', name: 'Wisata Jogjaku' },
        }}
      />
      <section className="relative overflow-hidden bg-forest pt-36 text-ivory">
        <img alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35" src={post.image} />
        <div className="absolute inset-0 bg-forest/60" />
        <div className="site-container relative section-space">
          <p className="text-xs font-bold tracking-[0.24em] uppercase text-sand">{post.category}</p>
          <h1 className="display-title mt-5 max-w-5xl text-[clamp(3rem,7vw,6rem)]">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-ivory/75">{post.description}</p>
          <p className="mt-6 text-sm text-ivory/65">{t.blog.detail.publishedLabel} {formatDate(post.date, language)}</p>
        </div>
      </section>

      <article className="bg-ivory">
        <div className="site-container py-16">
          <div className="prose-jogja mx-auto">
            <Content />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-white">
          <div className="site-container section-space">
            <h2 className="display-title text-4xl text-forest">{t.blog.detail.relatedTitle}</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {related.map((item) => (
                <Reveal className="group relative overflow-hidden rounded-[2rem]" key={item.slug}>
                  <img alt={item.title} className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" src={item.image} />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
                    <p className="text-sm text-ivory/70">{formatDate(item.date, language)} · {item.category}</p>
                    <h3 className="display-title mt-3 text-3xl">{item.title}</h3>
                    <ButtonLink to={blogPath(item.slug, language)} variant="light" className="mt-5" showArrow>{t.blog.listing.readMore}</ButtonLink>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-space bg-forest text-ivory">
        <div className="site-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="display-title text-4xl">{t.contact.form.title}</h2>
            <p className="mt-4 max-w-2xl text-ivory/75">{t.contact.index.description}</p>
          </div>
          <ButtonLink href={contactLink(language)} variant="light">{t.common.contactUs}</ButtonLink>
        </div>
      </section>
    </>
  )
}
