import { ReactNode } from 'react'

function InputColumn({ children }: { children: ReactNode }): JSX.Element {
  return <div className="flex flex-col">{children}</div>
}

export default InputColumn
