import { ReactNode } from 'react'

function AddCardWarning({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="bg-red-600">
      <span>Warning: </span>
      {children}
    </div>
  )
}

export default AddCardWarning
