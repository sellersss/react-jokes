import React from 'react';
import axios from 'axios';
import './JokesContainer.css'
import VoteButton from './VoteButton';
import Joke from './Joke';
import VoteCount from './VoteCount';

class JokesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [
        {
          joke: '',
          votes: 0
        }
      ],
      loading: true
    }
    this.handleVote = this.handleVote.bind(this);
  }

  static defaultProps = {
    numJokes: 20
  }

  async componentDidMount() {
    let result = await axios.get(`https://icanhazdadjoke.com/search?limit=${this.props.numJokes}`,
      { headers: { Accept: "application/json" } });
    let jokesWithVotes = result.data.results.map((joke) => {
      joke.votes = parseInt(localStorage.getItem(joke.id)) || 0;
      return joke;
    })
    jokesWithVotes.sort((a, b) => {
      return b.votes - a.votes;
    })
    this.setState({ jokes: jokesWithVotes, loading: false });
  }

  handleVote(value, idx) {
    let editedJokes = this.state.jokes.map((joke, jIdx) => {

      if (jIdx === idx) {
        localStorage.setItem(joke.id, joke.votes + value);
        return { ...joke, votes: joke.votes + value }
      } else {
        return joke;
      }
    });
    console.log("Local Storage", localStorage);
    this.setState({ jokes: editedJokes });
  }

  render() {
    return (
      this.state.loading ?
        <div className="loading">Loading...</div> :
        this.state.jokes.map((joke, idx) => {
          return (
            <div className="container" key={joke.id}>
              <div className="joke-container">
                <div className="votes-container">
                  <VoteButton icon="⬆" value={1} idx={idx} action={this.handleVote} />
                  <VoteCount voteCount={joke.votes} />
                  <VoteButton icon="⬇" value={-1} idx={idx} action={this.handleVote} />
                </div>
                <div>
                  <Joke jokeText={joke.joke} />
                </div>
              </div>
            </div>
          )
        })
    )
  }
}

export default JokesContainer;