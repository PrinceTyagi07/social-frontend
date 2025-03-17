import React from 'react'
import SearchBox from '../Components/core/SearchBox'
import Feedpage from '../Components/Posts/Feedpage'

const Feed = () => {
  return (
   <div className="">
    <div className="">
      
      <SearchBox/>
    </div>
    <div className="mx-5">
      <Feedpage/>
    </div>
   </div>
  )
}

export default Feed