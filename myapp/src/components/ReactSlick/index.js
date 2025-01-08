import {Link} from 'react-router-dom'
import './index.css'

const ReactSlick = props => {
  const {data} = props
  const {id, coverPic, title, authorName} = data
  return (
    <Link to={`/books/${id}`} className="book-item-link">
      <div className="slider-container">
        <img src={coverPic} className="slider-cover-image" alt={title} />
        <h1 className="slider-heading">{title}</h1>
        <p>{authorName}</p>
      </div>
    </Link>
  )
}

export default ReactSlick
