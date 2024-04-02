import React from 'react'
import { ActiveTab } from 'src/types/types'

function ToCardsByDeckBtn({
  children,
  tabToOpenOnClick,
  setActiveTab,
  deckSelected
}: {
  children: React.ReactNode
  tabToOpenOnClick: ActiveTab
  setActiveTab: (apage: ActiveTab) => void
  deckSelected: string
}): JSX.Element {
  function switchTab(): void {
    window.api.store.pushDeckToShow(deckSelected)
    setActiveTab(tabToOpenOnClick)
  }

  return (
    <div onClick={switchTab} className={`hover:opacity-80 cursor-pointer width:200px`}>
      {children}
    </div>
  )
}

export default ToCardsByDeckBtn
