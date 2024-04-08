import { ActiveTab } from 'src/types/types'
import DeckPage from './DeckPage'
import React from 'react'

function Deck({
  activeTab,
  toCardsByDeckBtn
}: {
  activeTab: ActiveTab
  toCardsByDeckBtn: (selectedDeckName: string) => JSX.Element
}): JSX.Element {
  if (activeTab != 'Decks') return <></>

  return (
    <div id="Decks" className="grid place-items-center">
      <DeckPage toCardsByDeckBtn={toCardsByDeckBtn} />
    </div>
  )
}

export default Deck
