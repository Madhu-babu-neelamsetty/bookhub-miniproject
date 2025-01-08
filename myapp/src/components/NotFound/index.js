import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      className="not-found-image"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-desc">
      we are sorry, the page you requested could not be found,
    </p>
    <p className="not-found-desc">Please go back to the homepage.</p>
    <Link to="/" className="not-found-link">
      <button type="button" className="go-back-home-button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
