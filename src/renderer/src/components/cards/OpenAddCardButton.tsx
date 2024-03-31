// import AddSignIcon from './AddSignIcon'
// import { Card } from 'src/types/types'

function addCard(): void {
  // Open new window
  window.api.openAddCardWindow()
}

function OpenAddCard(): JSX.Element {
  return (
    <button onClick={addCard} className=" max-h-20 max-w-20">
      add
    </button>
  )
}

export default OpenAddCard
