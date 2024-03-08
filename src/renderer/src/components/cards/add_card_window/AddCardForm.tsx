import React, { ReactNode, useState } from 'react'
import { Card } from 'src/types/types'

function InputColumn({ children }: { children: ReactNode }): JSX.Element {
  return <div className="flex flex-col">{children}</div>
}

function InputLabel({ children }: { children: ReactNode }): JSX.Element {
  return <label className="font-bold text-xl">{children}</label>
}

function AddCardForm(): JSX.Element {
  function addCard(): void {
    const cardToAdd: Card = {
      name: cardToAddName,
      front: cardFrontInput,
      back: cardBackInput,
      deckName: deckName
    }

    window.api.store.addCard(cardToAdd)

    // console.log('adding card to database')
  }

  const [cardToAddName, setCardNameToAdd] = useState<string>('')
  const [cardFrontInput, setCardFront] = useState<string>('')
  const [cardBackInput, setCardBack] = useState<string>('')
  const [deckName, setDeckName] = useState<string>('')

  async function getDeck(): Promise<void>{
    var deckName;

    deckName = await window.api.store.getDeckToShow();
    setDeckName(deckName);
  }

  getDeck()

  function changeCardToAddName(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardNameToAdd(event.target.value)
  }

  function changeCardToAddFront(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardFront(event.target.value)
  }

  function changeCardToAddBack(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardBack(event.target.value)
  }

  return (
    <div className="grid place-items-center">
      <h1 className="text-2xl font-bold">Add cards to the database here!</h1>
      <div className="flex flex-col gap-4">
        <InputColumn>
          <InputLabel>Name</InputLabel>
          <input onChange={changeCardToAddName} type="text" placeholder={'Name'}></input>
        </InputColumn>
        <InputColumn>
          <InputLabel>Front</InputLabel>
          <input onChange={changeCardToAddFront} type="text" placeholder={'Front'}></input>
        </InputColumn>
        <InputColumn>
          <InputLabel>Back</InputLabel>
          <input onChange={changeCardToAddBack} type="text" placeholder={'Back'}></input>
        </InputColumn>
        <InputColumn>
          <InputLabel>Deck</InputLabel>
          <input type="text" placeholder={deckName} disabled></input>
        </InputColumn>
        <button className=" bg-slate-800 hover:bg-slate-900" onClick={addCard}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default AddCardForm
