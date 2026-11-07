import { useLanguage } from '../i18n/LanguageContext'
import { blogPosts } from '../data/blog'
import { blogPath, routePath } from '../data/navigation'
import { formatDate } from '../utils/format'
import { ButtonLink } from '../components/ui/Button'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { SEO } from '../components/ui/SEO'

export function BlogPage() {
  const { language, t } = useLanguage()
  const posts = blogPosts.filter((post) => post.lang === language)

  return (
    <>
      <SEO title={`${t.blog.meta.title} | Wisata Jogjaku`} description={t.blog.meta.description} />
      <PageHero eyebrow={t.blog.listing.eyebrow} title={t.blog.listing.title} description={t.blog.listing.description} image="/images/photography/journey-13-1280.webp" />
      <section className="section-space bg-ivory">
        <div className="site-container">
          <p className="mb-8 text-sm text-muted">{t.blog.listing.resultCount.replace('{count}', String(posts.length))}</p>
          {posts.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {posts.map((post, index) => (
                <Reveal delay={index * 0.04} key={post.slug}>
                  <article className="group overflow-hidden rounded-[2rem] border border-sand bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift">
                    <div className="relative overflow-hidden">
                      <img alt={post.title} className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" src={post.image} />
                      <p className="absolute left-5 top-5 rounded-full bg-ivory/90 px-4 py-2 text-xs font-semibold text-forest">{post.category}</p>
                    </div>
                    <div className="p-7 sm:p-8">
                      <p className="text-sm text-muted">{formatDate(post.date, language)}</p>
                      <h2 className="display-title mt-3 text-4xl text-forest">{post.title}</h2>
                      <p className="mt-4 leading-relaxed text-muted">{post.description}</p>
                      <div className="mt-7 flex flex-wrap gap-3">
                        <ButtonLink to={blogPath(post.slug, language)} variant="primary" showArrow>{t.blog.listing.readMore}</ButtonLink>
                        <ButtonLink to={routePath('packages', language)} variant="secondary">{t.blog.empty.cta}</ButtonLink>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-sand bg-white p-10 text-center">
              <h2 className="display-title text-4xl text-forest">{t.blog.empty.title}</h2>
              <p className="mt-3 text-muted">{t.blog.empty.description}</p>
              <ButtonLink to={routePath('packages', language)} variant="primary" className="mt-6">{t.blog.empty.cta}</ButtonLink>
            </div>
          )}
        </div>
      </section>
    </>
  )
}


