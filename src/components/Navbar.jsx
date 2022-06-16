import React from 'react'
import './css/Navbar.css'
function Navbar() {
  return (
    <>
     <div className='navbar-container' >
        <div className='navbar-logo' >
          <a href={window.location.host}>  SQl-Runner</a>
        
            </div>
     </div>
    </>
   
  )
}

export default Navbar