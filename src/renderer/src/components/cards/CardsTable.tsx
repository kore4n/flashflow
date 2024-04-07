import { SetStateAction, useEffect, useState } from 'react'
import { Card } from 'src/types/types'
import DeleteCardButton from './DeleteCardButton'
import EditCardButton from './EditCardButton'

function DisplayCards({
  cards,
  selectedDeckName
}: {
  cards: Card[]
  selectedDeckName: any
}): JSX.Element | string {
  if (cards.length == 0 && selectedDeckName.localeCompare('') != 0) {
    return selectedDeckName + ' has no cards!'
  } else if (cards.length == 0) return 'You have no cards!'

  const [filteredCards, setFilteredCards] = useState(cards)
  const [selectedTag, setSelectedTag] = useState('')

  useEffect(() => {
    setFilteredCards(cards)
  }, [cards])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleTagClick = (tagText: SetStateAction<string>) => {
    setSelectedTag(tagText)
    const filtered = cards.filter((card) => card.tags.some((tag) => tag.tagText === tagText))
    setFilteredCards(filtered)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const resetFilter = () => {
    setSelectedTag('')
    setFilteredCards(cards)
  }

  const cardsElement = filteredCards.map((card, index) => (
    <tr
      className="even: bg-slate-700 odd:bg-slate-800 shadow [&>*]:px-4 [&>*]:py-2"
      key={card.cardID}
    >
      <td>{index + 1}</td>
      <td>{card.cardFront}</td>
      <td>{card.cardBack}</td>
      <td>{card.belongsToDeck}</td>
      <td>
        {(card.tags || []).length > 0 ? (
          card.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              onClick={() => handleTagClick(tag.tagText)}
              style={{ cursor: 'pointer' }}
            >
              {tag.tagText}
              {tagIndex < card.tags.length - 1 ? ', ' : ''}
            </span>
          ))
        ) : (
          <span></span> // no tags
        )}
      </td>
      <DeleteCardButton cardID={card.cardID!} width={'30px'} height={'30px'} closeWindow={false} />
      <EditCardButton cardID={card.cardID!} />
    </tr>
  ))

  return (
    <div>
      {/*<h1 className="text-blue-500 text-2xl font-bold">*/}
      {/*  List of {selectedDeckName.localeCompare('') == 0 ? 'every' : selectedDeckName + "'s"} card*/}
      {/*</h1>*/}

      <div className=" grid place-items-center py-2">
        <button
          className=" text-gray-300 text-2xl font-bold"
          onClick={resetFilter}
          style={{ margin: '10px', padding: '5px' }}
        >
          {selectedTag
            ? 'Cards with the tag: #' + selectedTag + ' (click to clear filter)'
            : 'All cards ' +
              (selectedDeckName.localeCompare('') == 0
                ? 'in your database'
                : 'in deck: ' + selectedDeckName)}
        </button>
      </div>
      <table className="list-decimal shadow-xl">
        <thead>
          <tr>
            <th>Order</th>
            <th>Front</th>
            <th>Back</th>
            <th>Deck</th>
            <th>Tags</th>
            <th>Delete</th>
            <th>View/Edit</th>
          </tr>
        </thead>
        <tbody>{cardsElement}</tbody>
      </table>
    </div>
  )
}

function CardsTable(): JSX.Element {
  const [selectedDeckName, setSelectedDeckName] = useState<string>('')
  const [cards, setCards] = useState<Card[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function GetRequestedCards(): Promise<void> {
      const selectedDeckName = await window.api.store.getDeckToShow()

      let cards: Card[]
      if (selectedDeckName.localeCompare('') == 0) {
        cards = await window.api.store.getAllCards()
      } else {
        cards = await window.api.store.getDeckByName(selectedDeckName)
      }

      // console.log('Getting all cards.')
      // console.log(JSON.stringify(cards))
      // console.log(cards.length)

      if (cards) {
        setCards(cards)
        setSelectedDeckName(selectedDeckName)
        setLoading(false)

        // console.log(JSON.stringify(cards, null, 2))
      }
    }

    window.api.store.onCardsUpdated(() => {
      // console.log('Receiving request to update.')
      GetRequestedCards()
    })
    GetRequestedCards()
  }, [])

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
      if (card.cardID! > largestCardID) {
        largestCardID = card.cardID!
      }
    })
    return largestCardID
  } catch (error) {
    console.error('Failed to get cards:', error)
    return 0
  }
}

async function getAllTags(): Promise<Record<string, string>> {
  const tagsSet: Record<string, string> = {}
  try {
    const cards = await window.api.store.getAllCards()
    cards.forEach((card) => {
      card.tags.forEach((tag) => {
        tagsSet[tag.tagText] = tag.tagColor
      })
    })
    return tagsSet
  } catch (error) {
    console.error('Failed to get cards:', error)
    return tagsSet
  }
}

async function getCardsWithTag(tagText): Promise<any[]> {
  const cardsSet = new Set()
  try {
    const cards = await window.api.store.getAllCards()
    cards.forEach((card) => {
      card.tags.forEach((tag) => {
        if (tagText == tag.tagText) {
          cardsSet.add(card)
        }
      })
    })
    return Array.from(cardsSet)
  } catch (error) {
    console.error('Failed to get cards:', error)
    return []
  }
}

export default CardsTable
export { getLargestCardID, getAllTags }
