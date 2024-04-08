import React from 'react'
import DeleteIcon from './DeleteIcon'

function DeleteCardButton({
  cardID,
  width,
  height,
  closeWindow
}: {
  cardID: number
  width: string
  height: string
  closeWindow: boolean
}): JSX.Element {
  const handleDeleteCardByID = (): void => {
    if (confirm('Are you sure you want to delete this card?')) {
      // console.log('Card deleted.')
      window.api.store.deleteCardByID(cardID)
      if (closeWindow) window.close()
    } else {
      // console.log('Delete canceled.')
    }
  }
  return (
    <td title="Delete Card" onClick={handleDeleteCardByID}>
      <DeleteIcon width={width} height={height} />
    </td>
  )
}

export default DeleteCardButton
