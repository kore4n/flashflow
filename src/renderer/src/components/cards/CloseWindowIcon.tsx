function CloseWindowIcon({
  // eslint-disable-next-line react/prop-types
  width = '50px',
  // eslint-disable-next-line react/prop-types
  height = '50px',
  // eslint-disable-next-line react/prop-types
  circleColour = '#D52B1E',
  // eslint-disable-next-line react/prop-types
  pathColour = '#D52B1E'
}): JSX.Element {
  return (
    // <div className="flex flex-row min-w-48">
    <div title="Close Window" className="flex flex-row hover:cursor-pointer hover:opacity-40">
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke={circleColour} strokeWidth="2" />
        <path
          d="M8 8L16 16M8 16L16 8"
          stroke={pathColour}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    // {/* <div className="grid place-items-center p-4"></div> */}
    // </div>
  )
}

export default CloseWindowIcon
