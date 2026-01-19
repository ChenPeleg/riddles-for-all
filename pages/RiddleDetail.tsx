import { useParams } from 'react-router-dom'

function RiddleDetail() {
  const { id } = useParams()

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Riddle Detail</h1>
      <p>Showing riddle ID: {id}</p>
    </div>
  )
}

export default RiddleDetail
