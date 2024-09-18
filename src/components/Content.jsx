import React from 'react'
import email from '../assets/images/email.svg'

const Content = () => {
  return (
    <div className='content'>
       <h1>Get our Newsletters</h1>

        <div className="get">
          <h2>Get in Touch</h2>

          <div className="email">
           <input type="text" placeholder='Input email here' />
           <img src={email} alt="" />
          </div>
        </div>
    </div>
  )
}

export default Content
