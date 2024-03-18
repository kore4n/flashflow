import { useEffect, useState } from 'react'
import { Card } from 'src/types/types'
import DeleteCardButton from './DeleteCardButton'
import EditCardButton from './EditCardButton'

function DisplayCards({ cards }: { cards: Card[] }): JSX.Element | string {
  if (cards.length == 0) return 'You have no cards!'

  const cardsElement = cards.map((card, index) => {
    // const [shouldShowDeleteButton, setShouldShowDeleteButton] = useState(false)

    // const showDeleteButton = (): void => {
    //   setShouldShowDeleteButton(true)
    //   console.log('Should show delete button now')
    // }
    // const hideDeleteButton = (): void => {
    //   setShouldShowDeleteButton(false)
    // }
    return (
      <tr
        // onMouseEnter={showDeleteButton}
        // onMouseLeave={hideDeleteButton}
        className="even: bg-slate-600 odd:bg-slate-800 shadow [&>*]:p-2"
        key={card.name}
      >
        <td>{index + 1}</td>
        <td>{card.name}</td>
        <td>{card.front}</td>
        <td>{card.back}</td>
        <td>{card.tags ? card.tags : 'none'}</td>
        {/* <td>{shouldShowDeleteButton ? <DeleteCardButton cardName={card.name} /> : ''}</td> */}
        <DeleteCardButton cardName={card.name} />
        <EditCardButton cardName={card.name} />
      </tr>
    )
  })

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
            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
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
    async function GetAllCards(): Promise<void> {
      const cards = await window.api.store.getAllCards()

      // console.log('Getting all cards.')
      // console.log(JSON.stringify(cards))

      setCards(cards)
      setLoading(false)
    }

    window.api.store.onCardsUpdated(() => GetAllCards())
    GetAllCards()
  }, [])

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <DisplayCards cards={cards} />
    </div>
  )
}

export default CardsTable
