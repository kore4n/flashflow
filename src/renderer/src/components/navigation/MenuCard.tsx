import React from 'react'
import { ActiveTab } from 'src/types/types'

function NavButton({
  children,
  tabToOpenOnClick,
  activeTab,
  setActiveTab
}: {
  children: React.ReactNode
  tabToOpenOnClick: ActiveTab
  activeTab: ActiveTab
  setActiveTab: (apage: ActiveTab) => void
}): JSX.Element {
  function switchTab(): void {
    window.api.store.pushDeckToShow("");
    setActiveTab(tabToOpenOnClick)
  }

  const showThisTabSelected = activeTab == tabToOpenOnClick

  const showSelected = showThisTabSelected ? 'bg-slate-800' : 'bg-slate-900'

  return (
    <span onClick={switchTab} className={`p-4 hover:opacity-80 cursor-pointer ${showSelected}`}>
      {children}
    </span>
  )
}

export default NavButton
