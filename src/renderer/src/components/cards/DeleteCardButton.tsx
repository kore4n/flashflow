import DeleteIcon from './DeleteIcon'

function DeleteCardButton({ cardID }: { cardID: number }): JSX.Element {
  const handleDeleteCardByID = (): void => {
    window.api.store.deleteCardByID(cardID)
  }
  return (
    <td className="grid place-items-center" onClick={handleDeleteCardByID}>
      <DeleteIcon width={'30px'} height={'30px'} />
    </td>
  )
}

export default DeleteCardButton
