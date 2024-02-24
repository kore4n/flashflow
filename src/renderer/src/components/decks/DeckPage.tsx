import { useEffect, useState } from "react";
import { Deck } from "src/types/types";

function AddDeckForm(): JSX.Element | string {

  function addDeck(): void {

    let deckNameForm = (document.getElementById("deckNameInput") as HTMLInputElement);
    let deckName = deckNameForm.value;

    let newDeck: Deck = {
      name: deckName,
      cards: []
    }

    deckNameForm.value = "";
    window.api.store.addDeck(newDeck);
  }

  return (
    <form>
      <input id="deckNameInput" placeholder="Deck Name">
      </input>
      <button onClick={addDeck}>
        Add
      </button>
    </form>
  )
}

function DeckTable({ decks }: { decks: Deck[] }): JSX.Element | string {
  
  function deleteDeck(name: string): void {
    window.api.store.deleteDeck(name);
  }
  var deckEntries = decks.map((deck) => (
    <tr className="even: bg-slate-600 odd:bg-slate-800 shadow" key={deck.name}>
      <td>{deck.name}</td>
      <button onClick={() => deleteDeck(deck.name)}>
        Delete
      </button>
    </tr>
  ))
  return (
    <table>
     <tbody>{deckEntries}</tbody>
    </table>
  )
}

function DecksPage(): JSX.Element {
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
    <div>
      <AddDeckForm />
      <DeckTable decks={decks} />
    </div>
    )
  }

 export default DecksPage
