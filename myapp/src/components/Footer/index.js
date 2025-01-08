import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <FaGoogle className="icon-size" />
    <FaTwitter className="icon-size" />
    <FaInstagram className="icon-size" />
    <FaYoutube className="icon-size" />
    <p className="contact-style">Contact Us</p>
  </div>
)

export default Footer
