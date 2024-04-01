function EditCardButton({ cardID }: { cardID: number }): JSX.Element {
  const editCard = (): void => {
    window.api.openEditCardWindow(cardID)
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
