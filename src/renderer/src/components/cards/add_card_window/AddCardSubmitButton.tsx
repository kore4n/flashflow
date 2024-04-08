import { cardIsValid } from '@renderer/utils/cardValidity'
import { useEffect, useState } from 'react'
import CheckMarkIcon from '../CheckMarkIcon'
import React from 'react'

function AddCardSubmitButton({
  onClick,
  // cardName,
  cardFront,
  cardBack
}: {
  onClick: () => void
  // cardName: string
  cardFront: string
  cardBack: string
}): JSX.Element {
  const [cardValid, setCardValid] = useState<boolean>(false)

  useEffect(() => {
    async function checkIfNameAvailable(): Promise<void> {
      const cardValid = await cardIsValid(cardFront, cardBack)

      setCardValid(cardValid)
    }
    checkIfNameAvailable()
  }, [cardFront, cardBack])

  if (!cardValid) {
    return <span className="font-bold"></span>
  }
  return (
    <button onClick={onClick} className=" max-h-20 grid place-items-center ">
      <CheckMarkIcon />
    </button>
  )
}

export default AddCardSubmitButton
