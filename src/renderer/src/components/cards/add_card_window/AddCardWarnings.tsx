import { useEffect, useState } from 'react'
import AddCardWarning from './AddCardWarning'
import {
  cardBackIsValid,
  cardFrontIsValid,
  frontOfCardAlreadyExists
} from '@renderer/utils/cardValidity'
import React from 'react'

function AddCardWarnings({
  // cardToAddName,
  cardFrontInput,
  cardBackInput
}: {
  // cardToAddName: string
  cardFrontInput: string
  cardBackInput: string
}): JSX.Element {
  const [warnings, setWarnings] = useState<JSX.Element[]>([])

  useEffect(() => {
    async function generateWarnings(): Promise<void> {
      const cardFrontAlreadyExists = await frontOfCardAlreadyExists(cardFrontInput)

      const localWarnings: JSX.Element[] = []

      if (cardFrontAlreadyExists) {
        const unique_key = 'CardFrontAlreadyExists'
        localWarnings.push(
          <AddCardWarning key={unique_key}>Card front already exists in database</AddCardWarning>
        )
      }

      // if (cardNameIsEmpty(cardToAddName)) {
      //   const unique_key = 'CardNameEmptyWarning'
      //   localWarnings.push(<AddCardWarning key={unique_key}>Card name is empty</AddCardWarning>)
      // }

      if (!cardFrontIsValid(cardFrontInput)) {
        const unique_key = 'CardFrontEmptyWarning'
        localWarnings.push(<AddCardWarning key={unique_key}>Card front is empty</AddCardWarning>)
      }

      // if (!cardBackIsValid(cardBackInput)) {
      //   const unique_key = 'CardBackEmptyWarning'
      //   localWarnings.push(<AddCardWarning key={unique_key}>Card back is empty</AddCardWarning>)
      // }

      setWarnings(localWarnings)
    }

    generateWarnings()
  }, [cardFrontInput, cardBackInput])

  return <div>{warnings}</div>
}

export default AddCardWarnings
