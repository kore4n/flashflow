import { useEffect } from 'react'
import Main from './components/Main'
import { useNavigate } from 'react-router-dom'

function App(): JSX.Element {
  const navigate = useNavigate()

  useEffect(() => {
    window.api.onChangeRoute((value) => {
      navigate(value)
    })
  }, [])

  return (
    <div className="container">
      <Main />
    </div>
  )
}

export default App
