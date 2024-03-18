function DeleteCardButton({ cardName }: { cardName: string }): JSX.Element {
  const handleDeleteCardByName = (): void => {
    window.api.store.deleteCardByName(cardName)
  }

  return <td onClick={handleDeleteCardByName}>Delete</td>
}

export default DeleteCardButton
