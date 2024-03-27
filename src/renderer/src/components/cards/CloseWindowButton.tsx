import CloseWindowIcon from './CloseWindowIcon'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function CloseWindow() {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleClose = () => {
    window.close()
  }

  return (
    <button onClick={handleClose} aria-label="Close window" className=" max-h-20 max-w-20">
      <CloseWindowIcon />
    </button>
  )
}

export default CloseWindow
