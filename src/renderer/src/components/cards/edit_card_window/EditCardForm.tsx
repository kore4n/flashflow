import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Card } from 'src/types/types'
import InputColumn from '../InputColumn'
import InputLabel from '../InputLabel'
import CheckMarkIcon from '../CheckMarkIcon'
import CloseWindowButton from '../CloseWindowButton'
import DeleteCardButton from '../DeleteCardButton'
import CardInputField from '../CardInputField'
import { ExpertToolB } from '../ExpertTools'
import React from 'react'

function EditCardInputs({ card }: { card: Card }): JSX.Element {
  const [cardFrontToEdit, setCardFrontToEdit] = useState<string>('')
  const [cardBackToEdit, setCardBackToEdit] = useState<string>('')

  useEffect(() => {
    setCardFrontToEdit(card.cardFront)
    setCardBackToEdit(card.cardBack)

    // console.log('setting default card attributes!')
  }, [card])

  const saveAndExit = (): void => {
    const cardToUpdate: Card = {
      cardID: card.cardID,
      cardFront: cardFrontToEdit,
      cardBack: cardBackToEdit,
      cardStatus: card.cardStatus,
      sideNote: card.sideNote,
      expertNotes: card.expertNotes,
      tags: card.tags,
      belongsToDeck: card.belongsToDeck
    }
    window.api.store.addCard(cardToUpdate)

    // console.log('adding: ' + JSON.stringify(cardToUpdate))

    window.close()
  }

  const getCardID = (): number => {
    if (card.cardID !== undefined) return card.cardID
    return -1
  }

  const onCardFrontChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const cardFront = event.target.value
    setCardFrontToEdit(cardFront)
  }

  const onCardBackChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const cardBack = event.target.value
    setCardBackToEdit(cardBack)
  }

  return (
    <div
      style={{
        width: '570px',
        maxWidth: '100%',
        margin: '0 auto'
      }}
    >
      <InputColumn>
        <InputLabel>Front</InputLabel>
        <div className="pb-2 pt-2"></div>
        <CardInputField onChange={onCardFrontChange} defaultValue={cardFrontToEdit} />
      </InputColumn>
      <InputColumn>
        <div className="pt-4 pb-2"></div>
        <InputLabel>Back</InputLabel>
        <div className="pb-2 pt-2"></div>
        <CardInputField onChange={onCardBackChange} defaultValue={cardBackToEdit} />
      </InputColumn>
      <div className="flex justify-center items-center h-32">
        <button className="p-1 m-5 table-cell">
          <DeleteCardButton cardID={getCardID()!} width="50px" height={'50px'} closeWindow={true} />
        </button>
        <button className="p-1 m-5 table-cell" onClick={saveAndExit}>
          <CheckMarkIcon width="50px" height="50px" />
        </button>
        <button className="p-1 m-5 table-cell">
          <CloseWindowButton width="50px" height="50px" />
        </button>
      </div>
    </div>
  )
}

function EditCardForm(): JSX.Element {
  const location = useLocation()
  const [cardToEdit, setCardData] = useState<Card>()

  useEffect(() => {
    const cardIDToEdit = location.state.key
    // console.log('Location is: ' + JSON.stringify(location))
    // console.log('Card name is: ' + cardNameToEdit)

    const setupCardToEditData = async (): Promise<void> => {
      const card = await window.api.store.getCardByID(cardIDToEdit)

      // console.log('card to edit: ')
      // console.log(JSON.stringify(card))
      setCardData(card)
    }

    setupCardToEditData()
  }, [location])

  if (cardToEdit == undefined) return <div>Loading...</div>

  return (
    <div className="grid place-items-center">
      <h1 className="text-xl font-bold pt-4 pb-4">Card Editor</h1>
      <div
        style={{
          width: '570px',
          maxWidth: '100%',
          margin: '0 auto'
        }}
      >
        <ExpertToolB />
      </div>
      {/* <input onChange={changeCardToAddFront} type="text" placeholder={'Front'}></input> */}
      <EditCardInputs card={cardToEdit!} />
    </div>
  )
}

export default EditCardForm
