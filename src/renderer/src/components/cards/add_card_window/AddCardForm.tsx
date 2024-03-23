import React, { ReactNode, useState } from 'react'
import { Card, Tag, ExpertNote } from 'src/types/types'
import CardTagging from './CardTagging'
import CloseWindow from '../CloseWindowButton'
import { getLargestCardID } from '../CardsTable'

function InputColumn({ children }: { children: ReactNode }): JSX.Element {
  return <div className="flex flex-col">{children}</div>
}

function InputLabel({ children }: { children: ReactNode }): JSX.Element {
  return <label className="font-bold text-xl">{children}</label>
}
function AddCardForm(): JSX.Element {
  async function addCard(): Promise<void> {
    if (!cardFrontInput.trim() || !cardBackInput.trim() || !belongsToDeckInput.trim()) {
      alert('The front, back, and deck of the card must be filled out.')
      return
    }
    const cardToAdd: Card = {
      cardID: (await getLargestCardID()) + 1,
      cardFront: cardFrontInput,
      cardBack: cardBackInput,
      sideNote: sideNoteInput,
      expertNotes: expertNotesInput,
      tags: tagsInput,
      belongsToDeck: belongsToDeckInput,
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
  const [belongsToDeckInput, setBelongsToDeck] = useState<string>('')

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
    setBelongsToDeck(event.target.value.toUpperCase())
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
            placeholder={'Name of the deck'}
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
      <br />
      <CloseWindow />
    </div>
  )
}

export default AddCardForm
