import {Link, withRouter} from 'react-router-dom'
import {IoIosMenu} from 'react-icons/io'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClick = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <>
      <nav className="header-container">
        <div>
          <Link to="/" className="header-link">
            <img
              src="https://res.cloudinary.com/dphunt4te/image/upload/v1735284081/bookhub_image_bmkj2o.jpg"
              className="image"
              alt="website logo"
            />
          </Link>
        </div>
        <div className="desktop-menu">
          <ul>
            <li>
              <Link to="/" className="header-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shelf" className="header-link">
                Bookshelves
              </Link>
            </li>
            <li>
              <button type="button" className="logout-button" onClick={onClick}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="mobile-menu">
          <IoIosMenu className="mobile-menu-image" onClick={onClick} />
        </div>
      </nav>
      <hr />
    </>
  )
}
export default withRouter(Header)
