import React from 'react'
import './Footer.css'
import downloadApp from '../../images/downloadApp.png'

const Footer = () => {
  return (
    <footer className='footer'>
      <h1>HungryHuB</h1>
      <img src={downloadApp} alt="download" />
      <p>This app is created by Pawan Singh Rawat</p>
    </footer>
  )
}

export default Footer
