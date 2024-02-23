function Deck({ activeTab }: { activeTab: ActiveTab }): JSX.Element {
  if (activeTab != 'Decks') return <></>

  return <div id="Decks">Deck</div>
}

export default Deck
