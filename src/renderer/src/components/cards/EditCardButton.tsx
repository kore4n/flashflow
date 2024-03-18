function EditCardButton({ cardName }: { cardName: string }): JSX.Element {
  const editCard = (): void => {
    window.api.openEditCardWindow(cardName)
  }

  return (
    <td onClick={editCard}>
      {/* <img src={'file:///resources/EditIcon.png'}></img> */}
      {/* <img src={'file:///src/renderer/src/assets/cards/EditIcon.png'}></img> */}
      Edit
    </td>
  )
}

export default EditCardButton
