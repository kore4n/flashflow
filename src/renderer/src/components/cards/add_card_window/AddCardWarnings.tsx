import { useEffect, useState } from 'react'
import AddCardWarning from './AddCardWarning'
import {
  cardBackIsValid,
  cardFrontIsValid,
  cardNameAlreadyExists,
  cardNameIsEmpty
} from '@renderer/utils/cardValidity'

function AddCardWarnings({
  cardToAddName,
  cardFrontInput,
  cardBackInput
}: {
  cardToAddName: string
  cardFrontInput: string
  cardBackInput: string
}): JSX.Element {
  const [warnings, setWarnings] = useState<JSX.Element[]>([])

  useEffect(() => {
    async function generateWarnings(): Promise<void> {
      const nameAlreadyExists = await cardNameAlreadyExists(cardToAddName)

      const localWarnings: JSX.Element[] = []

      if (nameAlreadyExists) {
        const unique_key = 'CardNameAlreadyExists'
        localWarnings.push(
          <AddCardWarning key={unique_key}>Card already exists in database</AddCardWarning>
        )
      }

      if (cardNameIsEmpty(cardToAddName)) {
        const unique_key = 'CardNameEmptyWarning'
        localWarnings.push(<AddCardWarning key={unique_key}>Card name is empty</AddCardWarning>)
      }

      if (!cardFrontIsValid(cardFrontInput)) {
        const unique_key = 'CardFrontEmptyWarning'
        localWarnings.push(<AddCardWarning key={unique_key}>Card front is empty</AddCardWarning>)
      }

      if (!cardBackIsValid(cardBackInput)) {
        const unique_key = 'CardBackEmptyWarning'
        localWarnings.push(<AddCardWarning key={unique_key}>Card back is empty</AddCardWarning>)
      }

      setWarnings(localWarnings)
    }

    generateWarnings()
  }, [cardToAddName, cardFrontInput, cardBackInput])

  return <div>{warnings}</div>
}

export default AddCardWarnings
