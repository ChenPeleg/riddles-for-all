import { useParams } from 'react-router-dom'
import { useTranslationLegacy } from '../hooks/useTranslationLegacy';

function RiddleDetail() {
  const { id } = useParams()
  const { t } = useTranslationLegacy();

  return (
    <div className="p-8 pb-24 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{t('riddle_detail.title')}</h1>
      <p className="text-gray-600">{t('riddle_detail.showing_id').replace('{id}', String(id))}</p>
    </div>
  )
}

export default RiddleDetail
