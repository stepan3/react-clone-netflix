import React, { useEffect, useState } from 'react'
import './Nav.css'

function Nav() {
   const [show, handleShow] = useState(false)

   useEffect(() => {
      window.addEventListener('scroll', () => {
         if (window.scrollY > 100) {
            handleShow(true)
         } else handleShow(false)
      })
      return () => {
         window.removeEventListener('scroll')
      }
   }, [])

   return (
      <div className={`nav ${show && 'nav__black'}`}>
         <img
            className="nav__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
            alt="Netflix Logo"
         />

         <img
            className="nav__avatar"
            src="https://img.discogs.com/rNi5dYpe7gjEK5MXUXz4WZs5lP8=/fit-in/600x596/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-2677088-1532887928-2856.jpeg.jpg"
            alt="Netflix Logo"
         />
      </div>
   )
}

export default Nav
