import { ActiveTab } from 'src/types/types'
import StatsIcon from './StatsIcon'

function Stats({ activeTab }: { activeTab: ActiveTab }): JSX.Element {
  if (activeTab != 'Stats') return <></>

  return (
    <div className="grid place-items-center pt-20">
      <StatsIcon height="300px" width="300px" />
    </div>
  )
}

export default Stats
