import React from 'react'
import { ReactNode } from 'react'

function AddCardWarning({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="text-center">
      <div className="bg-red-700 font-bold text-gray-200 rounded-md shadow-md p-2 mb-2.5">
        <span>Warning: </span>
        {children}
      </div>
    </div>
  )
}

export default AddCardWarning
