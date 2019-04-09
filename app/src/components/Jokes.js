import React from 'react'
import axios from 'axios'

import requiresAuth from './requiresAuth'

class Jokes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      jokes: []
    }
  }
  componentDidMount() {
    this.loadJokes()
  }
  loadJokes = _ => {
    axios
      .get('/jokes')
      .then(res => {
        this.setState({ jokes: res.data })
      })
      .catch(e => console.log(e))
  }
  render() {
    return (
      <div>
        <div className={'jokes'}>
          {this.state.jokes.map((joke, i) => (
            <div
              className={'joke'}
              key={joke + i}
              style={{
                backgroundColor: `hsl(${Math.random() * 360},25%,70%)`
              }}>
              {joke.joke}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default requiresAuth(Jokes)
