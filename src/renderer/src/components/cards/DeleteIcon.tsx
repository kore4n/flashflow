// eslint-disable-next-line react/prop-types
function DeleteIcon({ width = '50px', height = '50px', colour = '#D52B1E' }): JSX.Element {
  return (
    <div className="grid place-items-center hover:cursor-pointer hover:opacity-40">
      {/* <div className="grid place-items-center"> */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke={colour} strokeWidth="2" />
        <rect x="7" y="11" width="10" height="2" fill="#D52B1E" />
      </svg>
      {/* </div> */}
      {/* <div className="grid place-items-center p-4"></div> */}
    </div>
  )
}

export default DeleteIcon
