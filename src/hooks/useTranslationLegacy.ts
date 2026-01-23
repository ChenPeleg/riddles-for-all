import { useI18n } from '../context/I18nContext';

export function useTranslationLegacy() {
  const ctx = useI18n();
  return ctx;
}
