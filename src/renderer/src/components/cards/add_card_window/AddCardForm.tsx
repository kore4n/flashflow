import React, { useState } from 'react'
import { Card, DeckName, Tag, ExpertNote, Deck } from 'src/types/types'
import CardTagging from './CardTagging'
import CloseWindow from '../CloseWindowButton'
import { getLargestCardID } from '../CardsTable'
import AddSignIcon from '../AddSignIcon'
import DeleteIcon from '../DeleteIcon'
import AddCardWarnings from './AddCardWarnings'
import AddCardSubmitButton from './AddCardSubmitButton'
import InputColumn from '../InputColumn'
import InputLabel from '../InputLabel'
import { DEFAULT_DECK_NAME } from '../../decks/DeckPage'
import CardInputField from '../CardInputField'

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
      className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      key={deck.name}
    >
      <td className="pl-2 w-full ">
        <input
          className="w-4 h-4 text-blue-600 accent-slate-500 bg-black border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          type="checkbox"
          onClick={() => toggleDeck(deck.name)}
        ></input>
        {' ' + deck.name}
      </td>
    </tr>
  ))

  function changeCardToAddFront(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardFront(event.target.value)
  }

  function changeCardToAddBack(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardBack(event.target.value)
  }

  function changeCardToAddSideNote(event: React.ChangeEvent<HTMLInputElement>): void {
    setSideNote(event.target.value)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const addExpertNote = () => {
    const lastNote = expertNotesInput[expertNotesInput.length - 1]
    if (!lastNote || lastNote.subtitle.trim() !== '' || lastNote.body.trim() !== '') {
      setExpertNotes([...expertNotesInput, { subtitle: '', body: '' }])
    } else {
      alert('An empty Expert Note detected. Complete it before adding a new one.')
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleExpertNotesChange = (index: number, type: 'subtitle' | 'body', value: string) => {
    const updatedExpertNote = [...expertNotesInput]
    if (value.trim().length > 0) {
      if (type === 'subtitle') {
        updatedExpertNote[index].subtitle = value
      } else {
        updatedExpertNote[index].body = value
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
    <div className="grid place-items-center">
      <h1 className="text-2xl font-bold">Insert Card</h1>
      <div className="flex flex-col gap-4">
        <InputColumn>
          <InputLabel>Front</InputLabel>
          {/* <input
            onChange={changeCardToAddFront}
            type="text"
            placeholder={'Front of the card'}
          ></input> */}
          <CardInputField onChange={changeCardToAddFront} placeholder="Front of the Card" />
        </InputColumn>
        <InputColumn>
          <InputLabel>Back</InputLabel>
          {/* <input
            onChange={changeCardToAddBack}
            type="text"
            placeholder={'Back of the card'}
          ></input> */}
          <CardInputField onChange={changeCardToAddBack} placeholder="Back of the Card" />
        </InputColumn>
        <InputColumn>
          <InputLabel>Side Note</InputLabel>
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
          {expertNotesInput.map((expertNote, index) => (
            <div key={index} className="flex flex-col gap-4">
              <InputLabel>Expert Note {index + 1}</InputLabel>
              <input
                type="text"
                placeholder="Subtitle"
                value={expertNote.subtitle}
                onChange={(e) => handleExpertNotesChange(index, 'subtitle', e.target.value)}
              />
              <input
                type="text"
                placeholder="Body"
                value={expertNote.body}
                onChange={(e) => handleExpertNotesChange(index, 'body', e.target.value)}
              />
              <button onClick={() => deleteExpertNote(index)} className="ml-auto">
                <DeleteIcon width="30px" height="30px" colour="#D52B1E" />
              </button>
            </div>
          ))}
          <button onClick={addExpertNote} className="ml-2">
            <AddSignIcon width="30px" height="30px" />
          </button>
        </InputColumn>
        <InputColumn>
          <InputLabel>Decks</InputLabel>
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table
              style={{ width: '100%', display: 'block', maxHeight: '70px', overflowY: 'scroll' }}
            >
              {deckTblList}
            </table>
          </div>
        </InputColumn>
        <InputColumn>
          <InputLabel>Tags</InputLabel>
          <CardTagging tempTagPool={tagsInput} setTags={setCardTags} />
        </InputColumn>
        {/* <br /> */}
        <AddCardSubmitButton
          onClick={addCard}
          cardFront={cardFrontInput}
          cardBack={cardBackInput}
        />
        <AddCardWarnings cardFrontInput={cardFrontInput} cardBackInput={cardBackInput} />
      </div>
      <CloseWindow />
    </div>
  )
}

export default AddCardForm
