import { ActiveTab } from 'src/types/types'

function Stats({ activeTab }: { activeTab: ActiveTab }): JSX.Element {
  if (activeTab != 'Stats') return <></>

  return <div className="grid place-items-center pt-10">Statistics</div>
}

export default Stats
