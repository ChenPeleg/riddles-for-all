import { NavLink } from 'react-router-dom';
import { useTranslationLegacy } from '../hooks/useTranslationLegacy';
import { useEffect, useRef, useState } from 'react';
import LanguageToggle from './LanguageToggle';

const NavBar = () => {
  const { t, isRTL } = useTranslationLegacy();
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  const linkBase = 'text-sm font-medium text-surface-700 px-3 py-2 rounded-md hover:bg-surface-50';
  const linkActive = 'bg-surface-100 text-brand-primary';

  useEffect(() => {
    // focus the first link when opening mobile menu and lock body scroll
    let prevOverflow: string | null = null;
    if (open) {
      firstLinkRef.current?.focus();
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    // always return a cleanup function to satisfy TypeScript that all code paths return
    return () => {
      if (prevOverflow !== null) {
        document.body.style.overflow = prevOverflow;
      }
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {/* fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-surface-100 bg-white shadow-sm" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <button
              type="button"
              className="sr-only focus:not-sr-only"
              onClick={() => {
                const el = document.getElementById('main');
                if (el) el.focus();
              }}
            >
              {t('nav.skip_to_content') || 'Skip to content'}
            </button>

            <div className="flex items-center gap-4">
              <div className="text-lg font-bold text-surface-900">{t('common.title')}</div>
              {/* Language toggle visible on desktop */}
              <div className="hidden md:block">
                <LanguageToggle />
              </div>
            </div>

            {/* Desktop nav */}
            <nav aria-label={t('nav.main_nav') || 'Main navigation'} className="hidden md:block">
              <ul className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <li>
                  <NavLink to="/" end className={({ isActive }) => linkBase + (isActive ? ` ${linkActive}` : '')}>
                    {t('nav.home') || 'Home'}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/search" className={({ isActive }) => linkBase + (isActive ? ` ${linkActive}` : '')}>
                    {t('nav.search') || 'Search'}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/categories" className={({ isActive }) => linkBase + (isActive ? ` ${linkActive}` : '')}>
                    {t('nav.categories') || 'Categories'}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/sources" className={({ isActive }) => linkBase + (isActive ? ` ${linkActive}` : '')}>
                    {t('nav.sources') || 'Sources'}
                  </NavLink>
                </li>
              </ul>
            </nav>

            {/* Mobile: hamburger */}
            <div className="md:hidden flex items-center gap-2">
              {/* Language toggle visible on mobile */}
              <div>
                <LanguageToggle />
              </div>
              <div>
                <button
                  aria-label={open ? (t('nav.close_menu') || 'Close menu') : (t('nav.open_menu') || 'Open menu')}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  onClick={() => setOpen(prev => !prev)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-surface-700 hover:bg-surface-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                >
                  {open ? (
                    // X icon
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    // Hamburger icon
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Mobile menu panel */}
              {open && (
                <div className="absolute inset-x-0 top-14 z-50 md:hidden">
                  <div className="bg-white shadow-md rounded-b-xl border-t border-surface-100 px-4 py-4">
                    <ul id="mobile-menu" className={`flex flex-col gap-2 ${isRTL ? 'items-end' : 'items-start'}`}>
                      <li>
                        <NavLink
                          to="/"
                          end
                          ref={firstLinkRef}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) => linkBase + (isActive ? ` ${linkActive}` : '')}
                        >
                          {t('nav.home') || 'Home'}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/search"
                          onClick={() => setOpen(false)}
                          className={({ isActive }) => linkBase + (isActive ? ` ${linkActive}` : '')}
                        >
                          {t('nav.search') || 'Search'}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/categories"
                          onClick={() => setOpen(false)}
                          className={({ isActive }) => linkBase + (isActive ? ` ${linkActive}` : '')}
                        >
                          {t('nav.categories') || 'Categories'}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/sources"
                          onClick={() => setOpen(false)}
                          className={({ isActive }) => linkBase + (isActive ? ` ${linkActive}` : '')}
                        >
                          {t('nav.sources') || 'Sources'}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* spacer to offset fixed header height so content isn't covered */}
      <div aria-hidden="true" className="h-14" />
    </>
  );
};

export default NavBar;
