import EyeIcon from './EyeIcon'

function EditCardButton({ cardID }: { cardID: number }): JSX.Element {
  const editCard = (): void => {
    window.api.openEditCardWindow(cardID)
  }

  return (
    <td onClick={editCard}>
      <EyeIcon width="30px" height="30px" />
    </td>
  )
}

export default EditCardButton
