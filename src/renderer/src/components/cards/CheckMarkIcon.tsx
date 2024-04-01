function CheckMarkIcon(): JSX.Element {
  return (
    // <div className="flex flex-row min-w-48">
    <div className="grid place-items-center">
      <svg
        width="50px"
        height="50px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="#568203" strokeWidth="2" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.2929 15.7071C10.6834 16.0976 11.3166 16.0976 11.7071 15.7071L17.7071 9.70711C18.0976 9.31658 18.0976 8.68342 17.7071 8.29289C17.3166 7.90237 16.6834 7.90237 16.2929 8.29289L11 13.5858L7.70711 10.2929C7.31658 9.90237 6.68342 9.90237 6.29289 10.2929C5.90237 10.6834 5.90237 11.3166 6.29289 11.7071L10.2929 15.7071Z"
          fill="#568203"
        />
      </svg>
    </div>
    // {/* <div className="grid place-items-center p-4"></div> */}
    // </div>
  )
}

export default CheckMarkIcon
