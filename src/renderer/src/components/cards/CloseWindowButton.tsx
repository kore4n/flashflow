import CloseWindowIcon from './CloseWindowIcon'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function CloseWindow() {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleClose = () => {
    window.close()
  }

  return (
    <button onClick={handleClose} aria-label="Close window" className="grid place-items-center">
      <CloseWindowIcon />
    </button>
  )
}

export default CloseWindow
