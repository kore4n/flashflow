import OpenAddCardIcon from './OpenAddCardIcon'
// import { Card } from 'src/types/types'

function addCard(): void {
  // Open new window
  window.api.openAddCardWindow()
}

function OpenAddCard(): JSX.Element {
  return (
    <button onClick={addCard} className=" max-h-20 max-w-20">
      <OpenAddCardIcon />
    </button>
  )
}

export default OpenAddCard
