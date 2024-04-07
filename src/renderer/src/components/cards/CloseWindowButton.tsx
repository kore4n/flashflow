import CloseWindowIcon from './CloseWindowIcon'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function CloseWindow({
  // eslint-disable-next-line react/prop-types
  width = '50px',
  // eslint-disable-next-line react/prop-types
  height = '50px',
  // eslint-disable-next-line react/prop-types
  pathColour = '#D52B1E',
  // eslint-disable-next-line react/prop-types
  circleColour = '#D52B1E'
}) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleClose = () => {
    window.close()
  }

  return (
    <button onClick={handleClose} className="max-h-20 grid place-items-center ">
      <CloseWindowIcon
        width={width}
        height={height}
        pathColour={pathColour}
        circleColour={circleColour}
      />
    </button>
  )
}

export default CloseWindow
