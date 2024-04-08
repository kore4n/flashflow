import { ActiveTab, Deck } from 'src/types/types'
import { useEffect, useState } from 'react'
import MagnifyingGlassIcon from './MagnifyingGlassIcon'
import { truncateText } from '../cards/CardsTable'
import React from 'react'

/*
	After clicking the study tab this will populate the window with all current decks to choose from
*/
function Study({ activeTab }: { activeTab: ActiveTab }): JSX.Element {
  const [decks, setDecks] = useState<Deck[]>([])
  const [selectedDecks, setSelectedDecks] = useState<Deck[]>([])
  const [showMessage, setShowMessage] = useState<boolean>(false)
  const [inspectDeck, setInspectDeck] = useState<Deck>()
  const [deckInfo, setDeckInfo] = useState<{ new: number; learning: number; toReview: number }>({
    new: 0,
    learning: 0,
    toReview: 0
  })

  const handleStartStudy = () => {
    if (selectedDecks.length === 0) {
      setShowMessage(true)
    } else {
      setShowMessage(false)
      window.api.openStudySessionWindow()
    }
  }

  const handleInspectDeck = (deck) => {
    setInspectDeck(deck)
    countCardStatus(deck)
  }

  const countCardStatus = (deck) => {
    if (deck) {
      const cardStatusCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      }

      deck.cards.forEach((card) => {
        cardStatusCounts[card.cardStatus]++
      })

      setDeckInfo({
        new: cardStatusCounts[1],
        learning: cardStatusCounts[4],
        toReview: cardStatusCounts[2] + cardStatusCounts[3]
      })
    }
  }

  useEffect(() => {
    async function GetAllDecks(): Promise<void> {
      setDecks(await window.api.store.getAllDecks())
    }

    GetAllDecks()
  }, [decks])

  const handleSelectDeck = (deck: Deck) => {
    const isSelected = selectedDecks.some((selectedDeck) => selectedDeck.name === deck.name)
    if (isSelected) {
      setSelectedDecks(selectedDecks.filter((selectedDeck) => selectedDeck.name !== deck.name))
    } else {
      setSelectedDecks([...selectedDecks, deck])
    }
  }

  if (activeTab !== 'Study') return <></>

  const sortedDecks = decks.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div id="Study" className="mt-8 flex flex-col h-[90vh]">
      <div className="flex-grow flex">
        <div className="w-1/2 pr-6 mt-11">
          <div className="grid gap-1 border rounded-lg border-slate-800 bg-slate-700 shadow-lg p-6">
            <h1 className="text-xl font-bold text-white mb-4">CHOOSE DECKS TO STUDY</h1>
            {sortedDecks.map((deck) => (
              <div key={deck.name} className="flex items-center gap-2 text-white">
                <input
                  title="Select Deck"
                  type="checkbox"
                  checked={selectedDecks.some((selectedDeck) => selectedDeck.name === deck.name)}
                  onChange={() => handleSelectDeck(deck)}
                  className="form-checkbox h-5 w-4 border border-black"
                />
                <span className="text-lg">{truncateText(deck.name, 22)}</span>
                <button onClick={() => handleInspectDeck(deck)}>
                  <MagnifyingGlassIcon width="13px" height="13px" colour="#FFFFFF" />
                </button>
              </div>
            ))}
          </div>
          {showMessage && (
            <p className="text-red-300 mt-2">You need to select at least one deck to study.</p>
          )}
        </div>
        {inspectDeck && (
          <div className="w-1/2 pl-6 mt-5">
            <div className="border border-slate-800 shadow-md rounded-lg p-4 mt-6 bg-slate-700">
              <h2 className="text-lg font-bold mb-2 text-white">DECK INFO:</h2>
              <p
                className="mt-4 text-white font-bold text-center "
                style={{ whiteSpace: 'normal', wordWrap: 'break-word', wordBreak: 'break-word' }}
              >
                {inspectDeck.name}
              </p>
              <p className="text-white">New: {deckInfo.new}</p>
              <p className="text-white">Learning: {deckInfo.learning}</p>
              <p className="text-white">To Review: {deckInfo.toReview}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handleStartStudy}
          className="bg-cyan-800 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded uppercase"
        >
          Study Now
        </button>
      </div>

      <div
        title="For UI demonstration purposes only"
        className="flex justify-center items-center mt-20 mb-10"
      >
        <button
          title="For UI demonstration purposes only"
          className="bg-slate-800 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded uppercase text-sm"
        >
          Options
        </button>
        <button
          title="For UI demonstration purposes only"
          className="bg-slate-800 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded uppercase text-sm"
        >
          Custom Study
        </button>
        <button
          title="For UI demonstration purposes only"
          className="bg-slate-800 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded uppercase text-sm"
        >
          Description
        </button>
      </div>
    </div>
  )
}

export default Study
