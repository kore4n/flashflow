import React, { ReactNode, useState } from 'react'
import { Card, DeckName, Tag, ExpertNote } from 'src/types/types'
import CardTagging from './CardTagging'
import CloseWindow from '../CloseWindowButton'
import { getLargestCardID } from '../CardsTable'
import deck from '../../decks/Deck'
import CheckMarkIcon from '../CheckMarkIcon'

const DEFAULT_DECK_NAME: string = 'DEFAULT'

function InputColumn({ children }: { children: ReactNode }): JSX.Element {
  return <div className="flex flex-col">{children}</div>
}

function InputLabel({ children }: { children: ReactNode }): JSX.Element {
  return <label className="font-bold text-xl">{children}</label>
}
function AddCardForm(): JSX.Element {
  async function addCard(): Promise<void> {
    if (!cardFrontInput.trim() || !cardBackInput.trim()) {
      alert('Card front and back must be filled out.')
      return
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
    window.api.store.addCard(cardToAdd)
    window.close()
    // console.log('adding card to database')
  }

  const [cardFrontInput, setCardFront] = useState<string>('')
  const [cardBackInput, setCardBack] = useState<string>('')
  const [sideNoteInput, setSideNote] = useState<string>('')
  const [expertNotesInput, setExpertNotes] = useState<ExpertNote[]>([])
  const [tagsInput, setCardTags] = useState<Tag[]>([])
  const [belongsToDeckInput, setBelongsToDeck] = useState<DeckName[]>([])

  function changeCardToAddFront(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardFront(event.target.value)
  }

  function changeCardToAddBack(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardBack(event.target.value)
  }

  function changeCardToAddSideNote(event: React.ChangeEvent<HTMLInputElement>): void {
    setSideNote(event.target.value)
  }

  function changeCardToAddExpertNotes(event: ExpertNote): void {} // needs a boolean as a toggle switch to Expert Mode

  function changeCardToAddBelongsToDeck(event: React.ChangeEvent<HTMLInputElement>): void {
    const newArray = event.target.value
      .split(',') // Here the input is assumed to be comma-separated, but we need a dropdown list of checkboxes
      .map((value) => {
        // only allows alphanumeric characters and spaces and converts it to uppercase
        return value
          .trim()
          .toUpperCase()
          .replace(/[^a-zA-Z0-9\s]/g, '')
      })
      .filter(Boolean) // empty deck names are not allowed
    if (newArray.length === 0) newArray.push(DEFAULT_DECK_NAME) // Assigns <DEFAULT_DECK_NAME> if the array is eventually empty
    setBelongsToDeck(newArray)
  }

  return (
    <div className="grid place-items-center">
      <h1 className="text-2xl font-bold">New Card</h1>
      <div className="flex flex-col gap-4">
        <InputColumn>
          <InputLabel>Front</InputLabel>
          <input
            onChange={changeCardToAddFront}
            type="text"
            placeholder={'Front of the card'}
          ></input>
        </InputColumn>
        <InputColumn>
          <InputLabel>Back</InputLabel>
          <input
            onChange={changeCardToAddBack}
            type="text"
            placeholder={'Back of the card'}
          ></input>
        </InputColumn>
        <InputColumn>
          <InputLabel>Side Note</InputLabel>
          <input
            onChange={changeCardToAddSideNote}
            type="text"
            placeholder={'Your side note goes here ...'}
          ></input>
        </InputColumn>
        <InputColumn>
          <InputLabel>Deck</InputLabel>
          <input
            onChange={changeCardToAddBelongsToDeck}
            type="text"
            placeholder={'Deck names'}
          ></input>
        </InputColumn>
        <InputColumn>
          <InputLabel>Tags</InputLabel>
          <CardTagging tempTagPool={tagsInput} setTags={setCardTags} />
        </InputColumn>

        <br></br>
        <button className=" bg-slate-800 hover:bg-slate-900" onClick={addCard}>
          Add Card
        </button>
      </div>
      <button onClick={addCard} className=" max-h-20 max-w-20">
        <CheckMarkIcon />
      </button>
      <CloseWindow />
    </div>
  )
}

export default AddCardForm
