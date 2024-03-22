import { useEffect, useState } from 'react'
import { Deck } from 'src/types/types'

function AddDeckForm(): JSX.Element | string {
  function addDeck(): void {
    const deckNameForm = document.getElementById('deckNameInput') as HTMLInputElement
    const deckName = deckNameForm.value.toUpperCase()

    const newDeck: Deck = {
      name: deckName.toUpperCase(),
      cards: []
    }

    deckNameForm.value = ''
    window.api.store.addDeck(newDeck)
  }

  return (
    <form className="pt-2">
      <input id="deckNameInput" placeholder="Enter new deck..."></input>
      <button onClick={addDeck}>Add</button>
    </form>
  )
}

function DeckTable({
  decks,
  toCardsByDeckBtn
}: {
  decks: Deck[]
  toCardsByDeckBtn: Function
}): JSX.Element | string {
  function deleteDeck(name: string): void {
    window.api.store.deleteDeck(name)
  }
  const deckEntries = decks.map((deck) => (
    <tr className="bg-slate-800 border" height="50px" key={deck.name}>
      <td className="pl-5" width="300px">
        {toCardsByDeckBtn(deck.name)}
      </td>

      <td>
        <button className="pl-10" onClick={() => deleteDeck(deck.name)}>
          Delete
        </button>
      </td>
    </tr>
  ))
  return (
    <table width="400px">
      <thead>
        <tr>
          <th>Deck</th>
        </tr>
      </thead>
      <tbody>{deckEntries}</tbody>
    </table>
  )
}

function DecksPage({ toCardsByDeckBtn }: { toCardsByDeckBtn: Function }): JSX.Element {
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
      <AddDeckForm />
    </div>
  )
}

export default DecksPage
