import { ActiveTab } from 'src/types/types'

function Deck({ activeTab }: { activeTab: ActiveTab }): JSX.Element {
  if (activeTab != 'Decks') return <></>

  return <div id="Decks">Decks</div>
}

export default Deck
