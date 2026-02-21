import { useTranslationLegacy } from '../hooks/useTranslationLegacy';
import { formatBuildVersion } from '../utils/version';

export default function Footer() {
  const { t } = useTranslationLegacy();
  const versionDisplay = formatBuildVersion(__BUILD_DATE__);

  return (
    <footer className="py-4 text-center text-xs text-surface-500 dark:text-surface-400 bg-surface-50 dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {t('common.version') || 'Version'}: {versionDisplay}
      </div>
    </footer>
  );
}
