import React from 'react'
import LeftSideBar from "../Components/LeftSideBar"
import RightArea from "../Components/RightComponents/RightArea"

const DashboardPage = () => {
  return (
    <div className="flex">
    <LeftSideBar />
    <RightArea />
  </div>
  )
}

export default DashboardPage