import { useState, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Code2, Rocket, Heart, Image as ImageIcon, Upload, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Beranda', href: '#' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Fitur', href: '#fitur' },
  { label: 'Kontak', href: '#kontak' },
];

const PRESET_BACKGROUNDS = [
  {
    name: 'Ghibli Meadow',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2500&auto=format&fit=crop',
  },
  {
    name: 'Summer Field',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2500&auto=format&fit=crop',
  },
  {
    name: 'Anime Sunset',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2500&auto=format&fit=crop',
  },
  {
    name: 'Blue Sky',
    url: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2500&auto=format&fit=crop',
  },
];

export default function App() {
  const [bgImage, setBgImage] = useState<string>(PRESET_BACKGROUNDS[0].url);
  const [showBgSelector, setShowBgSelector] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBgImage(imageUrl);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 pt-28 overflow-hidden antialiased font-sans">
      {/* Background Image Layer */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 transform scale-105"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      
      {/* Overlay Gradient for readability */}
      <div className="fixed inset-0 bg-black/20 backdrop-brightness-95" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pt-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 shadow-inner">
              <Sparkles className="w-5 h-5" />
            </span>
            <span className="text-base font-bold tracking-tight text-stone-900">
              Welcome<span className="text-emerald-600">App</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-stone-700 hover:text-emerald-700 hover:bg-emerald-50/70 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <button className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer">
              Mulai
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="md:hidden max-w-6xl mx-auto mt-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-xl p-3"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-stone-700 hover:text-emerald-700 hover:bg-emerald-50/70 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Mulai
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating Background Selector Toggle */}
      <div className="fixed top-24 right-5 z-20">
        <button
          onClick={() => setShowBgSelector(!showBgSelector)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-white/60 text-stone-800 text-xs font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer"
        >
          <ImageIcon className="w-4 h-4 text-emerald-600" />
          <span>Ganti Background</span>
        </button>

        <AnimatePresence>
          {showBgSelector && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-3 w-72 bg-white/90 backdrop-blur-xl border border-white/80 rounded-2xl p-4 shadow-2xl text-stone-800 z-30"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Pilihan Background
                </span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-semibold bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Foto</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {PRESET_BACKGROUNDS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setBgImage(preset.url)}
                    className={`group relative h-16 rounded-xl overflow-hidden border-2 transition-all text-left cursor-pointer ${
                      bgImage === preset.url
                        ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                        : 'border-transparent hover:border-white/80'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-1.5">
                      <span className="text-[10px] font-medium text-white truncate">
                        {preset.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Glassmorphism Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md bg-white/85 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 mb-6 shadow-inner">
          <Sparkles className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-stone-900 mb-2">
          Halo! 👋
        </h1>

        <p className="text-stone-600 text-base leading-relaxed mb-8 font-normal">
          Selamat datang! Website Anda kini menggunakan tampilan background pemandangan yang indah dan penuh warna.
        </p>

        <div className="space-y-3 text-left mb-8">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/60 border border-stone-200/50 shadow-xs">
            <Code2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-stone-900">Apa yang ingin Anda buat?</p>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                Misalnya: Todo list, kalkulator, dashboard, atau aplikasi AI.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/60 border border-stone-200/50 shadow-xs">
            <Rocket className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-stone-900">Siap Diluncurkan</p>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                Tuliskan ide atau fitur yang Anda inginkan di kolom chat.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-200/60 flex items-center justify-center gap-1.5 text-xs text-stone-500 font-medium">
          <span>Dibuat dengan</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>menggunakan React & Tailwind CSS</span>
        </div>
      </motion.div>
    </div>
  );
}


