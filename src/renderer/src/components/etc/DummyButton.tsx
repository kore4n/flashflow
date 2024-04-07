import { ReactNode } from 'react'

function DummyButton({ children }: { children: ReactNode }): JSX.Element {
  return <button className=" bg-slate-800 p-3 m-2 rounded-lg hover:opacity-50">{children}</button>
}
export default DummyButton
