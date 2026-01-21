import React from 'react'
import Dashboard_top from './Dashboard_top'
import Dashboard_center from './Dashboard_center'
import Dashboard_bottom from './Dashboard_bottom'

const Dashboardsec = () => {
  return (
    <div className=' flex flex-col justify-start px-11 pb-6 bg-white transition-all animate-in fade-in slide-in-from-bottom-3 duration-700'>
      <Dashboard_top/>
      <Dashboard_center/>
      <Dashboard_bottom/>
    </div>
  )
}

export default Dashboardsec
