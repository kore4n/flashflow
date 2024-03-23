import { useEffect, useState } from 'react'
import { Card } from 'src/types/types'

function DisplayCards({
  cards,
  selectedDeckName
}: {
  cards: Card[]
  selectedDeckName
}): JSX.Element | string {
  if (cards.length == 0 && selectedDeckName.localeCompare('') != 0) {
    return selectedDeckName + ' has no cards!'
  } else if (cards.length == 0) return 'You have no cards!'

  const cardsElement = cards.map((card, index) => (
    <tr className="even: bg-slate-600 odd:bg-slate-800 shadow" key={card.cardID}>
      <td>{index + 1}</td>
      <td>{card.cardFront}</td>
      <td>{card.cardBack}</td>
      <td>{card.belongsToDeck}</td>
      <td>
        {(card.tags || []).length > 0 ? (
          card.tags.map((tag, tagIndex) => (
            <span key={tagIndex}>
              {tag.tagText}
              {tagIndex < card.tags.length - 1 ? ', ' : ''}
            </span>
          ))
        ) : (
          <span></span> // no tags
        )}
      </td>
    </tr>
  ))

  return (
    <>
      <h1 className="text-blue-500 text-2xl font-bold">
        List of {selectedDeckName.localeCompare('') == 0 ? 'every' : selectedDeckName + "'s"} card
      </h1>
      <table className="list-decimal">
        <thead>
          <tr>
            <th>#</th>
            <th>Front</th>
            <th>Back</th>
            <th>Deck</th>
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
      const selectedDeckName = await window.api.store.getDeckToShow()

      let cards: Card[]
      if (selectedDeckName.localeCompare('') == 0) {
        cards = await window.api.store.getAllCards()
      } else {
        cards = await window.api.store.getDeckByName(selectedDeckName)
      }

      // console.log('all cards')
      // console.log(JSON.stringify(cards))

      setSelectedDeckName(selectedDeckName)
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

async function getLargestCardID(): Promise<number> {
  try {
    const cards = await window.api.store.getAllCards()
    if (cards.length === 0) {
      return 0
    }
    let largestCardID = 0
    cards.forEach((card) => {
      if (card.cardID > largestCardID) {
        largestCardID = card.cardID
      }
    })
    return largestCardID
  } catch (error) {
    console.error('Failed to get cards:', error)
    return 0
  }
}

export default CardsTable
export { getLargestCardID }
