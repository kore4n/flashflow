import Deck from './decks/Deck'
import Cards from './cards/Cards'
import Stats from './stats/Stats'
import Study from './study/Study'
import NavButton from './navigation/MenuCard'
import Navbar from './navigation/Navbar'
import { useState } from 'react'
import ToCardsByDeckBtn from './navigation/ToCardsByDeckBtn'
import { ActiveTab } from 'src/types/types'

function Main(): JSX.Element {
  const [activeTab, setActiveTab] = useState<ActiveTab>('Decks')

  var toCardsByDeckBtn = (selectedDeckName) => {
    return (
      <div>
        <ToCardsByDeckBtn setActiveTab={setActiveTab} tabToOpenOnClick="Cards" deckSelected={selectedDeckName}>
          {selectedDeckName}
        </ToCardsByDeckBtn>
      </div>
    )
  };

  return (
    <div>
      <Navbar>
        <NavButton activeTab={activeTab} setActiveTab={setActiveTab} tabToOpenOnClick="Decks">
          Decks
        </NavButton>
        <NavButton activeTab={activeTab} setActiveTab={setActiveTab} tabToOpenOnClick="Cards">
          Cards
        </NavButton>
        <NavButton activeTab={activeTab} setActiveTab={setActiveTab} tabToOpenOnClick="Stats">
          Stats
        </NavButton>
		<NavButton activeTab={activeTab} setActiveTab={setActiveTab} tabToOpenOnClick="Study">
			Study
		</NavButton>
      </Navbar>
      <Deck activeTab={activeTab} toCardsByDeckBtn={toCardsByDeckBtn} />
      <Cards activeTab={activeTab} />
      <Stats activeTab={activeTab} />
	  <Study activeTab={activeTab} />
    </div>
  )
}

export default Main
