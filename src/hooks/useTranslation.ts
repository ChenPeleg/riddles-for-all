import { useI18n } from '../context/I18nContext';

export function useTranslation() {
  const ctx = useI18n();
  return ctx;
}
