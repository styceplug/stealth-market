import React from 'react'

const Banner = () => {
  return (
   <div className="banner-container">
    <div className="mobile-header">
      <h1>ALL YOUR <span>NEEDS</span> IN ONE <br></br> PLACE, STOP AND <span>SHOP</span></h1>
      <div className="buttons">
                <button className="btn-enquire">MAKE ENQUIRES</button>
                <button className="btn-shop">SHOP FROM US</button>
            </div>
    </div>
     <div className='banner'>
       <div className="text">
            <h1>ALL YOUR <span>NEEDS</span> IN ONE <br></br> PLACE, STOP AND <span>SHOP</span></h1>
            <div className="buttons">
                <button className="btn-enquire">MAKE ENQUIRES</button>
                <button className="btn-shop">SHOP FROM US</button>
            </div>
           </div>
    </div>
   </div>
  )
}

export default Banner
