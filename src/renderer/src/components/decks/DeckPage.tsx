import React, { useEffect, useState } from 'react'
import { Deck } from 'src/types/types'
import DeleteIcon from '../cards/DeleteIcon'
import AddSignIcon from '../cards/AddSignIcon'
const DEFAULT_DECK_NAME: string = 'DEFAULT'

function AddDeckForm({ decks }: { decks: Deck[] }): JSX.Element | string {
  function addDeck(): void {
    const deckNameForm = document.getElementById('deckNameInput') as HTMLInputElement
    const deckName = deckNameForm.value.toUpperCase()
    const newDeck: Deck = {
      name: deckName.toUpperCase(),
      cards: []
    }

    if (decks.find((x) => x.name.localeCompare(deckName) == 0)) {
      triggerToast(false, 'Warning: Deck name already exists')
    } else if (!deckName.trim()) {
      triggerToast(false, 'Warning: Deck name is required')
    } else if (deckName.trim().length > 30) {
      triggerToast(false, 'Warning: Deck name is too long (30 characters max)')
    } else {
      deckNameForm.value = ''
      window.api.store.addDeck(newDeck)
      triggerToast(true, 'Success: Deck added')
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addDeck()
      e.preventDefault()
    }
  }

  return (
    <div className="pt-2">
      <input
        id="deckNameInput"
        placeholder="Add deck name here... (30 characters max)"
        onKeyDown={handleKeyDown}
        className="h-12 w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      ></input>
      <div className="grid place-items-center pt-10 pb-7">
        <button title="Add Deck" onClick={addDeck}>
          <AddSignIcon width="50px" height="50px" />
        </button>
      </div>
    </div>
  )
}

function DeckTable({
  decks,
  toCardsByDeckBtn
}: {
  decks: Deck[]
  toCardsByDeckBtn: (selectedDeckName: string) => JSX.Element
}): JSX.Element | string {
  function deleteDeck(name: string): void {
    if (
      confirm(
        'Are you sure you want to delete this deck: ' +
          name +
          '? Cards in this deck will be moved to ' +
          DEFAULT_DECK_NAME +
          '.'
      )
    ) {
      console.log('Deck ' + name + ' deleted.')
      if (name !== DEFAULT_DECK_NAME) {
        triggerToast(true, 'Deck has been deleted with its cards moved to ' + DEFAULT_DECK_NAME)
        window.api.store.deleteDeck(name)
      } else alert('The deck ' + DEFAULT_DECK_NAME + ' cannot be deleted!')
    } else {
      console.log('Delete canceled.')
    }
  }

  const deckEntries = decks.map((deck) => (
    <tr className="even: bg-slate-700 odd:bg-slate-800 shadow [&>*]:py-2" key={deck.name}>
      <td
        className="pl-4"
        style={{
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          wordBreak: 'break-word'
        }}
      >
        {toCardsByDeckBtn(deck.name)}
      </td>

      <td>
        <button
          title="Delete Deck"
          className={
            deck.name.localeCompare('DEFAULT') == 0 ? 'invisible' : 'float-right pr-4 align-middle'
          }
          onClick={() => deleteDeck(deck.name)}
        >
          <DeleteIcon width="30px" height="30px" />
        </button>
      </td>
    </tr>
  ))
  return (
    <div>
      <div className="grid place-items-center font-bold text-2xl p-4 pb-7">Decks</div>
      <table className="list-decimal shadow-xl" style={{ width: '570px', tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th style={{ width: '85%' }}></th>
            <th style={{ width: '15%' }}></th>
          </tr>
        </thead>
        <tbody>{deckEntries}</tbody>
      </table>
    </div>
  )
}

function triggerToast(positive: boolean, text: string): void {
  let cyclesVisible = 4

  const uptime = setInterval(function () {
    if (!document.getElementById('deckToast')) {
      clearInterval(uptime)
    } else if (document.getElementById('deckToast') && cyclesVisible <= 0) {
      ;(document.getElementById('deckToast') as HTMLElement).className = 'invisible'
      clearInterval(uptime)
    } else if (document.getElementById('deckToast') && cyclesVisible > 0) {
      ;(document.getElementById('deckToast') as HTMLElement).className = positive
        ? 'bg-green-700 text-center font-bold text-gray-800 rounded-md shadow-md p-2 mt-2 mb-2.5'
        : 'bg-red-700 text-center font-bold text-gray-200 rounded-md shadow-md p-2 mt-2 mb-2.5'
      ;(document.getElementById('deckToast') as HTMLElement).innerHTML = text
      cyclesVisible -= 1
    }
  }, 500)
}

function DecksPage({
  toCardsByDeckBtn
}: {
  toCardsByDeckBtn: (selectedDeckName: string) => JSX.Element
}): JSX.Element {
  const [decks, setDecks] = useState<Deck[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function GetAllDecks(): Promise<void> {
      setDecks(await window.api.store.getAllDecks())
      setLoading(false)
    }

    GetAllDecks()
  }, [decks])

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="pt-5">
      <DeckTable decks={decks} toCardsByDeckBtn={toCardsByDeckBtn} />
      <AddDeckForm decks={decks} />
      <div id="deckToast" className="invisible"></div>
    </div>
  )
}

export default DecksPage
export { DEFAULT_DECK_NAME }
