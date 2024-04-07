import { useEffect, useState } from 'react'
import Main from './components/Main'
import Guide from '@renderer/components/Guide'
import { useNavigate } from 'react-router-dom'

function App(): JSX.Element {
  const navigate = useNavigate()
  const [showGuide, setShowGuide] = useState(true)

  useEffect(() => {
    window.api.onChangeRoute((value, nameOfCard: string) => {
      navigate(value, { state: { key: nameOfCard } })
      // console.log('Changing route and card name is ' + nameOfCard)
    })
  }, [navigate])

  const handleCloseGuide = () => {
    setShowGuide(false)
  }

  return (
    <div className="container">
      {showGuide && <Guide onClose={handleCloseGuide} />}
      <Main />
    </div>
  )
}

export default App
