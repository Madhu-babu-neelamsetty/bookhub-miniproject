import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookShelvesData = props => {
  const {bookShelves} = props
  const {id, title, readStatus, rating, authorName, coverPic} = bookShelves
  return (
    <Link to={`/books/${id}`} className="book-link">
      <li className="book-shelves-container">
        <div>
          <img src={coverPic} className="cover-pic-image" alt={title} />
        </div>
        <div className="text-container">
          <h1 className="heading">{title}</h1>
          <p>{authorName}</p>
          <p>
            Avg Rating <BsFillStarFill /> {rating}
          </p>
          <p>
            Status: <span>{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookShelvesData
