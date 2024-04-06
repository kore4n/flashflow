import { cardIsValid } from '@renderer/utils/cardValidity'
import { useEffect, useState } from 'react'
import CheckMarkIcon from '../CheckMarkIcon'

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
    return <span className="  font-bold">Cannot submit!</span>
  }
  return (
    // <button className="bg-slate-800 hover:bg-slate-900" onClick={onClick}>
    //   Submit
    // </button>
    // <CheckMarkIcon />
    <button onClick={onClick} className=" max-h-20 grid place-items-center">
      <CheckMarkIcon />
    </button>
  )
}

export default AddCardSubmitButton
