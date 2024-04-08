import OpenAddCard from './OpenAddCardButton'
import CardsTable from './CardsTable'
import { ActiveTab } from 'src/types/types'
import React from 'react'

function Cards({ activeTab }: { activeTab: ActiveTab }): JSX.Element {
  if (activeTab != 'Cards') return <></>

  return (
    <div className="min-h-60 grid place-items-center ">
      <CardsTable />
      <div className="p-4" />
      <OpenAddCard />
    </div>
  )
}

export default Cards
