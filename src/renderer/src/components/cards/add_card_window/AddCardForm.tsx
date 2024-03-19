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

    cardToast()
    window.api.store.addCard(cardToAdd)

    // console.log('adding card to database')
  }

  const [cardToAddName, setCardNameToAdd] = useState<string>('')
  const [cardFrontInput, setCardFront] = useState<string>('')
  const [cardBackInput, setCardBack] = useState<string>('')
  const [deckName, setDeckName] = useState<string>('')

  function changeCardToAddName(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardNameToAdd(event.target.value)
  }

  function changeCardToAddFront(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardFront(event.target.value)
  }

  function changeCardToAddBack(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardBack(event.target.value)
  }

  function changeCardToAddDeck(event: React.ChangeEvent<HTMLInputElement>): void {
    setDeckName(event.target.value)
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
          <input onChange={changeCardToAddDeck} type="text" placeholder={"Deck"}></input>
        </InputColumn>
        <button className=" bg-slate-800 hover:bg-slate-900" onClick={addCard}>
          Submit
        </button>
        <div id="addCardToast" className="invisible"></div>
      </div>
    </div>
  )
}

function cardToast(){

  var timeVisible = 3;
  var uptime = setInterval(function(){

    if(timeVisible <= 0) {
      (document.getElementById("addCardToast")! as HTMLElement).className =  "invisible";
      clearInterval(uptime);
    }
    else {
      (document.getElementById("addCardToast")! as HTMLElement).className =  "rounded p-2 outline outline-green-500 bg-white absolute top-10 right-12";
      (document.getElementById("addCardToast")! as HTMLElement).innerHTML =  "Card Added! " + timeVisible.toString();
      timeVisible -= 1;
    }
  }, 1000);
}

export default AddCardForm
