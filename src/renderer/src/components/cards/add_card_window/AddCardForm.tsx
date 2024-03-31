import React, { useState } from 'react'
import { Card } from 'src/types/types'
import AddCardWarnings from './AddCardWarnings'
import AddCardSubmitButton from './AddCardSubmitButton'

import InputColumn from '../InputColumn'
import InputLabel from '../InputLabel'

function AddCardForm(): JSX.Element {
  function addCard(): void {
    const cardToAdd: Card = {
      // name: cardToAddName,
      front: cardFrontInput,
      back: cardBackInput
    }

    window.api.store.addCard(cardToAdd)

    window.api.closeCurrentWindow()
  }

  // const [cardToAddName, setCardNameToAdd] = useState<string>('')
  const [cardFrontInput, setCardFront] = useState<string>('')
  const [cardBackInput, setCardBack] = useState<string>('')

  // function changeCardToAddName(event: React.ChangeEvent<HTMLInputElement>): void {
  //   const newCardToAddName = event.target.value
  //   setCardNameToAdd(newCardToAddName)
  // }

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
        {/* <InputColumn>
          <InputLabel>Name</InputLabel>
          <input onChange={changeCardToAddName} type="text" placeholder={'Name'}></input>
        </InputColumn> */}
        <InputColumn>
          <InputLabel>Front</InputLabel>
          <input onChange={changeCardToAddFront} type="text" placeholder={'Front'}></input>
        </InputColumn>
        <InputColumn>
          <InputLabel>Back</InputLabel>
          <input onChange={changeCardToAddBack} type="text" placeholder={'Back'}></input>
        </InputColumn>
        <AddCardSubmitButton
          onClick={addCard}
          // cardName={cardToAddName}
          cardFront={cardFrontInput}
          cardBack={cardBackInput}
        />
        <AddCardWarnings
          // cardToAddName={cardToAddName}
          cardFrontInput={cardFrontInput}
          cardBackInput={cardBackInput}
        />
      </div>
    </div>
  )
}

export default AddCardForm
