import { cardIsValid } from '@renderer/utils/cardValidity'
import { useEffect, useState } from 'react'

function AddCardSubmitButton({
  onClick,
  cardName,
  cardFront,
  cardBack
}: {
  onClick: () => void
  cardName: string
  cardFront: string
  cardBack: string
}): JSX.Element {
  const [cardValid, setCardValid] = useState<boolean>(false)

  useEffect(() => {
    async function checkIfNameAvailable(): Promise<void> {
      const cardValid = await cardIsValid(cardName, cardFront, cardBack)

      setCardValid(cardValid)
    }
    checkIfNameAvailable()
  }, [cardName, cardFront, cardBack])

  if (!cardValid) {
    return <span>Cannot submit!</span>
  }
  return (
    <button className="bg-slate-800 hover:bg-slate-900" onClick={onClick}>
      Submit
    </button>
  )
}

export default AddCardSubmitButton
