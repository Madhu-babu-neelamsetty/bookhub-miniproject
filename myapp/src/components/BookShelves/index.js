import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import Footer from '../Footer'
import BookShelvesData from '../BookShelvesData'
import FilterShelves from '../FilterShelves'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class BookShelves extends Component {
  state = {
    searchInput: '',
    bookShelves: [],
    filterText: bookshelvesList[0].value,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, filterText} = this.state
    console.log(searchInput)
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${filterText}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateShelves = data.books.map(each => ({
        id: each.id,
        title: each.title,
        readStatus: each.read_status,
        rating: each.rating,
        authorName: each.author_name,
        coverPic: each.cover_pic,
      }))
      console.log(updateShelves)
      this.setState({
        bookShelves: updateShelves,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  getFilterId = value => {
    this.setState({filterText: value}, this.getData)
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {bookShelves, searchInput} = this.state
    const bookShelvesResults = bookShelves.filter(each =>
      each.title.toLowerCase().includes(searchInput),
    )
    return (
      <>
        <ul className="book-shelves-footer">
          {bookShelvesResults.map(each => (
            <BookShelvesData key={each.id} bookShelves={each} />
          ))}
        </ul>
        {bookShelvesResults.length < 1 && (
          <div className="search-not-match">
            <img
              src="https://res.cloudinary.com/dphunt4te/image/upload/v1735664101/search-not-match-image_hkffqt.png"
              className="search-not-image"
              alt="no books"
            />
            <p className="search-not-match-heading">
              Your search for {searchInput} did not find any matches.
            </p>
          </div>
        )}
        <Footer />
      </>
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
      <Link to="/shelf" className="server-failure-link">
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
    const {searchInput, filterText} = this.state
    return (
      <>
        <Header />
        <div className="container">
          <div className="filter-container">
            <h1 className="filter-heading">BookShelves</h1>
            {bookshelvesList.map(each => (
              <FilterShelves
                key={each.id}
                bookShelve={each}
                getFilterId={this.getFilterId}
                isTrue={each.value === filterText}
              />
            ))}
          </div>
          <div className="shelves-container">
            <div className="book-shelves-header">
              <h1 className="book-shelves-header-heading">
                {filterText} Books
              </h1>
              <div className="search-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onChangeSearch}
                  value={searchInput}
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="react-search"
                >
                  <BsSearch />
                </button>
              </div>
            </div>
            <div className="mobile-filter">
              <p>Bookshelves</p> <br />
              {bookshelvesList.map(each => (
                <FilterShelves
                  key={each.id}
                  bookShelve={each}
                  getFilterId={this.getFilterId}
                  isTrue={each.value === filterText}
                />
              ))}
            </div>
            {this.renderView()}
          </div>
        </div>
      </>
    )
  }
}

export default BookShelves
