import { ReactNode } from 'react'

function InputLabel({ children }: { children: ReactNode }): JSX.Element {
  return <label className="font-bold text-xl">{children}</label>
}

export default InputLabel
