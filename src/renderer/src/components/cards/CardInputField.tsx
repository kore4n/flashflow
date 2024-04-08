import React from 'react'

function CardInputField({
  onChange,
  placeholder,
  defaultValue
}: {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  defaultValue?: string
}): JSX.Element {
  return (
    <textarea
      className="min-h-20 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  )
}

export default CardInputField
