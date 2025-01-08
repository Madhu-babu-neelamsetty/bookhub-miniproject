import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ReactSlick from '../ReactSlick'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TopRated extends Component {
  state = {
    topRatedList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        id: each.id,
        title: each.title,
      }))
      console.log(updateData)
      this.setState({
        topRatedList: updateData,
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
    const {topRatedList} = this.state
    const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className="main-slider-container">
        <Slider {...settings}>
          {topRatedList.map(each => (
            <ReactSlick data={each} key={each.id} />
          ))}
        </Slider>
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
      <Link to="/" className="server-failure-link">
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
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="top-rated-container">
        <h1 className="heading">Find Your Next Favorite Books?</h1>
        <p className="desc">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past,and we will give you surprisingly insightful
          recommendations.
        </p>
        <Link to="/shelf" className="top-rated-link">
          <button
            type="button"
            className="find-books-button"
            id="mobile-find-books"
          >
            Find Books
          </button>
        </Link>
        <div className="top-rated-container1">
          <div className="top-rated-header">
            <div>
              <h1 className="top-rated-heading">Top Rated Books</h1>
            </div>
            <div>
              <Link to="/shelf" className="top-rated-link">
                <button
                  type="button"
                  className="find-books-button"
                  id="desktop-find-books"
                >
                  Find Books
                </button>
              </Link>
            </div>
          </div>
          {this.renderView()}
        </div>
      </div>
    )
  }
}

export default TopRated
