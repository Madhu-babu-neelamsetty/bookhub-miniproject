import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    errMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({
      isError: true,
      errMsg,
    })
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isError, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <div>
          <img
            src="https://res.cloudinary.com/dphunt4te/image/upload/v1735350314/book-image_g2zwwq.jpg"
            className="desktop-image-container"
            alt="login website logo"
          />
        </div>
        <div className="login-container">
          <form className="form-container" onSubmit={this.onSubmit}>
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/dphunt4te/image/upload/v1735350314/book-image_g2zwwq.jpg"
                className="mobile-image-container"
                alt="login website logo"
              />
              <img
                src="https://res.cloudinary.com/dphunt4te/image/upload/v1735284081/bookhub_image_bmkj2o.jpg"
                className="image"
                alt="website login"
              />
            </div>
            <label htmlFor="name" className="lable-style">
              Username*
            </label>
            <input
              type="text"
              id="name"
              placeholder="rahul"
              onChange={this.onChangeUsername}
              value={username}
              className="input-style"
            />
            <label htmlFor="password" className="lable-style">
              Password*
            </label>
            <input
              type="password"
              id="password"
              placeholder="rahul@2021"
              onChange={this.onChangePassword}
              value={password}
              className="input-style"
            />
            {isError && <p className="error-msg">{errMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
