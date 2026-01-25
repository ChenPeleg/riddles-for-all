import { NavLink } from 'react-router-dom';
import { useTranslationLegacy } from '../hooks/useTranslationLegacy';
import { useEffect, useRef, useState } from 'react';
import LanguageToggle from './LanguageToggle';

const NavBar = () => {
  const { t, isRTL } = useTranslationLegacy();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  const linkBase = 'text-sm font-medium text-surface-700 px-3 py-2 rounded-md hover:bg-surface-50';
  const linkActive = 'bg-surface-100 text-brand-primary';

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal(); 
      document.body.style.overflow = 'hidden'; 
      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 0);
    } else {
      dialog.close();
      document.body.style.overflow = '';
    }

    // Handle dialog close events (e.g., backdrop click, escape key)
    const handleDialogClose = () => {
      if (!dialog.open) {
        setOpen(false);
      }
    };

    dialog.addEventListener('close', handleDialogClose);

    return () => {
      document.body.style.overflow = '';
      dialog.removeEventListener('close', handleDialogClose);
    };
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

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
            </div>
          </div>
        </div>
      </header>
      {/* spacer to offset fixed header height so content isn't covered */}
      <div aria-hidden="true" className="h-14" />

      {/* Mobile menu dialog */}
      <dialog
        ref={dialogRef}
        onClose={handleClose}
        className="mobile-menu-dialog md:hidden fixed inset-0 z-50 w-full h-full bg-transparent p-0 m-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
        aria-label={t('nav.main_nav') || 'Main navigation'}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className={`mobile-menu-content fixed top-0 ${isRTL ? 'left-0' : 'right-0'} w-80 max-w-[85vw] h-full bg-white shadow-xl overflow-y-auto`}>
          <div className="flex items-center justify-between p-4 border-b border-surface-100">
            <div className="text-lg font-bold text-surface-900">{t('common.title')}</div>
            <button
              aria-label={t('nav.close_menu') || 'Close menu'}
              onClick={handleClose}
              className="inline-flex items-center justify-center p-2 rounded-md text-surface-700 hover:bg-surface-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav id="mobile-menu" className="p-4">
            <ul className={`flex flex-col gap-2 ${isRTL ? 'items-end' : 'items-start'}`}>
              <li>
                <NavLink
                  to="/"
                  end
                  ref={firstLinkRef}
                  onClick={handleClose}
                  className={({ isActive }) => linkBase + (isActive ? ` ${linkActive}` : '')}
                >
                  {t('nav.home') || 'Home'}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/search"
                  onClick={handleClose}
                  className={({ isActive }) => linkBase + (isActive ? ` ${linkActive}` : '')}
                >
                  {t('nav.search') || 'Search'}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  onClick={handleClose}
                  className={({ isActive }) => linkBase + (isActive ? ` ${linkActive}` : '')}
                >
                  {t('nav.categories') || 'Categories'}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sources"
                  onClick={handleClose}
                  className={({ isActive }) => linkBase + (isActive ? ` ${linkActive}` : '')}
                >
                  {t('nav.sources') || 'Sources'}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
};

export default NavBar;
