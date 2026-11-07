import { Navigate, useLocation } from 'react-router-dom'
import { redirects } from '../data/redirects'

export function RedirectManager() {
  const { pathname } = useLocation()
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`
  const target = redirects[normalized] || redirects[pathname]

  if (target) return <Navigate replace to={target} />
  return <Navigate replace to="/" />
}
