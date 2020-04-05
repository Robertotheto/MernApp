import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
export default class App extends Component {
  state = {
    title: '',
    body: '',
    posts: []
  }
  componentDidMount = () => {
    this.getBlogPost()
  }
  getBlogPost = () => {
    axios.get('/api')
    .then((response) => {
      const data = response.data
      this.setState({posts: data})
      console.log('Data has been received!!!')
    })
    .catch(() => {
      alert('Error retrieving data!!!')
    })
  }
  handleChange = ({target}) => {
    const {name,value} = target
    this.setState({[name]:value})
  }
  submit = (event) => {
    event.preventDefault()

    const payload = {
      title: this.state.title,
      body: this.state.body
    }
    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
    .then(() =>{
      console.log('Data has ben sent to the server')
      this.resetUserInputs()
      this.getBlogPost()
    })
    .catch(() =>{
      console.log('Internal server error')
    })
  }
  resetUserInputs = () => {
    this.setState({
      title: '',
      body: ''
    })
  }
  displayBlogPost = (posts) => {
    if(!posts.length) return null

    return posts.map((post,index) => (
      <div key={index} className="blog-post_display">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ))
  }
  render() {
    console.log('State',this.state)
    return (
      <div className="app">
        <h2>Bem Vindo ao meu App</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Titulo" />
          </div>
          <div className="form-input">
            <textarea name="body" cols="30" rows="10" value={this.state.body} onChange={this.handleChange} placeholder="Comentarios" ></textarea>
          </div>
          <button>Submit</button>
        </form>
        <div>
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    )
  }
}
