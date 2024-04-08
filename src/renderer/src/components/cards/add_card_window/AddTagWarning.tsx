import React from 'react'
import { ReactNode } from 'react'

function AddTagWarning({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="text-center m-0">
      <div className="bg-red-700 font-bold text-gray-200 rounded-md shadow-md p-2 mt-14 mb-2">
        <span>Warning: </span>
        {children}
      </div>
    </div>
  )
}

export default AddTagWarning
