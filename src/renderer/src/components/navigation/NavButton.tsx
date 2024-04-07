import React from 'react'
import { ActiveTab } from 'src/types/types'

function NavButton({
  children,
  tabToOpenOnClick,
  activeTab,
  setActiveTab,
  specificClass
}: {
  children: React.ReactNode
  tabToOpenOnClick: ActiveTab
  activeTab: ActiveTab
  setActiveTab: (apage: ActiveTab) => void
  specificClass?: string
}): JSX.Element {
  function switchTab(): void {
    window.api.store.pushDeckToShow('')
    setActiveTab(tabToOpenOnClick)
  }

  const showThisTabSelected = activeTab == tabToOpenOnClick

  const showSelected = showThisTabSelected ? 'bg-slate-700' : 'bg-slate-800'

  return (
    <span
      onClick={switchTab}
      className={`p-4 hover:opacity-80 font-bold cursor-pointer shadow-xl ${showSelected} ${specificClass}`}
    >
      {children}
    </span>
  )
}

export default NavButton
