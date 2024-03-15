import { useEffect, useState } from 'react'
import { Card } from 'src/types/types'

function DisplayCards({ cards, selectedDeckName }: { cards: Card[], selectedDeckName: string }): JSX.Element | string {
  
  if(cards.length == 0 && selectedDeckName.localeCompare("") != 0) {
    return selectedDeckName + " has no cards!"
  }
  else if (cards.length == 0) return 'You have no cards!'

  const cardsElement = cards.map((card, index) => (
    <tr className="even: bg-slate-600 odd:bg-slate-800 shadow" key={card.name}>
      <td>{index + 1}</td>
      <td>{card.name}</td>
      <td>{card.front}</td>
      <td>{card.back}</td>
      <td>{card.tags ? card.tags : 'none'}</td>
    </tr>
  ))

  return (
    <>
      <h1 className="text-blue-500 text-2xl font-bold">
        List of {selectedDeckName.localeCompare("") == 0 ? "every" : selectedDeckName + "'s" } card
      </h1>
      <table className="list-decimal">
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Front</th>
            <th>Back</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>{cardsElement}</tbody>
      </table>
    </>
  )
}

function CardsTable(): JSX.Element {
  const [selectedDeckName, setSelectedDeckName] = useState<string>('')
  const [cards, setCards] = useState<Card[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    // async function myFunc(): Promise<void> {
    //   const a: Card = await window.api.store.getCardByName('some card')

    //   // console.log('card is: ')
    //   // console.log(a)
    // }

    async function GetRequestedCards(): Promise<void> {
      var selectedDeckName = await window.api.store.getDeckToShow()

      var cards: Card[];
      if(selectedDeckName.localeCompare("") == 0) {
        cards = await window.api.store.getAllCards();
      }
      else {
        cards = await window.api.store.getDeckByName(selectedDeckName);
      }

      // console.log('all cards')
      // console.log(JSON.stringify(cards))

      setSelectedDeckName(selectedDeckName);
      setCards(cards)
      setLoading(false)
    }

    // myFunc()

    GetRequestedCards()
  }, [cards])

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <DisplayCards cards={cards} selectedDeckName={selectedDeckName} />
    </div>
  )
}

export default CardsTable
