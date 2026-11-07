import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { AboutPage } from './pages/AboutPage'
import { BlogDetailPage } from './pages/BlogDetailPage'
import { BlogPage } from './pages/BlogPage'
import { ContactPage } from './pages/ContactPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { PackageDetailPage } from './pages/PackageDetailPage'
import { PackagesPage } from './pages/PackagesPage'
import { RedirectManager } from './pages/RedirectManager'
import { RentalPage } from './pages/RentalPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/tentang-kami/" element={<AboutPage />} />
        <Route path="/paket-wisata/" element={<PackagesPage />} />
        <Route path="/paket-wisata/:slug/" element={<PackageDetailPage />} />
        <Route path="/paket-wisata-1-hari/" element={<PackagesPage />} />
        <Route path="/paket-wisata-2-hari/" element={<PackagesPage />} />
        <Route path="/paket-wisata-3-hari/" element={<PackagesPage />} />
        <Route path="/rental-mobil/" element={<RentalPage />} />
        <Route path="/galeri/" element={<GalleryPage />} />
        <Route path="/blog/" element={<BlogPage />} />
        <Route path="/blog/:slug/" element={<BlogDetailPage />} />
        <Route path="/kontak-kami/" element={<ContactPage />} />
        <Route path="/en/" element={<HomePage />} />
        <Route path="/en/about-us/" element={<AboutPage />} />
        <Route path="/en/tour-packages/" element={<PackagesPage />} />
        <Route path="/en/tour-packages/:slug/" element={<PackageDetailPage />} />
        <Route path="/en/tour-packages/1-day/" element={<PackagesPage />} />
        <Route path="/en/tour-packages/2-days/" element={<PackagesPage />} />
        <Route path="/en/tour-packages/3-days/" element={<PackagesPage />} />
        <Route path="/en/car-rental/" element={<RentalPage />} />
        <Route path="/en/gallery/" element={<GalleryPage />} />
        <Route path="/en/blog/" element={<BlogPage />} />
        <Route path="/en/blog/:slug/" element={<BlogDetailPage />} />
        <Route path="/en/contact/" element={<ContactPage />} />
        <Route path="*" element={<RedirectManager />} />
      </Route>
    </Routes>
  )
}

export default App
