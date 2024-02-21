function Navbar({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className="text-center divide-x-2 divide-slate-400">{children}</div>
}

export default Navbar
