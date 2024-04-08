import { useEffect, useState } from 'react'
import AddTagWarning from './AddTagWarning'
import { Tag } from 'src/types/types'
import React from 'react'

function AddTagWarnings({
  tagToInput,
  tempTagPool
}: {
  tagToInput: string
  tempTagPool: Tag[]
}): JSX.Element {
  const [warnings, setWarnings] = useState<JSX.Element[]>([])

  useEffect(() => {
    function generateWarnings(): void {
      const sanitizedText = tagToInput.trim().replace(/,/, '')
      const localWarnings: JSX.Element[] = []

      //const cardFrontAlreadyExists = await frontOfCardAlreadyExists(cardFrontInput)

      if (sanitizedText.length > 24) {
        const unique_key = 'TagTooLong'
        localWarnings.push(
          <AddTagWarning key={unique_key}>Tag cannot exceed 24 characters</AddTagWarning>
        )
      }

      if (
        !sanitizedText.match(/^[A-Za-z0-9_+\-=().?!/ \\%$#@<>{}*&^–]+$/) &&
        sanitizedText.length != 0
      ) {
        const unique_key = 'TagInvalidCharacters'
        localWarnings.push(
          <AddTagWarning key={unique_key}>Tag contains invalid characters</AddTagWarning>
        )
      }

      if (
        tempTagPool.some(
          (tag: { tagText: string }) => tag.tagText.toLowerCase() === sanitizedText.toLowerCase()
        )
      ) {
        const unique_key = 'TagAlreadyExists'
        localWarnings.push(<AddTagWarning key={unique_key}>Tag already exists</AddTagWarning>)
      }

      setWarnings(localWarnings)
    }

    generateWarnings()
  }, [tagToInput])

  return <div>{warnings}</div>
}

export default AddTagWarnings
