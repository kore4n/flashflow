function DeleteCardButton({ cardID }: { cardID: number }): JSX.Element {
  const handleDeleteCardByID = (): void => {
    window.api.store.deleteCardByID(cardID)
  }

  return <td onClick={handleDeleteCardByID}>Delete</td>
}

export default DeleteCardButton
