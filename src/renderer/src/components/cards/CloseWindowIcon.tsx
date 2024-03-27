function CloseWindowIcon(): JSX.Element {
  return (
    <div className="flex flex-row min-w-48">
      <div className="grid place-items-center">
        <svg
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" stroke="#D52B1E" strokeWidth="2" />
          <path
            d="M8 8L16 16M8 16L16 8"
            stroke="#D52B1E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="grid place-items-center p-4"></div>
    </div>
  )
}

export default CloseWindowIcon
