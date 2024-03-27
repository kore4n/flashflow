import OpenAddCard from './OpenAddCardButton'
import CardsTable from './CardsTable'
import { ActiveTab } from 'src/types/types'

function Cards({ activeTab }: { activeTab: ActiveTab }): JSX.Element {
  if (activeTab != 'Cards') return <></>

  return (
    <div className="min-h-60 grid place-items-center ">
      <CardsTable />
      <br />
      <OpenAddCard />
    </div>
  )
}

export default Cards
