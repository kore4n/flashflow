import { useEffect, useState } from 'react'
import { Card } from 'src/types/types'

function DisplayCards({ cards }: { cards: Card[] }): JSX.Element | string {
  if (cards.length == 0) return 'You have no cards!'

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
      <h1 className="text-blue-500 text-2xl font-bold">List of every card</h1>
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
  const [cards, setCards] = useState<Card[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    // async function myFunc(): Promise<void> {
    //   const a: Card = await window.api.store.getCardByName('some card')

    //   // console.log('card is: ')
    //   // console.log(a)
    // }

    async function GetAllCards(): Promise<void> {
      const cards = await window.api.store.getAllCards()

      // console.log('all cards')
      // console.log(JSON.stringify(cards))

      setCards(cards)
      setLoading(false)
    }

    // myFunc()

    GetAllCards()
  }, [cards])

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <DisplayCards cards={cards} />
    </div>
  )
}

export default CardsTable
