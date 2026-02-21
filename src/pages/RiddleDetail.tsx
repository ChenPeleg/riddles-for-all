import { useParams } from 'react-router-dom'
import { useTranslationLegacy } from '../hooks/useTranslationLegacy';

function RiddleDetail() {
  const { id } = useParams()
  const { t } = useTranslationLegacy();

  return (
    <div className="px-8 pt-8 pb-24 max-w-3xl mx-auto min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-4 text-surface-900 dark:text-white transition-colors">{t('riddle_detail.title')}</h1>
      <p className="text-surface-600 dark:text-surface-400 transition-colors">{t('riddle_detail.showing_id').replace('{id}', String(id))}</p>
    </div>
  )
}

export default RiddleDetail
