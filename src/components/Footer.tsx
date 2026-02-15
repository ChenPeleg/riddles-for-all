import { useTranslationLegacy } from '../hooks/useTranslationLegacy';

export default function Footer() {
  const { t } = useTranslationLegacy();
  
  const buildDate = __BUILD_DATE__;
  const versionDisplay = new Date(buildDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '.');

  return (
    <footer className="py-4 text-center text-xs text-surface-500 bg-surface-50 border-t border-surface-200">
      <div className="container mx-auto px-4">
        {t('common.version') || 'Version'}: {versionDisplay}
      </div>
    </footer>
  );
}
