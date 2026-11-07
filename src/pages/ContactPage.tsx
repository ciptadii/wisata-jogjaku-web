import { AlertCircle, CheckCircle2, Loader2, MapPin, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { siteConfig } from '../data/site'
import { whatsAppLink } from '../utils/whatsapp'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { SEO } from '../components/ui/SEO'

interface FormValues {
  name: string
  email: string
  phone: string
  message: string
}

interface Errors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const emptyValues: FormValues = { name: '', email: '', phone: '', message: '' }

function validate(values: FormValues, language: 'id' | 'en'): Errors {
  const t = language === 'id' ? {
    nameRequired: 'Masukkan nama Anda.',
    nameTooShort: 'Nama terlalu pendek.',
    emailRequired: 'Masukkan alamat email Anda.',
    emailInvalid: 'Masukkan alamat email yang valid.',
    phoneRequired: 'Masukkan nomor telepon Anda.',
    phoneInvalid: 'Masukkan nomor telepon yang valid.',
    messageRequired: 'Tuliskan pesan Anda.',
    messageTooShort: 'Tuliskan sedikit lebih banyak detail agar kami dapat membantu Anda.',
  } : {
    nameRequired: 'Enter your name.',
    nameTooShort: 'Your name is too short.',
    emailRequired: 'Enter your email address.',
    emailInvalid: 'Enter a valid email address.',
    phoneRequired: 'Enter your phone number.',
    phoneInvalid: 'Enter a valid phone number.',
    messageRequired: 'Write your message.',
    messageTooShort: 'Add a few more details so we can help.',
  }

  const errors: Errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const phone = values.phone.trim()
  const message = values.message.trim()

  if (!name) errors.name = t.nameRequired
  else if (name.length < 2) errors.name = t.nameTooShort

  if (!email) errors.email = t.emailRequired
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = t.emailInvalid

  if (!phone) errors.phone = t.phoneRequired
  else if (!/^[\d\s()+-]{7,}$/.test(phone)) errors.phone = t.phoneInvalid

  if (!message) errors.message = t.messageRequired
  else if (message.length < 10) errors.message = t.messageTooShort

  return errors
}

function Field({
  id,
  label,
  placeholder,
  value,
  error,
  type = 'text',
  multiline = false,
  optional = false,
  optionalLabel,
  onChange,
}: {
  id: string
  label: string
  placeholder: string
  value: string
  error?: string
  type?: string
  multiline?: boolean
  optional?: boolean
  optionalLabel?: string
  onChange: (value: string) => void
}) {
  const fieldClasses = `w-full rounded-2xl border bg-white px-5 py-3.5 text-base text-charcoal outline-none transition-colors placeholder:text-muted/60 ${error ? 'border-red-400' : 'border-sand focus:border-forest'}`

  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-forest" htmlFor={id}>
        {label}
        {optional && optionalLabel && <span className="text-xs font-normal text-muted">({optionalLabel})</span>}
      </label>
      {multiline ? (
        <textarea
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={Boolean(error)}
          className="min-h-32 w-full rounded-2xl border border-sand bg-white px-5 py-3.5 text-base text-charcoal outline-none transition-colors placeholder:text-muted/60 focus:border-forest"
          id={id}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          value={value}
        />
      ) : (
        <input
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={Boolean(error)}
          autoComplete={id === 'name' ? 'name' : id === 'email' ? 'email' : 'tel'}
          className={fieldClasses}
          id={id}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      )}
      {error && (
        <p className="mt-2 flex items-center gap-2 text-sm text-red-700" id={`${id}-error`}>
          <AlertCircle aria-hidden="true" size={16} />
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactPage() {
  const { language, t } = useLanguage()
  const [values, setValues] = useState<FormValues>(emptyValues)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const update = (key: keyof FormValues) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validate(values, language)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) {
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']")
      first?.focus()
      return
    }

    setStatus('submitting')

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 450))

      const message = language === 'id'
        ? `Halo Wisata Jogjaku, nama saya ${values.name.trim()}. Saya ingin bertanya tentang layanan Anda. Pesan saya: ${values.message.trim()}${values.email.trim() ? ` Email saya: ${values.email.trim()}.` : ''} Terima kasih.`
        : `Hello Wisata Jogjaku, my name is ${values.name.trim()}. I would like to ask about your services. My message: ${values.message.trim()}${values.email.trim() ? ` My email is ${values.email.trim()}.` : ''} Thank you.`

      const link = document.createElement('a')
      link.href = whatsAppLink(message)
      link.target = '_blank'
      link.rel = 'noreferrer'
      document.body.appendChild(link)
      link.click()
      link.remove()

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SEO title={`${t.contact.meta.title} | Wisata Jogjaku`} description={t.contact.meta.description} />
      <PageHero eyebrow={t.contact.index.eyebrow} title={t.contact.index.title} description={t.contact.index.description} image="/images/photography/journey-15-1280.webp" />
      <section className="section-space bg-ivory">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="rounded-[2rem] bg-forest p-8 text-ivory sm:p-10">
              <h2 className="display-title text-4xl">{t.contact.index.infoTitle}</h2>
              <div className="mt-8 space-y-7">
                <div className="flex gap-4">
                  <MapPin aria-hidden="true" className="mt-1 shrink-0" size={22} />
                  <div>
                    <p className="text-sm text-ivory/60">{t.contact.index.addressLabel}</p>
                    <p className="mt-2 leading-relaxed">{siteConfig.address}</p>
                    <a className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-sand hover:text-white" href={siteConfig.mapsUrl} rel="noreferrer" target="_blank">
                      {t.contact.index.mapsCta}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MessageCircle aria-hidden="true" className="mt-1 shrink-0" size={22} />
                  <div>
                    <p className="text-sm text-ivory/60">{t.contact.index.whatsappLabel}</p>
                    <a className="mt-2 block font-semibold" href={whatsAppLink(language === 'id' ? 'Halo Wisata Jogjaku' : 'Hello Wisata Jogjaku')} rel="noreferrer" target="_blank">
                      {siteConfig.whatsappDisplay}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <svg aria-hidden="true" className="mt-1 shrink-0" height="22" viewBox="0 0 24 24" width="22"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.88 1.75a1.13 1.13 0 1 1 0 2.25 1.13 1.13 0 0 1 0-2.25ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" fill="currentColor"/></svg>
                  <div>
                    <p className="text-sm text-ivory/60">{t.contact.index.socialTitle}</p>
                    <a className="mt-2 block" href={siteConfig.social.instagram} rel="noreferrer" target="_blank">@wisatajogjaku_</a>
                    <a className="mt-1 block" href={siteConfig.social.tiktok} rel="noreferrer" target="_blank">@wisatajogjaku</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 overflow-hidden rounded-[2rem] border border-sand bg-sand-light">
              <iframe
                className="aspect-[16/10] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Jl.%20Pramuka%2C%20Besi%2C%20Sidoarum%2C%20Godean%2C%20Sleman%2C%20Yogyakarta%2055264&output=embed"
                title={t.contact.index.mapsCta}
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form className="rounded-[2rem] border border-sand bg-white p-7 shadow-soft sm:p-10" noValidate onSubmit={handleSubmit}>
              <h2 className="display-title text-4xl text-forest">{t.contact.form.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{t.contact.form.description}</p>

              <div className="mt-8 grid gap-6">
                <Field error={errors.name} id="contact-name" label={t.contact.form.nameLabel} onChange={update('name')} placeholder={t.contact.form.namePlaceholder} value={values.name} />
                <Field error={errors.email} id="contact-email" label={t.contact.form.emailLabel} onChange={update('email')} optional optionalLabel={t.contact.form.optionalLabel} placeholder={t.contact.form.emailPlaceholder} type="email" value={values.email} />
                <Field error={errors.phone} id="contact-phone" label={t.contact.form.phoneLabel} onChange={update('phone')} placeholder={t.contact.form.phonePlaceholder} type="tel" value={values.phone} />
                <Field error={errors.message} id="contact-message" label={t.contact.form.messageLabel} multiline onChange={update('message')} placeholder={t.contact.form.messagePlaceholder} value={values.message} />
              </div>

              <button
                className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-forest-deep disabled:cursor-wait disabled:opacity-70"
                disabled={status === 'submitting'}
                type="submit"
              >
                {status === 'submitting' && <Loader2 aria-hidden="true" className="animate-spin" size={18} />}
                {status === 'submitting' ? t.contact.form.submitting : t.contact.form.submit}
              </button>

              {status === 'success' && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl bg-forest/5 p-5 text-sm text-forest" role="status">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0" size={20} />
                  <div>
                    <p className="font-semibold">{t.contact.form.successTitle}</p>
                    <p className="mt-1 text-muted">{t.contact.form.successDescription}</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl bg-red-50 p-5 text-sm text-red-900" role="alert">
                  <AlertCircle aria-hidden="true" className="mt-0.5 shrink-0" size={20} />
                  <div>
                    <p className="font-semibold">{t.contact.form.errorTitle}</p>
                    <p className="mt-1">{t.contact.form.errorDescription}</p>
                  </div>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
