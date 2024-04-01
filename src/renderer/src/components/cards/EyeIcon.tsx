function EyeIcon({
  // eslint-disable-next-line react/prop-types
  width = '50px',
  // eslint-disable-next-line react/prop-types
  height = '50px',
  // eslint-disable-next-line react/prop-types
  colour = '#FFFFFF'
}): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={colour}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="6" ry="3" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  )
}

export default EyeIcon
