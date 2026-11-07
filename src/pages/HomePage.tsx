import { Heart, ShieldCheck, Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { customTripLink, contactLink } from '../utils/whatsapp'
import { photographyImage } from '../utils/media'
import { routePath, blogPath } from '../data/navigation'
import { vehicles } from '../data/vehicles'
import { tourPackages, packageCategories } from '../data/packages'
import { testimonials } from '../data/testimonials'
import { galleryItems } from '../data/gallery'
import { blogPosts } from '../data/blog'
import { formatDate, formatIDR } from '../utils/format'
import { ButtonLink } from '../components/ui/Button'
import { PackageCard } from '../components/cards/PackageCard'
import { VehicleCard } from '../components/cards/VehicleCard'
import { TestimonialCard } from '../components/cards/TestimonialCard'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { SEO } from '../components/ui/SEO'

export function HomePage() {
  const { language, t, localize } = useLanguage()
  const introImage = photographyImage('destination-02', { id: 'Perjalanan wisata bersama Wisata Jogjaku', en: 'Tour journey with Wisata Jogjaku' })
  const blog = blogPosts.filter((post) => post.lang === language).slice(0, 2)
  const featuredVehicles = vehicles.filter((vehicle) => ['calya', 'all-new-avanza', 'hiace-premio'].includes(vehicle.slug)).slice(0, 3)

  return (
    <>
      <SEO
        title={language === 'id' ? 'Paket Wisata Jogja & Sewa Mobil dengan Sopir | Wisata Jogjaku' : 'Yogyakarta Tour Packages & Car Rental with Driver | Wisata Jogjaku'}
        description={t.home.hero.description}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TravelAgency',
          name: 'Wisata Jogjaku',
          url: 'https://wisatajogjaku.com',
          telephone: '+62-851-5660-0546',
          address: 'Jl. Pramuka, Besi, Sidoarum, Godean, Sleman, Yogyakarta 55264',
        }}
      />
      <section className="relative flex min-h-[96svh] items-end overflow-hidden bg-forest pb-16 pt-40 text-ivory sm:min-h-svh sm:pb-24 lg:items-center">
        <div className="absolute inset-0">
          <img
            alt={t.home.hero.imageAlt}
            className="h-full w-full object-cover"
            decoding="async"
            fetchPriority="high"
            sizes="100vw"
            src="/images/photography/jogja-landscape-1280.webp"
            srcSet="/images/photography/jogja-landscape-768.webp 768w, /images/photography/jogja-landscape-1280.webp 1280w, /images/photography/jogja-landscape-1920.webp 1920w"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest/35 to-forest/20" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
        </div>
        <div className="site-container relative">
          <Reveal>
            <p className="mb-4 text-xs font-bold tracking-[0.28em] uppercase text-sand">Wisata Jogjaku</p>
            <h1 className="display-title max-w-6xl text-[clamp(3.5rem,9vw,8.5rem)]">{t.home.hero.title}</h1>
            <p className="editorial-copy mt-6 max-w-2xl text-base text-ivory/80 sm:text-xl">{t.home.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={customTripLink(language)} variant="light" showArrow>{t.home.hero.primaryCta}</ButtonLink>
              <ButtonLink href={routePath('packages', language)} variant="ghost">{t.home.hero.secondaryCta}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space bg-ivory">
        <div className="site-container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-[2rem]">
              <img
                alt={localize(introImage.alt)}
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/5]"
                decoding="async"
                loading="lazy"
                sizes="(min-width: 1024px) 45vw, 100vw"
                src="/images/photography/destination-02-1280.webp"
                srcSet="/images/photography/destination-02-768.webp 768w, /images/photography/destination-02-1280.webp 1280w, /images/photography/destination-02-1920.webp 1920w"
              />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-3xl bg-white p-6 shadow-lift max-w-[260px]">
              <p className="display-title text-4xl text-forest">{tourPackages.length}+</p>
              <p className="mt-1 text-sm text-muted">{t.home.categories.packageCount.replace('{count}', String(tourPackages.length))}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow={t.home.introduction.eyebrow} title={t.home.introduction.title} description={t.home.introduction.description} />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to={routePath('about', language)} variant="primary">{t.home.introduction.cta}</ButtonLink>
              <ButtonLink href={contactLink(language)} variant="secondary">{t.common.contactUs}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space bg-sand-light">
        <div className="site-container">
          <SectionHeading align="center" eyebrow={t.home.categories.eyebrow} title={t.home.categories.title} description={t.home.categories.description} />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {packageCategories.map((category) => (
              <Reveal className="group relative overflow-hidden rounded-[2rem]" key={category.slug}>
                <div className="overflow-hidden bg-sand-light">
                  <img
                    alt={localize(category.image.alt)}
                    className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    decoding="async"
                    loading="lazy"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    src={`/images/packages/${category.slug}-640.webp`}
                    srcSet={`/images/packages/${category.slug}-640.webp 640w, /images/packages/${category.slug}-1024.webp 1024w`}
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
                  <p className="text-sm text-ivory/70">{category.count}</p>
                  <h3 className="display-title mt-2 text-4xl">{localize(category.name)}</h3>
                  <p className="mt-3 text-lg font-semibold">{formatIDR(category.priceFrom, language)}</p>
                  <ButtonLink to={`/paket-wisata-${category.days}-hari/`} variant="light" className="mt-5" showArrow>{t.home.categories.cta}</ButtonLink>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {tourPackages.slice(0, 3).map((pkg) => <PackageCard key={pkg.slug} pkg={pkg} />)}
          </div>
        </div>
      </section>

      <section className="section-space bg-forest text-ivory">
        <div className="site-container grid items-end gap-8 lg:grid-cols-2">
          <SectionHeading eyebrow={t.home.customTrip.eyebrow} title={t.home.customTrip.title} description={t.home.customTrip.description} inverse />
          <Reveal>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href={customTripLink(language)} variant="light" showArrow>{t.home.customTrip.cta}</ButtonLink>
              <ButtonLink href={contactLink(language)} variant="ghost">{t.common.contactUs}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space bg-ivory">
        <div className="site-container">
          <SectionHeading eyebrow={t.home.featuredVehicles.eyebrow} title={t.home.featuredVehicles.title} description={t.home.featuredVehicles.description} />
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredVehicles.map((vehicle) => <VehicleCard key={vehicle.slug} vehicle={vehicle} />)}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink to={routePath('rental', language)} variant="primary">{t.home.featuredVehicles.cta}</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading align="center" eyebrow={t.home.whyChooseUs.eyebrow} title={t.home.whyChooseUs.title} description={t.home.whyChooseUs.description} />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              { icon: Heart, item: t.home.whyChooseUs.affordable },
              { icon: ShieldCheck, item: t.home.whyChooseUs.professional },
              { icon: Sparkles, item: t.home.whyChooseUs.trustworthy },
            ].map(({ icon: Icon, item }) => (
              <Reveal className="rounded-[2rem] border border-sand bg-ivory p-8" key={item.title}>
                <Icon aria-hidden="true" className="text-terracotta" size={28} />
                <h3 className="display-title mt-5 text-3xl text-forest">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-ivory">
        <div className="site-container">
          <SectionHeading eyebrow={t.home.testimonials.eyebrow} title={t.home.testimonials.title} description={t.home.testimonials.description} />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {testimonials.map((testimonial) => <TestimonialCard key={testimonial.id} testimonial={testimonial} />)}
          </div>
        </div>
      </section>

      <section className="section-space bg-sand-light">
        <div className="site-container">
          <SectionHeading eyebrow={t.home.gallery.eyebrow} title={t.home.gallery.title} description={t.home.gallery.description} />
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryItems.slice(0, 8).map((item, index) => (
              <Reveal className={`overflow-hidden rounded-[1.5rem] ${index % 5 === 0 ? 'row-span-2' : ''}`} delay={index * 0.03} key={item.id}>
                <img
                  alt={localize(item.image.alt)}
                  className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  decoding="async"
                  loading="lazy"
                  sizes="(min-width: 768px) 25vw, 50vw"
                  src={`/images/photography/${item.id}-768.webp`}
                  srcSet={`/images/photography/${item.id}-768.webp 768w, /images/photography/${item.id}-1280.webp 1280w`}
                />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink to={routePath('gallery', language)} variant="primary">{t.home.gallery.cta}</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading eyebrow={t.home.blog.eyebrow} title={t.home.blog.title} description={t.home.blog.description} />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {blog.map((post) => (
              <article className="group relative overflow-hidden rounded-[2rem]" key={post.slug}>
                <img
                  alt={post.title}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  decoding="async"
                  loading="lazy"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  src={post.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
                  <p className="text-sm text-ivory/70">{formatDate(post.date, language)} · {post.category}</p>
                  <h3 className="display-title mt-3 text-3xl">{post.title}</h3>
                  <ButtonLink to={blogPath(post.slug, language)} variant="light" className="mt-5" showArrow>{t.blog.listing.readMore}</ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-forest text-ivory">
        <div className="site-container text-center">
          <SectionHeading align="center" eyebrow={t.home.finalCta.eyebrow} title={t.home.finalCta.title} description={t.home.finalCta.description} inverse />
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href={contactLink(language)} variant="light">{t.home.finalCta.primaryCta}</ButtonLink>
            <ButtonLink to={routePath('packages', language)} variant="ghost">{t.home.finalCta.secondaryCta}</ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
