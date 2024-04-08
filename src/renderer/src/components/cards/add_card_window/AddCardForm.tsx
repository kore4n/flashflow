import React, { useState } from 'react'
import { Card, DeckName, Tag, ExpertNote, Deck } from 'src/types/types'
import CardTagging from './CardTagging'
import CloseWindow from '../CloseWindowButton'
import { getLargestCardID, truncateText } from '../CardsTable'
import AddSignIcon from '../AddSignIcon'
import DeleteIcon from '../DeleteIcon'
import AddCardWarnings from './AddCardWarnings'
import AddCardSubmitButton from './AddCardSubmitButton'
import InputColumn from '../InputColumn'
import InputLabel from '../InputLabel'
import { DEFAULT_DECK_NAME } from '../../decks/DeckPage'
import CardInputField from '../CardInputField'
import { ExpertToolA, ExpertToolB } from '../ExpertTools'

function AddCardForm(): JSX.Element {
  async function addCard(): Promise<void> {
    if (!cardFrontInput.trim()) {
      alert('Card front must be filled out.')
      return
    }
    if (expertNotesInput.length > 0) {
      const lastNote = expertNotesInput[expertNotesInput.length - 1]
      if (
        lastNote !== null &&
        lastNote.subtitle.trim().length == 0 &&
        lastNote.body.trim().length == 0
      ) {
        expertNotesInput.pop()
      }
    }
    const cardToAdd: Card = {
      cardID: (await getLargestCardID()) + 1,
      cardFront: cardFrontInput,
      cardBack: cardBackInput,
      sideNote: sideNoteInput,
      expertNotes: expertNotesInput,
      tags: tagsInput,
      belongsToDeck: belongsToDeckInput.length ? belongsToDeckInput : [DEFAULT_DECK_NAME],
      cardStatus: 0 // can be some other type
    }
    // console.log('adding card to database')
    window.api.store.addCard(cardToAdd)
    window.close()
  }

  const [cardFrontInput, setCardFront] = useState<string>('')
  const [cardBackInput, setCardBack] = useState<string>('')
  const [sideNoteInput, setSideNote] = useState<string>('')
  const [tagsInput, setCardTags] = useState<Tag[]>([])
  const [belongsToDeckInput, setBelongsToDeck] = useState<DeckName[]>([])
  const [expertNotesInput, setExpertNotes] = useState<ExpertNote[]>([])
  const [decks, setDecks] = useState<Deck[]>([])
  const [showOptions, setShowOptions] = useState<boolean>(false)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleExpertOptions = () => {
    setShowOptions(!showOptions)
  }

  async function GetDecks(): Promise<void> {
    setDecks(await window.api.store.getAllDecks())
  }
  GetDecks()

  function toggleDeck(name: DeckName): void {
    const tempdeckLst = belongsToDeckInput
    if (tempdeckLst.find((x) => x.localeCompare(name) == 0)) {
      const deckToDeleteIndex = tempdeckLst.findIndex((x) => x.localeCompare(name) == 0)
      tempdeckLst.splice(deckToDeleteIndex, 1)
    } else {
      tempdeckLst.push(name)
    }
    setBelongsToDeck(tempdeckLst)
  }

  const sortedDecks = decks.sort((a, b) => a.name.localeCompare(b.name))

  const deckTblList = sortedDecks.map((deck) => (
    <tr
      //className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      key={deck.name}
    >
      <td className="pl-2 w-full">
        <input
          //className="w-4 h-4 text-blue-600 accent-slate-500 bg-black border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          type="checkbox"
          title="Add to Deck"
          onClick={() => toggleDeck(deck.name)}
        ></input>
        {' ' + truncateText(deck.name, 42)}
      </td>
    </tr>
  ))

  function changeCardToAddFront(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setCardFront(event.target.value)
  }

  function changeCardToAddBack(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setCardBack(event.target.value)
  }

  function changeCardToAddSideNote(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setSideNote(event.target.value)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const addExpertNote = () => {
    const lastNote = expertNotesInput[expertNotesInput.length - 1]
    if (!lastNote || lastNote.subtitle.trim().length || lastNote.body.trim().length) {
      setExpertNotes([...expertNotesInput, { subtitle: '', body: '' }])
    } else {
      alert('An empty Expert Note detected. Complete it before adding a new one.')
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleExpertNotesChange = (index: number, type: 'subtitle' | 'body', value: string) => {
    const updatedExpertNote = [...expertNotesInput]
    if (value.trim()) {
      if (type === 'subtitle') {
        updatedExpertNote[index].subtitle = value.trim()
      } else {
        updatedExpertNote[index].body = value.trim()
      }
      setExpertNotes(updatedExpertNote)
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const deleteExpertNote = (index: number) => {
    const updatedPairs = expertNotesInput.filter((_, i) => i !== index)
    setExpertNotes(updatedPairs)
  }

  return (
    <div className="grid place-items-center table-fixed">
      <div
        style={{
          width: '570px',
          maxWidth: '100%',
          margin: '0 auto'
        }}
      >
        <div className="grid place-items-center">
          <h1 className="text-xl font-bold pt-4 pb-4">Insert New Card</h1>
          {/* <input onChange={changeCardToAddFront} type="text" placeholder={'Front'}></input> */}
        </div>
        {!showOptions && (
          <button
            onClick={() => handleExpertOptions()}
            className="flex top-0 right-0 mt-4 mb-4 mr-4 bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4"
          >
            ⚫ Expert Options
          </button>
        )}
        {showOptions && (
          <div>
            <button
              onClick={() => handleExpertOptions()}
              className="flex top-0 right-0 mt-4 mb-4 mr-4  bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4"
            >
              🟢 Expert Options
            </button>
            <ExpertToolA />
            <ExpertToolB />
          </div>
        )}
        <div className="flex flex-col gap-4">
          <InputColumn>
            <InputLabel>Front</InputLabel>
            <div className="pb-2 pt-2"></div>
            {/* <input
            onChange={changeCardToAddFront}
            type="text"
            placeholder={'Front of the card'}
          ></input> */}
            <CardInputField onChange={changeCardToAddFront} placeholder="Front of the card" />
          </InputColumn>
          <InputColumn>
            <InputLabel>Back</InputLabel>
            <div className="pb-2 pt-2"></div>
            {/* <input
            onChange={changeCardToAddBack}
            type="text"
            placeholder={'Back of the card'}
          ></input> */}
            <CardInputField onChange={changeCardToAddBack} placeholder="Back of the card" />
          </InputColumn>
          <InputColumn>
            <InputLabel>Side Note</InputLabel>
            <div className="pb-2 pt-2"></div>
            {/* <input
            onChange={changeCardToAddSideNote}
            type="text"
            placeholder={'Your side note goes here ...'}
          ></input> */}
            <CardInputField
              onChange={changeCardToAddSideNote}
              placeholder="Your side note goes here ..."
            />
          </InputColumn>
          <InputColumn>
            {expertNotesInput.map((_expertNote, index) => (
              <div key={index} className="flex flex-col gap-4">
                <>
                  {expertNotesInput[index].subtitle.trim().length > 1 && (
                    <InputLabel>
                      {truncateText(expertNotesInput[index].subtitle.trim(), 26)}
                    </InputLabel>
                  )}

                  {expertNotesInput[index].subtitle.trim().length <= 1 && (
                    <InputLabel>Expert Note {index + 1}</InputLabel>
                  )}
                </>
                <input
                  onChange={(e) => handleExpertNotesChange(index, 'subtitle', e.target.value)}
                  placeholder="Subtitle (Field)"
                  className="h-12 w-full bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
                <CardInputField
                  onChange={(e) => handleExpertNotesChange(index, 'body', e.target.value)}
                  placeholder="Your extra note goes here ..."
                />
                <button
                  onClick={() => {
                    let isConfirmed = true
                    const noteContent = expertNotesInput[index]
                    if (
                      noteContent &&
                      noteContent.subtitle.trim().length + noteContent.body.trim().length > 0
                    )
                      isConfirmed = confirm(
                        'This note has been edited. Are you sure you want to delete it?'
                      )
                    if (isConfirmed) {
                      deleteExpertNote(index)
                    }
                  }}
                  className="ml-auto"
                >
                  <DeleteIcon width="30px" height="30px" colour="#D52B1E" />
                </button>
              </div>
            ))}
            {showOptions && (
              <button onClick={addExpertNote} className="mt-2 flex justify-center items-center h-1">
                <AddSignIcon width="30px" height="30px" />
              </button>
            )}
          </InputColumn>
          <InputColumn>
            <InputLabel>Add to Decks</InputLabel>
            <div className="pb-2 pt-2"></div>
            <div
              className="min-h-20 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style={{
                width: '100%',
                overflowX: 'hidden',
                maxHeight: '90px',
                overflowY: 'scroll',
                fontSize: '1.1rem',
                lineHeight: '2rem'
              }}
            >
              <table>{deckTblList}</table>
            </div>
          </InputColumn>
          <InputColumn>
            <InputLabel>Tags</InputLabel>
            <div className="pt-2"></div>
            <CardTagging tempTagPool={tagsInput} setTags={setCardTags} />
          </InputColumn>
          <div className="pb-4"></div>
          <AddCardSubmitButton
            onClick={addCard}
            cardFront={cardFrontInput}
            cardBack={cardBackInput}
          />
          <AddCardWarnings cardFrontInput={cardFrontInput} cardBackInput={cardBackInput} />
          <CloseWindow />
          <div className="pb-4"></div>
        </div>
      </div>
    </div>
  )
}

export default AddCardForm
