import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROgress',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {
    bookData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const data1 = data.book_details
      const updateData = {
        id: data1.id,
        authorName: data1.author_name,
        coverPic: data1.cover_pic,
        aboutBook: data1.about_book,
        rating: data1.rating,
        readStatus: data1.read_status,
        title: data1.title,
        aboutAuthor: data1.about_author,
      }
      console.log(updateData)
      this.setState({
        bookData: updateData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {bookData} = this.state
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookData
    return (
      <div className="book-item" testid="bookItem">
        <div className="book-item-container1">
          <div className="book-item-top-container">
            <div>
              <img src={coverPic} className="cover-image" alt={title} />
            </div>
            <div className="book-text">
              <h1>{title}</h1>
              <p>{authorName}</p>
              <p>
                Avg Rating <BsFillStarFill /> {rating}
              </p>
              <p>
                Status: <span>{readStatus}</span>
              </p>
            </div>
          </div>
          <hr />
          <h1>About Author</h1>
          <p>{aboutAuthor}</p>
          <h1>About Book</h1>
          <p>{aboutBook}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => {
    ;<div className="server-failure-container">
      <img
        src="https://res.cloudinary.com/dphunt4te/image/upload/v1735748662/server-failure-image_tczsj3.jpg"
        className="server-failure-image"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <Link to="/books/:id" className="server-failure-link">
        <button type="button" className="server-failure-try-again-button">
          Try Again
        </button>
      </Link>
    </div>
  }

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderView()}
        <Footer />
      </>
    )
  }
}

export default BookDetails
