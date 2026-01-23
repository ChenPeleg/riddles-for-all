import { useParams } from 'react-router-dom'

function RiddleDetail() {
  const { id } = useParams()

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Riddle Detail</h1>
      <p className="text-gray-600">Showing riddle ID: {id}</p>
    </div>
  )
}

export default RiddleDetail
