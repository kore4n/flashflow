import { ActiveTab } from 'src/types/types'
import DeckPage from './DeckPage'

function Deck({ activeTab }: { activeTab: ActiveTab }): JSX.Element {
  if (activeTab != 'Decks') return <></>

  return (
    <div id="Decks">
      <DeckPage />
    </div>
  )
}

export default Deck
