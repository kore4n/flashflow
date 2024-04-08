import CloseWindow from '@renderer/components/cards/CloseWindowButton'
import React from 'react'
import { useState, useEffect } from 'react'
import { Card } from 'src/types/types'

function ShowProgress({
  viewedCards,
  setShowProgress
}: {
  viewedCards: Card[]
  setShowProgress: (show: boolean) => void
}): JSX.Element {
  console.log('ShowProgress function is executed')

  const handleCloseProgress = () => {
    setShowProgress(false)
  }

  return (
    <div id="ShowProgress" className="flex flex-col items-center justify-center h-screen ">
      <div className="p-8  rounded-lg shadow-lg w-96">
        <h2 className="text-lg text-gray-200 font-semibold mb-4 text-center">Viewed Cards</h2>
        {viewedCards.length === 0 ? (
          <p className="text-gray-200 mb-4 text-center">No recently viewed cards.</p>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-slate-600">
                <th className="px-4 text-gray-200 py-2">Card</th>
                <th className="px-4  text-gray-200 py-2">Rating</th>
              </tr>
            </thead>
            <tbody>
              {viewedCards.map((card, index) => (
                <tr key={index}>
                  <td className="border text-gray-200 border-black px-4 py-2">{card.cardFront}</td>
                  <td className="border text-gray-200 border-black px-4 py-2">
                    {getRating(card.cardStatus)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button
          onClick={handleCloseProgress}
          className="mt-4 bg-slate-700 hover:bg-slate-700  font-bold py-2 px-4 rounded w-full"
        >
          Return
        </button>
      </div>
    </div>
  )
}

function getRating(cardStatus: number): string {
  switch (cardStatus) {
    case 1:
      return 'Again'
    case 2:
      return 'Hard'
    case 3:
      return 'Good'
    case 4:
      return 'Easy'
    default:
      return 'Unknown'
  }
}

function ShowCard({
  cards,
  setShowProgress,
  viewedCards,
  setViewedCards
}: {
  cards: Card[]
  showProgress: boolean
  setShowProgress: (show: boolean) => void
  viewedCards: Card[]
  setViewedCards: (cards: Card[]) => void
}): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const [showButtons, setShowButtons] = useState<boolean>(false)
  const [finishedDeck, setFinishedDeck] = useState<boolean>(false)

  useEffect(() => {
    setCurrentIndex(0)
  }, [])

  if (cards.length === 0) {
    return <div>You have no cards!</div>
  }

  const currentCard = cards[currentIndex]

  const handleShowAnswer = () => {
    setShowAnswer(true)
    setShowButtons(true)
    setViewedCards([...viewedCards, currentCard])
  }

  const handleNextCard = (cardStatus: number) => {
    setShowAnswer(false)
    setShowButtons(false)
    const updatedCards = [...viewedCards]
    updatedCards[currentIndex].cardStatus = cardStatus
    setViewedCards(updatedCards)
    if (currentIndex === cards.length - 1) {
      setFinishedDeck(true)
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
	<p>{currentIndex + 1}/{cards.length} Cards Left</p>
      {window.api.isMac ? (
        <span className="absolute top-5 right-5">
          <CloseWindow />
        </span>
      ) : (
        <></>
      )}

      {finishedDeck ? (
        <div>
          <h2 className="text-2xl">You finished your selected deck(s)</h2>
          {window.api.isMac ? (
            <></>
          ) : (
            <span className="grid place-items-center justify-center pt-10">
              <CloseWindow />
            </span>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow">
          <h2 className="font-bold text-lg text-white my-15 p-5">
            {showAnswer ? 'Answer' : 'Prompt'}
          </h2>
          <div
            className="p-8 bg-gray-200 rounded-lg shadow-lg text-2xl text-black"
            style={{ width: '500px', height: '300px' }}
          >
            <p>{currentCard.cardFront}</p>
            <div className="border-b border-gray-400 p-8"></div>
            {showAnswer && (
              <p className="text-blue-800 pt-5">
                {currentCard.cardBack
                  ? currentCard.cardBack
                  : '(This seems to be an information card. Just study the information again.)'}
              </p>
            )}
          </div>
          {!showAnswer && (
            <button
              onClick={handleShowAnswer}
              className="bg-cyan-800 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mt-20"
            >
              Show Answer
            </button>
          )}
          {showButtons && (
            <div className="flex flex-row justify-center space-x-4 mt-20">
              <button
                onClick={() => handleNextCard(1)}
                className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
              >
                Again
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => handleNextCard(2)}
                  className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
                >
                  Hard
                </button>
                <button
                  onClick={() => handleNextCard(3)}
                  className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
                >
                  Good
                </button>
                <button
                  onClick={() => handleNextCard(4)}
                  className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
                >
                  Easy
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="absolute bottom-0 left-0 m-4">
        <button
          onClick={() => {}}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </button>
      </div>
      <div className="flex flex-row items-center justify-end absolute bottom-0 right-0 m-4">
        <button
          onClick={() => setShowProgress(true)}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Show Study Progress
        </button>
        <button
          onClick={() => {}}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          More
        </button>
      </div>
    </div>
  )
}

function StudySession(): JSX.Element {
  const [cards, setCards] = useState<Card[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)
  const [showProgress, setShowProgress] = useState<boolean>(false)
  const [viewedCards, setViewedCards] = useState<Card[]>([])

  useEffect(() => {
    async function GetAllCards(): Promise<void> {
      const cards = await window.api.store.getAllCards()
      setCards(cards)
      setLoading(false)
    }

    GetAllCards()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {showProgress ? (
        <ShowProgress viewedCards={viewedCards} setShowProgress={setShowProgress} />
      ) : (
        <ShowCard
          cards={cards}
          showProgress={showProgress}
          setShowProgress={setShowProgress}
          viewedCards={viewedCards}
          setViewedCards={setViewedCards}
        />
      )}
    </div>
  )
}

export default StudySession
