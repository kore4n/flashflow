import { ReactNode } from 'react'

function DummyButton({ children }: { children: ReactNode }): JSX.Element {
  return (
    <button
      title="This button is for demonstration purposes only"
      className=" bg-slate-800 p-3 m-2 rounded-lg hover:opacity-50"
    >
      {children}
    </button>
  )
}
export default DummyButton
