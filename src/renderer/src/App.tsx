import { useEffect } from 'react'
import Main from './components/Main'
import { useNavigate } from 'react-router-dom'

function App(): JSX.Element {
  const navigate = useNavigate()

  useEffect(() => {
    window.api.onChangeRoute((value, nameOfCard: string) => {
      navigate(value, { state: { key: nameOfCard } })
      // console.log('Changing route and card name is ' + nameOfCard)
    })
  }, [])

  return (
    <div className="container">
      <Main />
    </div>
  )
}

export default App
