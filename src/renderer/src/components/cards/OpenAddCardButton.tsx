import AddSignIcon from './AddSignIcon'
// import { Card } from 'src/types/types'

function addCard(): void {
  // Open new window
  window.api.openAddCardWindow()
}

function OpenAddCard(): JSX.Element {
  return (
    <button onClick={addCard}>
      <AddSignIcon />
    </button>
  )
}

export default OpenAddCard
